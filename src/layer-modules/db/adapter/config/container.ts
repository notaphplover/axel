import { ContainerModule, interfaces } from 'inversify';

import { DbDotEnvLoader } from '../env/DbDotEnvLoader';
import { DB_ADAPTER_TYPES } from './types';

function bindAdapter(bind: interfaces.Bind): void {
  bind(DB_ADAPTER_TYPES.env.DB_ENV_LOADER)
    .to(DbDotEnvLoader)
    .inSingletonScope();
}

export const dbContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapter(bind);
  },
);
