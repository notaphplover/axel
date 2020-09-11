import { ContainerModule, interfaces } from 'inversify';
import { FastifyAuthenticator } from '../auth/FastifyAuthenticator';
import { FastifyServer } from '../FastifyServer';
import { SERVER_ADAPTER_TYPES } from './types';
import { SERVER_DOMAIN_TYPES } from '../../domain/config/types';

function bindAdapter(bind: interfaces.Bind): void {
  bind(SERVER_ADAPTER_TYPES.auth.FASTIFY_AUTHENTICATOR).to(
    FastifyAuthenticator,
  );
}

function bindDomain(bind: interfaces.Bind): void {
  bind(SERVER_DOMAIN_TYPES.SERVER).to(FastifyServer).inSingletonScope();
}

export const serverContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapter(bind);
    bindDomain(bind);
  },
);
