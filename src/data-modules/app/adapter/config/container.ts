import { ContainerModule, interfaces } from 'inversify';
import { APP_ADAPTER_TYPES } from './types';
import { AppEnvLoader } from '../env/AppEnvLoader';
import { GetStatusV1RequestHandler } from '../server/reqHandler/GetStatusV1RequestHandler';
import { StatusRouter } from '../server/router/StatusRouter';

function bindAdapter(bind: interfaces.Bind): void {
  bind(APP_ADAPTER_TYPES.server.reqHandler.GET_STATUS_V1_REQUEST_HANDLER).to(
    GetStatusV1RequestHandler,
  );
  bind(APP_ADAPTER_TYPES.server.router.STATUS_ROUTER).to(StatusRouter);
}

function bindDomain(bind: interfaces.Bind): void {
  bind(APP_ADAPTER_TYPES.env.APP_ENV_LOADER)
    .to(AppEnvLoader)
    .inSingletonScope();
}

export const appContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapter(bind);
    bindDomain(bind);
  },
);
