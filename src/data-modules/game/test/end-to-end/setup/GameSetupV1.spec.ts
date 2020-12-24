import 'reflect-metadata';
import * as axios from 'axios';
import {
  PerformTasksResult,
  QueueBasedTaskGraph,
  TaskGraphNode,
} from '../../../../task-graph/domain';
import { User, UserToken } from '../../../../user/domain';
import { AppEnvLoader } from '../../../../app/adapter/env/AppEnvLoader';
import { AppEnvVariables } from '../../../../app/adapter';
import { BasicGameSetupApiV1 } from '../../../adapter/api/model/setup/BasicGameSetupApiV1';
import { Capsule } from '../../../../../common/domain';
import { CardDeck } from '../../../domain/model/deck/CardDeck';
import { Container } from 'inversify';
import { DbConnector } from '../../../../../layer-modules/db/domain';
import { EnvLoader } from '../../../../../layer-modules/env/domain';
import { ExtendedGameSetupApiV1 } from '../../../adapter/api/model/setup/ExtendedGameSetupApiV1';
import { GAME_E2E_TYPES } from '../../config/types/e2eTypes';
import { GameFormatApiV1 } from '../../../adapter/api/model/GameFormatApiV1';
import { GameSetupCreationQueryApiV1 } from '../../../adapter/api/query/setup/GameSetupCreationQueryApiV1';
import { GameSetupFindQueryApiV1 } from '../../../adapter/api/query/setup/GameSetupFindQueryApiV1';
import { GameSetupUpdateQueryApiV1 } from '../../../adapter/api/query/setup/GameSetupUpdateQueryApiV1';
import { InversifyContainerTaskGraphNodeExtractor } from '../../../../task-graph/adapter';
import { PlayerSetupApiV1 } from '../../../adapter/api/model/setup/PlayerSetupApiV1';
import { commonTest } from '../../../../../common/test';
import { configAdapter } from '../../../../../layer-modules/config/adapter';
import { configTest } from '../../../../../layer-modules/config/test';
import { mongodbAdapter } from '../../../../../integration-modules/mongodb/adapter';
import { userTest } from '../../../../user/test';

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
    cardDeck: (createCardDeckOfVoidLandTaskGraphNode.getOutput() as Capsule<CardDeck>)
      .elem,
    firstUser: (createFirstUserTaskGraphNode.getOutput() as Capsule<User>).elem,
    firstUserToken: (createFirstUserTokenTaskGraphNode.getOutput() as Capsule<UserToken>)
      .elem,
    secondUser: (createSecondUserTaskGraphNode.getOutput() as Capsule<User>)
      .elem,
    secondUserToken: (createSecondUserTokenTaskGraphNode.getOutput() as Capsule<UserToken>)
      .elem,
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
      expect(postGameSetupsV1ResponsePlayerSetup.deck.id).toBe(
        gameSetupCreationQueryApiV1.playerSetups[0].deckId,
      );
      expect(postGameSetupsV1ResponsePlayerSetup.userId).toBe(
        gameSetupCreationQueryApiV1.playerSetups[0].userId,
      );
      expect(
        (postGameSetupsV1Response.data as ExtendedGameSetupApiV1).playerSlots,
      ).toBe(gameSetupCreationQueryApiV1.playerSlots);
    });

    describe('when called POST searches, with the game setup created', () => {
      let gameSetupId: string;
      let getGameSetupsByIdV1Response: axios.AxiosResponse;
      let getGameSetupsByIdV1ResponseFirstElement: unknown;

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

        // eslint-disable-next-line @typescript-eslint/typedef
        [
          getGameSetupsByIdV1ResponseFirstElement,
        ] = getGameSetupsByIdV1Response.data as unknown[];
      });

      it('must return a response with the gameSetup created', () => {
        expect(
          (getGameSetupsByIdV1ResponseFirstElement as BasicGameSetupApiV1).id,
        ).toBe(gameSetupId);
        expect(
          (getGameSetupsByIdV1ResponseFirstElement as BasicGameSetupApiV1)
            .format,
        ).toBe(
          (postGameSetupsV1Response.data as ExtendedGameSetupApiV1).format,
        );
        expect(
          (getGameSetupsByIdV1ResponseFirstElement as BasicGameSetupApiV1)
            .ownerUserId,
        ).toBe(
          (postGameSetupsV1Response.data as ExtendedGameSetupApiV1).ownerUserId,
        );
        expect(
          (getGameSetupsByIdV1ResponseFirstElement as BasicGameSetupApiV1)
            .playerSetups[0].userId,
        ).toBe(
          (postGameSetupsV1Response.data as ExtendedGameSetupApiV1)
            .playerSetups[0].userId,
        );
        expect(
          (getGameSetupsByIdV1ResponseFirstElement as BasicGameSetupApiV1)
            .playerSlots,
        ).toBe(
          (postGameSetupsV1Response.data as ExtendedGameSetupApiV1).playerSlots,
        );
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
          expect(
            (patchGameSetupsByIdV1Response.data as BasicGameSetupApiV1).id,
          ).toBe(gameSetupId);
          expect(
            (patchGameSetupsByIdV1Response.data as BasicGameSetupApiV1).format,
          ).toBe(
            (postGameSetupsV1Response.data as ExtendedGameSetupApiV1).format,
          );
          expect(
            (patchGameSetupsByIdV1Response.data as BasicGameSetupApiV1)
              .ownerUserId,
          ).toBe(
            (postGameSetupsV1Response.data as ExtendedGameSetupApiV1)
              .ownerUserId,
          );
          expect(
            (patchGameSetupsByIdV1Response.data as BasicGameSetupApiV1)
              .playerSetups.length,
          ).toBe(2);
          expect(
            (patchGameSetupsByIdV1Response.data as BasicGameSetupApiV1)
              .playerSetups,
          ).toContainEqual({
            userId: e2eComponents.firstUser.id,
          });
          expect(
            (patchGameSetupsByIdV1Response.data as BasicGameSetupApiV1)
              .playerSetups,
          ).toContainEqual({
            userId: e2eComponents.secondUser.id,
          });
          expect(
            (patchGameSetupsByIdV1Response.data as BasicGameSetupApiV1)
              .playerSlots,
          ).toBe(
            (postGameSetupsV1Response.data as ExtendedGameSetupApiV1)
              .playerSlots,
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
            expect(
              (patchGameSetupsByIdV1Response.data as BasicGameSetupApiV1).id,
            ).toBe(gameSetupId);
            expect(
              (patchGameSetupsByIdV1Response.data as BasicGameSetupApiV1)
                .format,
            ).toBe(
              (postGameSetupsV1Response.data as ExtendedGameSetupApiV1).format,
            );
            expect(
              (patchGameSetupsByIdV1Response.data as BasicGameSetupApiV1)
                .ownerUserId,
            ).toBe(
              (postGameSetupsV1Response.data as ExtendedGameSetupApiV1)
                .ownerUserId,
            );
            expect(
              (patchGameSetupsByIdV1Response.data as BasicGameSetupApiV1)
                .playerSetups.length,
            ).toBe(1);
            expect(
              (patchGameSetupsByIdV1Response.data as BasicGameSetupApiV1)
                .playerSetups,
            ).toContainEqual({
              userId: e2eComponents.firstUser.id,
            });
            expect(
              (patchGameSetupsByIdV1Response.data as BasicGameSetupApiV1)
                .playerSlots,
            ).toBe(
              (postGameSetupsV1Response.data as ExtendedGameSetupApiV1)
                .playerSlots,
            );
          });
        });
      });
    });
  });
});
