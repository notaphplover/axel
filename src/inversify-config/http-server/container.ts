import { ContainerModule, interfaces } from 'inversify';
import { HTTP_SERVER_TYPES } from './types';
import { FastifyServer } from '../../http-server/adapter/server/FastifyServer';

export const httpServerContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind(HTTP_SERVER_TYPES.SERVER).to(FastifyServer).inSingletonScope();
  },
);
