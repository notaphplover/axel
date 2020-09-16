import { ContainerModule, interfaces } from 'inversify';
import { FastifyAuthenticator } from '../auth/FastifyAuthenticator';
import { SERVER_ADAPTER_TYPES } from './types';

function bindAdapter(bind: interfaces.Bind): void {
  bind(SERVER_ADAPTER_TYPES.auth.FASTIFY_AUTHENTICATOR).to(
    FastifyAuthenticator,
  );
}

export const serverContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapter(bind);
  },
);
