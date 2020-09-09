#!/usr/bin/env node
import 'reflect-metadata';
import { Server, serverDomain } from './layer-modules/server/domain';
import { container } from './common/adapter/config/container';

void (async () => {
  const httpServer: Server = container.get(serverDomain.config.types.SERVER);

  await httpServer.bootstrap();
})();
