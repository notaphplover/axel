import { ContainerModule, interfaces } from 'inversify';

import { JwtDotEnvLoader } from '../env/JwtDotEnvLoader';
import { JWT_ADAPTER_TYPES } from './types';

function bindAdapter(bind: interfaces.Bind): void {
  bind(JWT_ADAPTER_TYPES.env.JWT_ENV_LOADER)
    .to(JwtDotEnvLoader)
    .inSingletonScope();
}

export const jwtContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapter(bind);
  },
);
