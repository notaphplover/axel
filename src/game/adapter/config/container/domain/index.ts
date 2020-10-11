import { bindGameDomainInteractor } from './bindGameDomainInteractor';
import { bindGameDomainRepository } from './bindGameDomainRepository';
import { interfaces } from 'inversify';

export function bindGameDomain(bind: interfaces.Bind): void {
  bindGameDomainInteractor(bind);
  bindGameDomainRepository(bind);
}
