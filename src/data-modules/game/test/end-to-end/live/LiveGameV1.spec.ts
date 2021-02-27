import 'reflect-metadata';

import * as axios from 'axios';
import { Container } from 'inversify';

import { Capsule } from '../../../../../common/domain';
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
  PerformTasksResult,
  QueueBasedTaskGraph,
  TaskGraphNode,
} from '../../../../task-graph/domain';
import { UserToken } from '../../../../user/domain';
import { userTest } from '../../../../user/test';
import { LiveGameApiV1 } from '../../../adapter/api/model/live/LiveGameApiV1';
import { LiveGameCreationQueryApiV1 } from '../../../adapter/api/query/live/LiveGameCreationQueryApiV1';
import { GameSetup } from '../../../domain/model/setup/GameSetup';
import { GAME_E2E_TYPES } from '../../config/types/e2eTypes';

const container: Container = configAdapter.container;

const dockerAppEnvLoader: EnvLoader<AppEnvVariables> = new AppEnvLoader(
  'docker',
);

const APP_URL_PROTOCOL: string = 'http://';
const APP_URL_HOST: string = '127.0.0.1';
const APP_URL_PORT: number = dockerAppEnvLoader.index.APP_SERVER_PORT;

interface E2EComponents {
  gameSetup: GameSetup;
  userToken: UserToken;
}

function getLiveGameCreationQueryApiV1(
  e2eComponents: E2EComponents,
): LiveGameCreationQueryApiV1 {
  return {
    gameSetupId: e2eComponents.gameSetup.id,
  };
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

  const createGameSetupOfOnePlayerGraphNode: TaskGraphNode<
    symbol,
    GameSetup
  > = e2eContainer.get(
    GAME_E2E_TYPES.setup.CREATE_GAME_SETUP_OF_ONE_PLAYER_GRAPH_NODE,
  );

  const inversifyContainerTaskGraphNodeExtractor: InversifyContainerTaskGraphNodeExtractor = new InversifyContainerTaskGraphNodeExtractor(
    e2eContainer,
    [createUserTokenTaskGraphNode, createGameSetupOfOnePlayerGraphNode],
  );

  const extractedNodes: Iterable<
    TaskGraphNode<symbol, unknown>
  > = inversifyContainerTaskGraphNodeExtractor.extract();

  taskGraph.addTasks(extractedNodes);

  const taskGraphResult: PerformTasksResult = await taskGraph.performTasks();

  if (!taskGraphResult.success) {
    throw new Error('Expected tasks to be performed');
  }

  const e2eComponents: E2EComponents = {
    gameSetup: (createGameSetupOfOnePlayerGraphNode.getOutput() as Capsule<GameSetup>)
      .elem,
    userToken: (createUserTokenTaskGraphNode.getOutput() as Capsule<UserToken>)
      .elem,
  };

  return e2eComponents;
}

describe('LiveGame V1', () => {
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

  describe('when called POST, with a request with a valid LiveGameCreationQueryApiV1', () => {
    let liveGameCreationQueryApiV1: LiveGameCreationQueryApiV1;
    let postLiveGamesV1Response: axios.AxiosResponse;

    beforeAll(async () => {
      liveGameCreationQueryApiV1 = getLiveGameCreationQueryApiV1(e2eComponents);
      postLiveGamesV1Response = await client.post(
        `${APP_URL_PROTOCOL}${APP_URL_HOST}:${APP_URL_PORT}/v1/games`,
        liveGameCreationQueryApiV1,
        {
          headers: {
            Authorization: `Bearer ${e2eComponents.userToken.token}`,
          },
        },
      );
    });

    it('must return a response with the liveGame created', () => {
      expect(postLiveGamesV1Response.data).toHaveProperty('id');
      expect((postLiveGamesV1Response.data as LiveGameApiV1).round).toBe(1);
    });
  });
});
