#!/usr/bin/env node
import 'reflect-metadata';

import { container } from './inversify-config/container';
import { HTTP_SERVER_TYPES } from './inversify-config/http-server/types';
import { Server } from './http-server';

const httpServer: Server = container.get(HTTP_SERVER_TYPES.SERVER);

httpServer.bootstrap();
