import { ContainerModule, interfaces } from 'inversify';

import { jwtDomain } from '../../../../data-modules/jwt/domain';
import { JsonWebTokenManager } from '../JsonWebTokenManager';

function bindDomain(bind: interfaces.Bind): void {
  bind(jwtDomain.types.JWT_MANAGER).to(JsonWebTokenManager).inSingletonScope();
}

export const jsonwebtokenContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindDomain(bind);
  },
);
