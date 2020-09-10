import { ContainerModule, interfaces } from 'inversify';
import { JWT_ADAPTER_TYPES } from './types';
import { JWT_DOMAIN_TYPES } from '../../domain/config/types';
import { JsonWebTokenManager } from '../JsonWebTokenManager';
import { JwtDotEnvLoader } from '../env/JwtDotEnvLoader';

function bindAdapter(bind: interfaces.Bind): void {
  bind(JWT_ADAPTER_TYPES.env.JWT_ENV_LOADER)
    .to(JwtDotEnvLoader)
    .inSingletonScope();
}

function bindDomain(bind: interfaces.Bind): void {
  bind(JWT_DOMAIN_TYPES.JWT_MANAGER).to(JsonWebTokenManager).inSingletonScope();
}

export const jwtContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapter(bind);
    bindDomain(bind);
  },
);
