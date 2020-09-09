import { ContainerModule, interfaces } from 'inversify';
import { FastifyServer } from '../FastifyServer';
import { SERVER_DOMAIN_TYPES } from '../../domain/config/types';

function bindDomain(bind: interfaces.Bind): void {
  bind(SERVER_DOMAIN_TYPES.SERVER).to(FastifyServer).inSingletonScope();
}

export const serverContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindDomain(bind);
  },
);
