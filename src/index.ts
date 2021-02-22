#!/usr/bin/env node
import 'reflect-metadata';
import { Container } from 'inversify';

import { AppEnvVariables, appAdapter } from './data-modules/app/adapter';
import { gameAdapter } from './data-modules/game/adapter';
import { userAdapter } from './data-modules/user/adapter';
import {
  FastifyPortListeningServer,
  FastifyRouter,
} from './integration-modules/fastify/adapter';
import {
  MongoDbConnector,
  MongoDbInitializer,
 mongodbAdapter } from './integration-modules/mongodb/adapter';
import { configAdapter } from './layer-modules/config/adapter';
import { EnvLoader } from './layer-modules/env/domain';


const container: Container = configAdapter.container;

async function initializeDb(): Promise<void> {
  const mongoDbConnector: MongoDbConnector = container.get(
    mongodbAdapter.config.types.db.MONGODB_CONNECTOR,
  );

  const gameDbInitializer: MongoDbInitializer = container.get(
    gameAdapter.config.types.db.initializer.GAME_DB_INITIALIZER,
  );

  await mongoDbConnector.connect();

  await gameDbInitializer.initialize(mongoDbConnector.client);
}

void (async () => {
  const authRouter: FastifyRouter = container.get(
    userAdapter.config.types.server.router.AUTH_ROUTER,
  );

  const cardRouter: FastifyRouter = container.get(
    gameAdapter.config.types.server.router.card.CARD_ROUTER,
  );

  const deckRouter: FastifyRouter = container.get(
    gameAdapter.config.types.server.router.deck.DECK_ROUTER,
  );

  const gameRouter: FastifyRouter = container.get(
    gameAdapter.config.types.server.router.GAME_ROUTER,
  );

  const gameSetupRouter: FastifyRouter = container.get(
    gameAdapter.config.types.server.router.setup.GAME_SETUP_ROUTER,
  );

  const statusRouter: FastifyRouter = container.get(
    appAdapter.config.types.server.router.STATUS_ROUTER,
  );

  const userRouter: FastifyRouter = container.get(
    userAdapter.config.types.server.router.USER_ROUTER,
  );

  const appEnvLoader: EnvLoader<AppEnvVariables> = container.get(
    appAdapter.config.types.env.APP_ENV_LOADER,
  );

  const httpServer: FastifyPortListeningServer = new FastifyPortListeningServer(
    [
      authRouter,
      cardRouter,
      deckRouter,
      gameRouter,
      gameSetupRouter,
      statusRouter,
      userRouter,
    ],
    appEnvLoader.index.APP_SERVER_PORT,
  );

  await Promise.all([initializeDb(), httpServer.bootstrap()]);
})();
