#!/usr/bin/env node

import 'reflect-metadata';

import { Container } from 'inversify';

import {
  AppWsMessageHandler,
  AppWsMessageRouter,
  AppWsRequestContext,
  QueryWsApi,
  WebSocketDataToAppWsRequestcontextConverter,
} from '../data-modules/app-ws/adapter';
import { appAdapter, AppEnvVariables } from '../data-modules/app/adapter';
import { gameAdapter } from '../data-modules/game/adapter';
import { jwtDomain, JwtManager } from '../data-modules/jwt/domain';
import { User } from '../data-modules/user/domain';
import { WsMessageHandler, WsServer } from '../integration-modules/ws/adapter';
import { configAdapter } from '../layer-modules/config/adapter';
import { EnvLoader } from '../layer-modules/env/domain';

const container: Container = configAdapter.container;

const jwtManager: JwtManager<User> = container.get(jwtDomain.types.JWT_MANAGER);

void (async () => {
  const liveGameRoomUpsertQueryWsApiV1Handler: AppWsMessageHandler<
    QueryWsApi,
    AppWsRequestContext
  > = container.get(
    gameAdapter.config.types.ws.msgHandler
      .LIVE_GAME_ROOM_UPSERT_QUERY_WS_API_V1_HANDLER,
  );

  const appWsMessageRouter: WsMessageHandler<
    QueryWsApi,
    AppWsRequestContext
  > = new AppWsMessageRouter<QueryWsApi, AppWsRequestContext>([
    liveGameRoomUpsertQueryWsApiV1Handler,
  ]);

  const appEnvLoader: EnvLoader<AppEnvVariables> = container.get(
    appAdapter.config.types.env.APP_ENV_LOADER,
  );

  console.log(
    `Launching Websocked server to listen port ${appEnvLoader.index.WS_SERVER_PORT}`,
  );

  const wsServer: WsServer<AppWsRequestContext> = new WsServer<AppWsRequestContext>(
    appEnvLoader.index.WS_SERVER_PORT,
    new WebSocketDataToAppWsRequestcontextConverter(jwtManager),
    appWsMessageRouter,
  );

  await wsServer.bootstrap();

  console.log('Websocked server ready for connections');
})();
