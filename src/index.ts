#!/usr/bin/env node
import 'reflect-metadata';

import { container } from './common/adapter/config/container';
import { Server } from './http-server';
import { HTTP_SERVER_TYPES } from './http-server/domain/config/types';

const httpServer: Server = container.get(HTTP_SERVER_TYPES.SERVER);

httpServer.bootstrap();
