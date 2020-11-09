import 'reflect-metadata';
import * as axios from 'axios';
import {
  MongooseConector,
  mongooseAdapter,
} from '../../../../../integration-modules/mongoose/adapter';
import {
  QueueBasedTaskGraph,
  TaskGraphNode,
} from '../../../../task-graph/domain';
import {
  artifactCreationQueryApiV1FixtureFactory,
  creatureCreationQueryApiV1FixtureFactory,
  enchantmentCreationQueryApiV1FixtureFactory,
  landCreationQueryApiV1FixtureFactory,
} from '../../fixtures/adapter/api/query/card';
import { AppEnvLoader } from '../../../../../app/adapter/env/AppEnvLoader';
import { AppEnvVariables } from '../../../../../app/adapter';
import { ArtifactApiV1 } from '../../../adapter/api/model/card/ArtifactApiV1';
import { ArtifactCreationQueryApiV1 } from '../../../adapter/api/query/card/ArtifactCreationQueryApiV1';
import { Capsule } from '../../../../../common/domain';
import { CardApiV1 } from '../../../adapter/api/model/card/CardApiV1';
import { CardFindQueryApiV1 } from '../../../adapter/api/query/card/CardFindQueryApiV1';
import { Container } from 'inversify';
import { CreatureApiV1 } from '../../../adapter/api/model/card/CreatureApiV1';
import { CreatureCreationQueryApiV1 } from '../../../adapter/api/query/card/CreatureCreationQueryApiV1';
import { EnchantmentApiV1 } from '../../../adapter/api/model/card/EnchantmentApiV1';
import { EnchantmentCreationQueryApiV1 } from '../../../adapter/api/query/card/EnchantmentCreationQueryApiV1';
import { EnvLoader } from '../../../../../layer-modules/env/domain';
import { InversifyContainerTaskGraphNodeExtractor } from '../../../../task-graph/adapter';
import { LandApiV1 } from '../../../adapter/api/model/card/LandApiV1';
import { LandCreationQueryApiV1 } from '../../../adapter/api/query/card/LandCreationQueryApiV1';
import { PerformTasksResult } from '../../../../task-graph/domain/TaskGraph';
import { UserToken } from '../../../../user/domain';
import { commonTest } from '../../../../../common/test';
import { configAdapter } from '../../../../../layer-modules/config/adapter';
import { configTest } from '../../../../../layer-modules/config/test';
import { userTest } from '../../../../user/test';

const container: Container = configAdapter.container;

const dockerAppEnvLoader: EnvLoader<AppEnvVariables> = new AppEnvLoader(
  'docker',
);

const APP_URL_PROTOCOL: string = 'http://';
const APP_URL_HOST: string = '127.0.0.1';
const APP_URL_PORT: number = dockerAppEnvLoader.index.APP_SERVER_PORT;

interface E2EComponents {
  userToken: UserToken;
}

async function prepareData(): Promise<E2EComponents> {
  const taskGraph: QueueBasedTaskGraph<symbol> = new QueueBasedTaskGraph();

  const e2eContainer: Container = configTest.e2eContainer.createChild();

  e2eContainer
    .bind(commonTest.config.types.taskGraph.CURRENT_TASK_GRAPH)
    .toConstantValue(taskGraph);

  const createUserTokenTaskGraphNode: TaskGraphNode<
    symbol,
    UserToken
  > = e2eContainer.get(userTest.config.types.CREATE_USER_TOKEN_TASK_GRAPH_NODE);

  const inversifyContainerTaskGraphNodeExtractor: InversifyContainerTaskGraphNodeExtractor = new InversifyContainerTaskGraphNodeExtractor(
    e2eContainer,
    [createUserTokenTaskGraphNode],
  );

  const extractedNodes: Iterable<TaskGraphNode<
    symbol,
    unknown
  >> = inversifyContainerTaskGraphNodeExtractor.extract();

  taskGraph.addTasks(extractedNodes);

  const taskGraphResult: PerformTasksResult = await taskGraph.performTasks();

  if (!taskGraphResult.success) {
    throw new Error('Expected tasks to be performed');
  }

  return {
    userToken: (createUserTokenTaskGraphNode.getOutput() as Capsule<UserToken>)
      .elem,
  };
}

describe('Card V1', () => {
  let e2eComponents: E2EComponents;

  let mongooseConnector: MongooseConector;

  const client: axios.AxiosStatic = axios.default;

  beforeAll(async () => {
    mongooseConnector = container.get(
      mongooseAdapter.config.types.db.MONGOOSE_CONNECTOR,
    );

    await mongooseConnector.connect();

    e2eComponents = await prepareData();
  });

  afterAll(async () => {
    await mongooseConnector.close();
  });

  describe('when called POST, with a request with a valid ArtifactCreationQueryApiV1', () => {
    let artifactCreationQueryApiV1: ArtifactCreationQueryApiV1;
    let postCardV1Response: axios.AxiosResponse;

    beforeAll(async () => {
      artifactCreationQueryApiV1 = artifactCreationQueryApiV1FixtureFactory.get();
      postCardV1Response = await client.post(
        `${APP_URL_PROTOCOL}${APP_URL_HOST}:${APP_URL_PORT}/v1/cards`,
        artifactCreationQueryApiV1,
        {
          headers: {
            Authorization: `Bearer ${e2eComponents.userToken.token}`,
          },
        },
      );
    });

    it('must return a response with the artifact created', () => {
      expect(postCardV1Response.data).toHaveProperty('id');
      expect((postCardV1Response.data as ArtifactApiV1).cost).toStrictEqual(
        artifactCreationQueryApiV1.cost,
      );
      expect((postCardV1Response.data as ArtifactApiV1).detail).toStrictEqual(
        artifactCreationQueryApiV1.detail,
      );
      expect((postCardV1Response.data as ArtifactApiV1).type).toStrictEqual(
        artifactCreationQueryApiV1.type,
      );
    });

    describe('when called POST cards searches, with the card id created', () => {
      let cardId: string;
      let postCardsSearchesByIdV1Response: axios.AxiosResponse;
      let postCardsSearchesByIdV1ResponseBodyFirstElement: unknown;

      beforeAll(async () => {
        cardId = (postCardV1Response.data as CardApiV1).id;

        const cardFindQueryApiV1ById: CardFindQueryApiV1 = {
          id: cardId,
          limit: 1,
          offset: 0,
        };

        postCardsSearchesByIdV1Response = await client.post(
          `${APP_URL_PROTOCOL}${APP_URL_HOST}:${APP_URL_PORT}/v1/cards/searches`,
          cardFindQueryApiV1ById,
        );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/typedef
        [
          postCardsSearchesByIdV1ResponseBodyFirstElement,
        ] = postCardsSearchesByIdV1Response.data;
      });

      it('must return a response with the card created', () => {
        expect(postCardsSearchesByIdV1Response.data).toBeInstanceOf(Array);
        expect((postCardsSearchesByIdV1Response.data as unknown[]).length).toBe(
          1,
        );

        expect(
          (postCardsSearchesByIdV1ResponseBodyFirstElement as ArtifactApiV1).id,
        ).toBe(cardId);
        expect(
          (postCardsSearchesByIdV1ResponseBodyFirstElement as ArtifactApiV1)
            .cost,
        ).toStrictEqual(artifactCreationQueryApiV1.cost);
        expect(
          (postCardsSearchesByIdV1ResponseBodyFirstElement as ArtifactApiV1)
            .detail,
        ).toStrictEqual(artifactCreationQueryApiV1.detail);
        expect(
          (postCardsSearchesByIdV1ResponseBodyFirstElement as ArtifactApiV1)
            .type,
        ).toBe(artifactCreationQueryApiV1.type);
      });
    });
  });

  describe('when called POST, with a request with a valid CreatureCreationQueryApiV1', () => {
    let creatureCreationQueryApiV1: CreatureCreationQueryApiV1;
    let postCardV1Response: axios.AxiosResponse;

    beforeAll(async () => {
      creatureCreationQueryApiV1 = creatureCreationQueryApiV1FixtureFactory.get();
      postCardV1Response = await client.post(
        `${APP_URL_PROTOCOL}${APP_URL_HOST}:${APP_URL_PORT}/v1/cards`,
        creatureCreationQueryApiV1,
        {
          headers: {
            Authorization: `Bearer ${e2eComponents.userToken.token}`,
          },
        },
      );
    });

    it('must return a response with the creature created', () => {
      expect(postCardV1Response.data).toHaveProperty('id');
      expect((postCardV1Response.data as CreatureApiV1).cost).toStrictEqual(
        creatureCreationQueryApiV1.cost,
      );
      expect((postCardV1Response.data as CreatureApiV1).detail).toStrictEqual(
        creatureCreationQueryApiV1.detail,
      );
      expect((postCardV1Response.data as CreatureApiV1).power).toStrictEqual(
        creatureCreationQueryApiV1.power,
      );
      expect(
        (postCardV1Response.data as CreatureApiV1).toughness,
      ).toStrictEqual(creatureCreationQueryApiV1.toughness);
      expect((postCardV1Response.data as CreatureApiV1).type).toStrictEqual(
        creatureCreationQueryApiV1.type,
      );
    });

    describe('when called POST cards searches, with the card id created', () => {
      let cardId: string;
      let postCardsSearchesByIdV1Response: axios.AxiosResponse;
      let postCardsSearchesByIdV1ResponseBodyFirstElement: unknown;

      beforeAll(async () => {
        cardId = (postCardV1Response.data as CardApiV1).id;

        const cardFindQueryApiV1ById: CardFindQueryApiV1 = {
          id: cardId,
          limit: 1,
          offset: 0,
        };

        postCardsSearchesByIdV1Response = await client.post(
          `${APP_URL_PROTOCOL}${APP_URL_HOST}:${APP_URL_PORT}/v1/cards/searches`,
          cardFindQueryApiV1ById,
        );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/typedef
        [
          postCardsSearchesByIdV1ResponseBodyFirstElement,
        ] = postCardsSearchesByIdV1Response.data;
      });

      it('must return a response with the card created', () => {
        expect(postCardsSearchesByIdV1Response.data).toBeInstanceOf(Array);
        expect((postCardsSearchesByIdV1Response.data as unknown[]).length).toBe(
          1,
        );

        expect(
          (postCardsSearchesByIdV1ResponseBodyFirstElement as CreatureApiV1).id,
        ).toBe(cardId);
        expect(
          (postCardsSearchesByIdV1ResponseBodyFirstElement as CreatureApiV1)
            .cost,
        ).toStrictEqual(creatureCreationQueryApiV1.cost);
        expect(
          (postCardsSearchesByIdV1ResponseBodyFirstElement as CreatureApiV1)
            .detail,
        ).toStrictEqual(creatureCreationQueryApiV1.detail);
        expect(
          (postCardsSearchesByIdV1ResponseBodyFirstElement as CreatureApiV1)
            .power,
        ).toStrictEqual(creatureCreationQueryApiV1.power);
        expect(
          (postCardsSearchesByIdV1ResponseBodyFirstElement as CreatureApiV1)
            .toughness,
        ).toStrictEqual(creatureCreationQueryApiV1.toughness);
        expect(
          (postCardsSearchesByIdV1ResponseBodyFirstElement as CreatureApiV1)
            .type,
        ).toBe(creatureCreationQueryApiV1.type);
      });
    });
  });

  describe('when called POST, with a request with a valid EnchantmentCreationQueryApiV1', () => {
    let enchantmentCreationQueryApiV1: EnchantmentCreationQueryApiV1;
    let postCardV1Response: axios.AxiosResponse;

    beforeAll(async () => {
      enchantmentCreationQueryApiV1 = enchantmentCreationQueryApiV1FixtureFactory.get();
      postCardV1Response = await client.post(
        `${APP_URL_PROTOCOL}${APP_URL_HOST}:${APP_URL_PORT}/v1/cards`,
        enchantmentCreationQueryApiV1,
        {
          headers: {
            Authorization: `Bearer ${e2eComponents.userToken.token}`,
          },
        },
      );
    });

    it('must return a response with the enchantment created', () => {
      expect(postCardV1Response.data).toHaveProperty('id');
      expect((postCardV1Response.data as EnchantmentApiV1).cost).toStrictEqual(
        enchantmentCreationQueryApiV1.cost,
      );
      expect(
        (postCardV1Response.data as EnchantmentApiV1).detail,
      ).toStrictEqual(enchantmentCreationQueryApiV1.detail);
      expect((postCardV1Response.data as EnchantmentApiV1).type).toStrictEqual(
        enchantmentCreationQueryApiV1.type,
      );
    });

    describe('when called POST cards searches, with the card id created', () => {
      let cardId: string;
      let postCardsSearchesByIdV1Response: axios.AxiosResponse;
      let postCardsSearchesByIdV1ResponseBodyFirstElement: unknown;

      beforeAll(async () => {
        cardId = (postCardV1Response.data as CardApiV1).id;

        const cardFindQueryApiV1ById: CardFindQueryApiV1 = {
          id: cardId,
          limit: 1,
          offset: 0,
        };

        postCardsSearchesByIdV1Response = await client.post(
          `${APP_URL_PROTOCOL}${APP_URL_HOST}:${APP_URL_PORT}/v1/cards/searches`,
          cardFindQueryApiV1ById,
        );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/typedef
        [
          postCardsSearchesByIdV1ResponseBodyFirstElement,
        ] = postCardsSearchesByIdV1Response.data;
      });

      it('must return a response with the card created', () => {
        expect(postCardsSearchesByIdV1Response.data).toBeInstanceOf(Array);
        expect((postCardsSearchesByIdV1Response.data as unknown[]).length).toBe(
          1,
        );

        expect(
          (postCardsSearchesByIdV1ResponseBodyFirstElement as EnchantmentApiV1)
            .id,
        ).toBe(cardId);
        expect(
          (postCardsSearchesByIdV1ResponseBodyFirstElement as EnchantmentApiV1)
            .cost,
        ).toStrictEqual(enchantmentCreationQueryApiV1.cost);
        expect(
          (postCardsSearchesByIdV1ResponseBodyFirstElement as EnchantmentApiV1)
            .detail,
        ).toStrictEqual(enchantmentCreationQueryApiV1.detail);
        expect(
          (postCardsSearchesByIdV1ResponseBodyFirstElement as EnchantmentApiV1)
            .type,
        ).toBe(enchantmentCreationQueryApiV1.type);
      });
    });
  });

  describe('when called POST, with a request with a valid LandCreationQueryApiV1', () => {
    let landCreationQueryApiV1: LandCreationQueryApiV1;
    let postCardV1Response: axios.AxiosResponse;

    beforeAll(async () => {
      landCreationQueryApiV1 = landCreationQueryApiV1FixtureFactory.get();
      postCardV1Response = await client.post(
        `${APP_URL_PROTOCOL}${APP_URL_HOST}:${APP_URL_PORT}/v1/cards`,
        landCreationQueryApiV1,
        {
          headers: {
            Authorization: `Bearer ${e2eComponents.userToken.token}`,
          },
        },
      );
    });

    it('must return a response with the land created', () => {
      expect(postCardV1Response.data).toHaveProperty('id');
      expect((postCardV1Response.data as LandApiV1).cost).toStrictEqual(
        landCreationQueryApiV1.cost,
      );
      expect((postCardV1Response.data as LandApiV1).detail).toStrictEqual(
        landCreationQueryApiV1.detail,
      );
      expect((postCardV1Response.data as LandApiV1).type).toStrictEqual(
        landCreationQueryApiV1.type,
      );
    });

    describe('when called POST cards searches, with the card id created', () => {
      let cardId: string;
      let postCardsSearchesByIdV1Response: axios.AxiosResponse;
      let postCardsSearchesByIdV1ResponseBodyFirstElement: unknown;

      beforeAll(async () => {
        cardId = (postCardV1Response.data as CardApiV1).id;

        const cardFindQueryApiV1ById: CardFindQueryApiV1 = {
          id: cardId,
          limit: 1,
          offset: 0,
        };

        postCardsSearchesByIdV1Response = await client.post(
          `${APP_URL_PROTOCOL}${APP_URL_HOST}:${APP_URL_PORT}/v1/cards/searches`,
          cardFindQueryApiV1ById,
        );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/typedef
        [
          postCardsSearchesByIdV1ResponseBodyFirstElement,
        ] = postCardsSearchesByIdV1Response.data;
      });

      it('must return a response with the card created', () => {
        expect(postCardsSearchesByIdV1Response.data).toBeInstanceOf(Array);
        expect((postCardsSearchesByIdV1Response.data as unknown[]).length).toBe(
          1,
        );

        expect(
          (postCardsSearchesByIdV1ResponseBodyFirstElement as LandApiV1).id,
        ).toBe(cardId);
        expect(
          (postCardsSearchesByIdV1ResponseBodyFirstElement as LandApiV1).cost,
        ).toStrictEqual(landCreationQueryApiV1.cost);
        expect(
          (postCardsSearchesByIdV1ResponseBodyFirstElement as LandApiV1).detail,
        ).toStrictEqual(landCreationQueryApiV1.detail);
        expect(
          (postCardsSearchesByIdV1ResponseBodyFirstElement as LandApiV1).type,
        ).toBe(landCreationQueryApiV1.type);
      });
    });
  });
});
