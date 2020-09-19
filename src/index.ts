#!/usr/bin/env node
import 'reflect-metadata';
import { AppEnvVariables, appAdapter } from './app/adapter';
import { FastifyRouter, FastifyServer } from './layer-modules/server/adapter';
import { MongooseConector, dbAdapter } from './layer-modules/db/adapter';
import { EnvLoader } from './layer-modules/env/domain';
import { container } from './common/adapter/config/container';
import { gameAdapter } from './game/adapter';
import { userAdapter } from './user/adapter';

void (async () => {
  const authRouter: FastifyRouter = container.get(
    userAdapter.config.types.server.router.AUTH_ROUTER,
  );

  const gameRouter: FastifyRouter = container.get(
    gameAdapter.config.types.server.router.GAME_ROUTER,
  );

  const mongooseConnector: MongooseConector = container.get(
    dbAdapter.config.types.db.MONGOOSE_CONNECTOR,
  );

  const userRouter: FastifyRouter = container.get(
    userAdapter.config.types.server.router.USER_ROUTER,
  );

  const appEnvLoader: EnvLoader<AppEnvVariables> = container.get(
    appAdapter.config.types.env.APP_ENV_LOADER,
  );

  const httpServer: FastifyServer = new FastifyServer(
    mongooseConnector,
    [authRouter, gameRouter, userRouter],
    appEnvLoader.index.APP_SERVER_PORT,
  );

  await httpServer.bootstrap();
})();
