import { interfaces } from 'inversify';

import { bindGameDomainCoverter } from './bindGameDomainConverter';
import { bindGameDomainInteractor } from './bindGameDomainInteractor';
import { bindGameDomainRepository } from './bindGameDomainRepository';

export function bindGameDomain(bind: interfaces.Bind): void {
  bindGameDomainCoverter(bind);
  bindGameDomainInteractor(bind);
  bindGameDomainRepository(bind);
}
