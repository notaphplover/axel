import 'reflect-metadata';
import * as axios from 'axios';
import {
  MongooseConector,
  dbAdapter,
} from '../../../../../layer-modules/db/adapter';
import {
  QueueBasedTaskGraph,
  TaskGraphNode,
} from '../../../../task-graph/domain';
import { AppEnvLoader } from '../../../../../app/adapter/env/AppEnvLoader';
import { AppEnvVariables } from '../../../../../app/adapter';
import { COMMON_E2E_TYPES } from '../../../../../common/test/config/types/e2ETypes';
import { Capsule } from '../../../../../common/domain';
import { CardDeckApiV1 } from '../../../adapter/api/model/deck/CardDeckApiV1';
import { CardDeckCreationQueryApiV1 } from '../../../adapter/api/query/deck/CardDeckCreationQueryApiV1';
import { Container } from 'inversify';
import { EnvLoader } from '../../../../../layer-modules/env/domain';
import { GAME_E2E_TYPES } from '../../config/types/e2eTypes';
import { GameFormatApiV1 } from '../../../adapter/api/model/GameFormatApiV1';
import { InversifyContainerTaskGraphNodeExtractor } from '../../../../task-graph/adapter';
import { Land } from '../../../domain/model/card/Land';
import { PerformTasksResult } from '../../../../task-graph/domain/TaskGraph';
import { USER_E2E_TYPES } from '../../../../user/test/config/types/e2eTypes';
import { UserToken } from '../../../../user/domain';
import { configAdapter } from '../../../../../layer-modules/config/adapter';
import { configTest } from '../../../../../layer-modules/config/test';

const container: Container = configAdapter.container;

const dockerAppEnvLoader: EnvLoader<AppEnvVariables> = new AppEnvLoader(
  'docker',
);

const APP_URL_PROTOCOL: string = 'http://';
const APP_URL_HOST: string = '127.0.0.1';
const APP_URL_PORT: number = dockerAppEnvLoader.index.APP_SERVER_PORT;

interface E2EComponents {
  land: Land;
  userToken: UserToken;
}

function getCardDeckCreationQueryApiV1(
  components: E2EComponents,
): CardDeckCreationQueryApiV1 {
  return {
    description: 'sample-description',
    format: GameFormatApiV1.UNRESTRICTED,
    name: 'sample-name',
    sections: {
      core: {
        references: [components.land.id],
      },
      sideboard: {
        references: [components.land.id],
      },
    },
  };
}

async function prepareData(): Promise<E2EComponents> {
  const taskGraph: QueueBasedTaskGraph<symbol> = new QueueBasedTaskGraph();

  const e2eContainer: Container = configTest.e2eContainer.createChild();

  e2eContainer
    .bind(COMMON_E2E_TYPES.taskGraph.CURRENT_TASK_GRAPH)
    .toConstantValue(taskGraph);

  const createUserTokenTaskGraphNode: TaskGraphNode<
    symbol,
    UserToken
  > = e2eContainer.get(USER_E2E_TYPES.CREATE_USER_TOKEN_TASK_GRAPH_NODE);

  const createVoidLandTaskGraphNode: TaskGraphNode<
    symbol,
    Land
  > = e2eContainer.get(GAME_E2E_TYPES.card.CREATE_VOID_LAND_TASK_GRAPH_NODE);

  const inversifyContainerTaskGraphNodeExtractor: InversifyContainerTaskGraphNodeExtractor = new InversifyContainerTaskGraphNodeExtractor(
    e2eContainer,
    [createUserTokenTaskGraphNode, createVoidLandTaskGraphNode],
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
    land: (createVoidLandTaskGraphNode.getOutput() as Capsule<Land>).elem,
    userToken: (createUserTokenTaskGraphNode.getOutput() as Capsule<UserToken>)
      .elem,
  };
}

describe('CardDeck V1', () => {
  let e2eComponents: E2EComponents;

  let mongooseConnector: MongooseConector;

  const client: axios.AxiosStatic = axios.default;

  beforeAll(async () => {
    mongooseConnector = container.get(
      dbAdapter.config.types.db.MONGOOSE_CONNECTOR,
    );

    await mongooseConnector.connect();

    e2eComponents = await prepareData();
  });

  afterAll(async () => {
    await mongooseConnector.close();
  });

  describe('when called POST, with a request with a valid CardDeckCreationQueryApiV1', () => {
    let cardDeckCreationQueryApiV1: CardDeckCreationQueryApiV1;
    let postCardDecksV1Response: axios.AxiosResponse;

    beforeAll(async () => {
      cardDeckCreationQueryApiV1 = getCardDeckCreationQueryApiV1(e2eComponents);
      postCardDecksV1Response = await client.post(
        `${APP_URL_PROTOCOL}${APP_URL_HOST}:${APP_URL_PORT}/v1/decks`,
        cardDeckCreationQueryApiV1,
        {
          headers: {
            Authorization: `Bearer ${e2eComponents.userToken.token}`,
          },
        },
      );
    });

    it('must return a response with the cardDeck created', () => {
      expect(postCardDecksV1Response.data).toHaveProperty('id');
      expect((postCardDecksV1Response.data as CardDeckApiV1).description).toBe(
        cardDeckCreationQueryApiV1.description,
      );
      expect((postCardDecksV1Response.data as CardDeckApiV1).format).toBe(
        cardDeckCreationQueryApiV1.format,
      );
      expect((postCardDecksV1Response.data as CardDeckApiV1).name).toBe(
        cardDeckCreationQueryApiV1.name,
      );
      expect(
        (postCardDecksV1Response.data as CardDeckApiV1).sections,
      ).toStrictEqual(cardDeckCreationQueryApiV1.sections);
    });

    describe('when called GET, with the card deck created', () => {
      let cardDeckId: string;
      let getCardDecksByIdV1Response: axios.AxiosResponse;

      beforeAll(async () => {
        cardDeckId = (postCardDecksV1Response.data as CardDeckApiV1).id;

        getCardDecksByIdV1Response = await client.get(
          `${APP_URL_PROTOCOL}${APP_URL_HOST}:${APP_URL_PORT}/v1/decks/${cardDeckId}`,
        );
      });

      it('must return a response with the cardDeck created', () => {
        expect((getCardDecksByIdV1Response.data as CardDeckApiV1).id).toBe(
          cardDeckId,
        );
        expect(
          (getCardDecksByIdV1Response.data as CardDeckApiV1).description,
        ).toBe(cardDeckCreationQueryApiV1.description);
        expect((getCardDecksByIdV1Response.data as CardDeckApiV1).format).toBe(
          cardDeckCreationQueryApiV1.format,
        );
        expect((getCardDecksByIdV1Response.data as CardDeckApiV1).name).toBe(
          cardDeckCreationQueryApiV1.name,
        );
        expect(
          (getCardDecksByIdV1Response.data as CardDeckApiV1).sections,
        ).toStrictEqual(cardDeckCreationQueryApiV1.sections);
      });
    });
  });
});
