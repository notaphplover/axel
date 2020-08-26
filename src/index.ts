#!/usr/bin/env node
import 'reflect-metadata';
import { COMMON_DOMAIN_TYPES } from './common/domain/config/types';
import { Server } from './common/domain';
import { container } from './common/adapter/config/container';

const httpServer: Server = container.get(COMMON_DOMAIN_TYPES.SERVER);

void httpServer.bootstrap();
