#!/usr/bin/env node
import 'reflect-metadata';
import { FastifyRouter, FastifyServer } from './layer-modules/server/adapter';
import { MongooseConector, dbAdapter } from './layer-modules/db/adapter';
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

  const httpServer: FastifyServer = new FastifyServer(mongooseConnector, [
    authRouter,
    gameRouter,
    userRouter,
  ]);

  await httpServer.bootstrap();
})();
