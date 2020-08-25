#!/usr/bin/env node
import 'reflect-metadata';
import { HTTP_SERVER_TYPES } from './http-server/domain/config/types';
import { Server } from './http-server';
import { container } from './common/adapter/config/container';

const httpServer: Server = container.get(HTTP_SERVER_TYPES.SERVER);

void httpServer.bootstrap();
