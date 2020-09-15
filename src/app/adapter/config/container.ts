import { ContainerModule, interfaces } from 'inversify';
import { APP_ADAPTER_TYPES } from './types';
import { AppEnvLoader } from '../env/AppEnvLoader';

function bindDomain(bind: interfaces.Bind): void {
  bind(APP_ADAPTER_TYPES.env.APP_ENV_LOADER)
    .to(AppEnvLoader)
    .inSingletonScope();
}

export const appContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindDomain(bind);
  },
);
