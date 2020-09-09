import { ContainerModule, interfaces } from 'inversify';
import { JWT_ADAPTER_TYPES } from './types';
import { JwtDotEnvLoader } from '../env/JwtDotEnvLoader';

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
