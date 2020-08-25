import { ContainerModule, interfaces } from 'inversify';
import { FastifyServer } from '../server/model/FastifyServer';
import { HTTP_SERVER_TYPES } from '../../domain/config/types';

export const httpServerContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind(HTTP_SERVER_TYPES.SERVER).to(FastifyServer).inSingletonScope();
  },
);
