#!/usr/bin/env node
import 'reflect-metadata';
import { AppEnvVariables, appAdapter } from './app/adapter';
import {
  FastifyPortListeningServer,
  FastifyRouter,
} from './layer-modules/server/adapter';
import { Container } from 'inversify';
import { DbConnector } from './layer-modules/db/domain';
import { EnvLoader } from './layer-modules/env/domain';
import { configAdapter } from './layer-modules/config/adapter';
import { gameAdapter } from './data-modules/game/adapter';
import { mongooseAdapter } from './integration-modules/mongoose/adapter';
import { userAdapter } from './data-modules/user/adapter';

const container: Container = configAdapter.container;

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

  const mongooseConnector: DbConnector = container.get(
    mongooseAdapter.config.types.db.MONGOOSE_CONNECTOR,
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
    mongooseConnector,
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

  await httpServer.bootstrap();
})();
