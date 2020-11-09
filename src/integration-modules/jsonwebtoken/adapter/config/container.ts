import { ContainerModule, interfaces } from 'inversify';
import { JsonWebTokenManager } from '../JsonWebTokenManager';
import { jwtDomain } from '../../../../jwt/domain';

function bindDomain(bind: interfaces.Bind): void {
  bind(jwtDomain.types.JWT_MANAGER).to(JsonWebTokenManager).inSingletonScope();
}

export const jsonwebtokenContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindDomain(bind);
  },
);
