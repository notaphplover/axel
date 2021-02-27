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
  PerformTasksResult,
  QueueBasedTaskGraph,
  TaskGraphNode,
} from '../../../../task-graph/domain';
import { User, UserToken } from '../../../../user/domain';
import { userTest } from '../../../../user/test';
import { GameFormatApiV1 } from '../../../adapter/api/model/GameFormatApiV1';
import { BasicGameSetupApiV1 } from '../../../adapter/api/model/setup/BasicGameSetupApiV1';
import { ExtendedGameSetupApiV1 } from '../../../adapter/api/model/setup/ExtendedGameSetupApiV1';
import { PlayerReferenceApiV1 } from '../../../adapter/api/model/setup/PlayerReferenceApiV1';
import { PlayerSetupApiV1 } from '../../../adapter/api/model/setup/PlayerSetupApiV1';
import { GameSetupCreationQueryApiV1 } from '../../../adapter/api/query/setup/GameSetupCreationQueryApiV1';
import { GameSetupFindQueryApiV1 } from '../../../adapter/api/query/setup/GameSetupFindQueryApiV1';
import { GameSetupUpdateQueryApiV1 } from '../../../adapter/api/query/setup/GameSetupUpdateQueryApiV1';
import { CardDeck } from '../../../domain/model/deck/CardDeck';
import { GAME_E2E_TYPES } from '../../config/types/e2eTypes';

const container: Container = configAdapter.container;

const dockerAppEnvLoader: EnvLoader<AppEnvVariables> = new AppEnvLoader(
  'docker',
);

const APP_URL_PROTOCOL: string = 'http://';
const APP_URL_HOST: string = '127.0.0.1';
const APP_URL_PORT: number = dockerAppEnvLoader.index.APP_SERVER_PORT;

interface E2EComponents {
  cardDeck: CardDeck;
  firstUser: User;
  firstUserToken: UserToken;
  secondUser: User;
  secondUserToken: UserToken;
}

function getGameSetupCreationQueryApiV1(
  components: E2EComponents,
): GameSetupCreationQueryApiV1 {
  return {
    format: GameFormatApiV1.UNRESTRICTED,
    ownerUserId: components.firstUser.id,
    playerSetups: [
      {
        deckId: components.cardDeck.id,
        userId: components.firstUser.id,
      },
    ],
    playerSlots: 2,
  };
}

async function prepareData(): Promise<E2EComponents> {
  const taskGraph: QueueBasedTaskGraph<symbol> = new QueueBasedTaskGraph();

  const e2eContainer: Container = configTest.e2eContainer.createChild();

  e2eContainer
    .bind(commonTest.config.types.taskGraph.CURRENT_TASK_GRAPH)
    .toConstantValue(taskGraph);

  const createFirstUserTaskGraphNode: TaskGraphNode<
    symbol,
    User
  > = e2eContainer.get(userTest.config.types.CREATE_FIRST_USER_TASK_GRAPH_NODE);

  const createFirstUserTokenTaskGraphNode: TaskGraphNode<
    symbol,
    UserToken
  > = e2eContainer.get(
    userTest.config.types.CREATE_FIRST_USER_TOKEN_TASK_GRAPH_NODE,
  );

  const createCardDeckOfVoidLandTaskGraphNode: TaskGraphNode<
    symbol,
    CardDeck
  > = e2eContainer.get(
    GAME_E2E_TYPES.deck.CREATE_CARD_DECK_OF_VOID_LAND_TASK_GRAPH_NODE,
  );

  const createSecondUserTaskGraphNode: TaskGraphNode<
    symbol,
    User
  > = e2eContainer.get(
    userTest.config.types.CREATE_SECOND_USER_TASK_GRAPH_NODE,
  );

  const createSecondUserTokenTaskGraphNode: TaskGraphNode<
    symbol,
    UserToken
  > = e2eContainer.get(
    userTest.config.types.CREATE_SECOND_USER_TOKEN_TASK_GRAPH_NODE,
  );

  const inversifyContainerTaskGraphNodeExtractor: InversifyContainerTaskGraphNodeExtractor = new InversifyContainerTaskGraphNodeExtractor(
    e2eContainer,
    [
      createFirstUserTaskGraphNode,
      createFirstUserTokenTaskGraphNode,
      createCardDeckOfVoidLandTaskGraphNode,
      createSecondUserTaskGraphNode,
      createSecondUserTokenTaskGraphNode,
    ],
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
    cardDeck: createCardDeckOfVoidLandTaskGraphNode.getOutput(),
    firstUser: createFirstUserTaskGraphNode.getOutput(),
    firstUserToken: createFirstUserTokenTaskGraphNode.getOutput(),
    secondUser: createSecondUserTaskGraphNode.getOutput(),
    secondUserToken: createSecondUserTokenTaskGraphNode.getOutput(),
  };
}

describe('GameSetup V1', () => {
  let e2eComponents: E2EComponents;

  let mongodbConnector: DbConnector;

  const client: axios.AxiosStatic = axios.default;

  beforeAll(async () => {
    mongodbConnector = container.get(
      mongodbAdapter.config.types.db.MONGODB_CONNECTOR,
    );

    await mongodbConnector.connect();

    e2eComponents = await prepareData();
  });

  afterAll(async () => {
    await mongodbConnector.close();
  });

  describe('when called POST, with a request with a valid GameSetupCreationQueryApiV1', () => {
    let gameSetupCreationQueryApiV1: GameSetupCreationQueryApiV1;
    let postGameSetupsV1Response: axios.AxiosResponse;
    let postGameSetupsV1ResponsePlayerSetup: PlayerSetupApiV1;

    beforeAll(async () => {
      gameSetupCreationQueryApiV1 = getGameSetupCreationQueryApiV1(
        e2eComponents,
      );
      postGameSetupsV1Response = await client.post(
        `${APP_URL_PROTOCOL}${APP_URL_HOST}:${APP_URL_PORT}/v1/game-setups`,
        gameSetupCreationQueryApiV1,
        {
          headers: {
            Authorization: `Bearer ${e2eComponents.firstUserToken.token}`,
          },
        },
      );

      // eslint-disable-next-line @typescript-eslint/typedef
      [
        postGameSetupsV1ResponsePlayerSetup,
      ] = (postGameSetupsV1Response.data as ExtendedGameSetupApiV1).playerSetups;
    });

    it('must return a response with the gameSetup created', () => {
      expect(postGameSetupsV1Response.data).toHaveProperty('id');
      expect(
        (postGameSetupsV1Response.data as ExtendedGameSetupApiV1).format,
      ).toBe(gameSetupCreationQueryApiV1.format);
      expect(
        (postGameSetupsV1Response.data as ExtendedGameSetupApiV1).ownerUserId,
      ).toBe(gameSetupCreationQueryApiV1.ownerUserId);
      expect(postGameSetupsV1ResponsePlayerSetup).toStrictEqual(
        gameSetupCreationQueryApiV1.playerSetups[0],
      );
      expect(
        (postGameSetupsV1Response.data as ExtendedGameSetupApiV1).playerSlots,
      ).toBe(gameSetupCreationQueryApiV1.playerSlots);
    });

    describe('when called POST searches, with the game setup created', () => {
      let gameSetupId: string;
      let getGameSetupsByIdV1Response: axios.AxiosResponse;

      beforeAll(async () => {
        gameSetupId = (postGameSetupsV1Response.data as ExtendedGameSetupApiV1)
          .id;

        const gameSetupFindQueryApiV1: GameSetupFindQueryApiV1 = {
          id: gameSetupId,
          limit: 1,
          offset: 0,
        };

        getGameSetupsByIdV1Response = await client.post(
          `${APP_URL_PROTOCOL}${APP_URL_HOST}:${APP_URL_PORT}/v1/game-setups/searches`,
          gameSetupFindQueryApiV1,
          {
            headers: {
              Authorization: `Bearer ${e2eComponents.firstUserToken.token}`,
            },
          },
        );
      });

      it('must return a response with the gameSetup created', () => {
        const expectedBasicGameSetupApiV1: BasicGameSetupApiV1 = {
          ...(postGameSetupsV1Response.data as ExtendedGameSetupApiV1),
          playerSetups: (postGameSetupsV1Response.data as ExtendedGameSetupApiV1).playerSetups.map(
            (playerSetupApiV1: PlayerSetupApiV1): PlayerReferenceApiV1 => ({
              userId: playerSetupApiV1.userId,
            }),
          ),
        };

        expect(getGameSetupsByIdV1Response.data).toStrictEqual([
          expectedBasicGameSetupApiV1,
        ]);
      });

      describe('when called PATCH game setup, with the game setup created and additional player setup', () => {
        let patchGameSetupsByIdV1Response: axios.AxiosResponse;

        beforeAll(async () => {
          const gameSetupUpdateQueryApiV1: Partial<GameSetupUpdateQueryApiV1> = {
            additionalPlayerSetups: [
              {
                deckId: e2eComponents.cardDeck.id,
                userId: e2eComponents.secondUser.id,
              },
            ],
          };

          patchGameSetupsByIdV1Response = await client.patch(
            `${APP_URL_PROTOCOL}${APP_URL_HOST}:${APP_URL_PORT}/v1/game-setups/${gameSetupId}`,
            gameSetupUpdateQueryApiV1,
            {
              headers: {
                Authorization: `Bearer ${e2eComponents.secondUserToken.token}`,
              },
            },
          );
        });

        it('must return a response with the gameSetup updated', () => {
          const expectedBasicGameSetupApiV1: BasicGameSetupApiV1 = {
            ...(postGameSetupsV1Response.data as ExtendedGameSetupApiV1),
            playerSetups: [
              ...(postGameSetupsV1Response.data as ExtendedGameSetupApiV1).playerSetups.map(
                (playerSetupApiV1: PlayerSetupApiV1): PlayerReferenceApiV1 => ({
                  userId: playerSetupApiV1.userId,
                }),
              ),
              {
                userId: e2eComponents.secondUser.id,
              },
            ],
          };

          expect(patchGameSetupsByIdV1Response.data).toStrictEqual(
            expectedBasicGameSetupApiV1,
          );
        });

        describe('when called PATCH game setup, with the game setup created and player setup to remove', () => {
          let patchGameSetupsByIdV1Response: axios.AxiosResponse;

          beforeAll(async () => {
            const gameSetupUpdateQueryApiV1: Partial<GameSetupUpdateQueryApiV1> = {
              removePlayerSetups: [
                {
                  userId: e2eComponents.secondUser.id,
                },
              ],
            };

            patchGameSetupsByIdV1Response = await client.patch(
              `${APP_URL_PROTOCOL}${APP_URL_HOST}:${APP_URL_PORT}/v1/game-setups/${gameSetupId}`,
              gameSetupUpdateQueryApiV1,
              {
                headers: {
                  Authorization: `Bearer ${e2eComponents.firstUserToken.token}`,
                },
              },
            );
          });

          it('must return a response with the gameSetup updated', () => {
            const expectedBasicGameSetupApiV1: BasicGameSetupApiV1 = {
              ...(postGameSetupsV1Response.data as ExtendedGameSetupApiV1),
              playerSetups: (postGameSetupsV1Response.data as ExtendedGameSetupApiV1).playerSetups.map(
                (playerSetupApiV1: PlayerSetupApiV1): PlayerReferenceApiV1 => ({
                  userId: playerSetupApiV1.userId,
                }),
              ),
            };

            expect(patchGameSetupsByIdV1Response.data).toStrictEqual(
              expectedBasicGameSetupApiV1,
            );
          });
        });
      });
    });
  });
});
