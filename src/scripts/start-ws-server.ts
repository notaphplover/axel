#!/usr/bin/env node

import http from 'http';

import 'reflect-metadata';
import { Container } from 'inversify';

import { AppWsMessageRouter } from '../data-modules/app-ws/adapter';
import { appAdapter, AppEnvVariables } from '../data-modules/app/adapter';
import { WsMessageHandler, WsServer } from '../integration-modules/ws/adapter';
import { configAdapter } from '../layer-modules/config/adapter';
import { EnvLoader } from '../layer-modules/env/domain';

const container: Container = configAdapter.container;

void (async () => {
  const appWsMessageRouter: WsMessageHandler = new AppWsMessageRouter([]);

  const appEnvLoader: EnvLoader<AppEnvVariables> = container.get(
    appAdapter.config.types.env.APP_ENV_LOADER,
  );

  console.log(
    `Launching Websocked server to listen port ${appEnvLoader.index.WS_SERVER_PORT}`,
  );

  const wsServer: WsServer<void> = new WsServer(
    appEnvLoader.index.WS_SERVER_PORT,
    {
      transform: async (_message: http.IncomingMessage) => ({
        isEither: false,
        value: undefined,
      }),
    },
    appWsMessageRouter,
  );

  await wsServer.bootstrap();

  console.log('Websocked server ready for connections');
})();
