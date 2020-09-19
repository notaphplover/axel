import { ContainerModule, interfaces } from 'inversify';
import { FastifyAuthenticator } from '../auth/FastifyAuthenticator';
import { SERVER_ADAPTER_TYPES } from './types';
import { ServerDotEnvLoader } from '../env/ServerDotEnvLoader';

function bindAdapter(bind: interfaces.Bind): void {
  bind(SERVER_ADAPTER_TYPES.auth.FASTIFY_AUTHENTICATOR).to(
    FastifyAuthenticator,
  );
  bind(SERVER_ADAPTER_TYPES.env.SERVER_DOT_ENV_LOADER).to(ServerDotEnvLoader);
}

export const serverContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapter(bind);
  },
);
