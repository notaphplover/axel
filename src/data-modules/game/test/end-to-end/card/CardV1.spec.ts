import 'reflect-metadata';
import * as axios from 'axios';
import { Container } from 'inversify';

import { commonTest } from '../../../../../common/test';
import { mongodbAdapter } from '../../../../../integration-modules/mongodb/adapter';
import { configAdapter } from '../../../../../layer-modules/config/adapter';
import { configTest } from '../../../../../layer-modules/config/test';
import { DbConnector } from '../../../../../layer-modules/db/domain';
import { EnvLoader } from '../../../../../layer-modules/env/domain';
import { AppEnvVariables } from '../../../../app/adapter';
import { AppEnvLoader } from '../../../../app/adapter/env/AppEnvLoader';
import { InversifyContainerTaskGraphNodeExtractor } from '../../../../task-graph/adapter';
import {
  QueueBasedTaskGraph,
  TaskGraphNode,
} from '../../../../task-graph/domain';
import { PerformTasksResult } from '../../../../task-graph/domain/TaskGraph';
import { UserToken } from '../../../../user/domain';
import { userTest } from '../../../../user/test';
import { CardApiV1 } from '../../../adapter/api/model/card/CardApiV1';
import { CreatureApiV1 } from '../../../adapter/api/model/card/CreatureApiV1';
import { CardFindQueryApiV1 } from '../../../adapter/api/query/card/CardFindQueryApiV1';
import { CreatureCreationQueryApiV1 } from '../../../adapter/api/query/card/CreatureCreationQueryApiV1';
import { creatureCreationQueryApiV1FixtureFactory } from '../../fixtures/adapter/api/query/card';

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
  > = e2eContainer.get(
    userTest.config.types.CREATE_FIRST_USER_TOKEN_TASK_GRAPH_NODE,
  );

  const inversifyContainerTaskGraphNodeExtractor: InversifyContainerTaskGraphNodeExtractor = new InversifyContainerTaskGraphNodeExtractor(
    e2eContainer,
    [createUserTokenTaskGraphNode],
  );

  const extractedNodes: Iterable<
    TaskGraphNode<symbol, unknown>
  > = inversifyContainerTaskGraphNodeExtractor.extract();

  taskGraph.addTasks(extractedNodes);

  const taskGraphResult: PerformTasksResult = await taskGraph.performTasks();

  if (!taskGraphResult.success) {
    throw new Error('Expected tasks to be performed');
  }

  return {
    userToken: createUserTokenTaskGraphNode.getOutput(),
  };
}

describe('Card V1', () => {
  let e2eComponents: E2EComponents;

  let mongoDbConnector: DbConnector;

  const client: axios.AxiosStatic = axios.default;

  beforeAll(async () => {
    mongoDbConnector = container.get(
      mongodbAdapter.config.types.db.MONGODB_CONNECTOR,
    );

    await mongoDbConnector.connect();

    e2eComponents = await prepareData();
  });

  afterAll(async () => {
    await mongoDbConnector.close();
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
        expect(postCardsSearchesByIdV1Response.data).toHaveLength(1);

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
});
