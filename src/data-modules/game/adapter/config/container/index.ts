import { ContainerModule, interfaces } from 'inversify';

import { bindGameAdapter } from './adapter';
import { bindGameDomain } from './domain';

export const gameContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindGameAdapter(bind);
    bindGameDomain(bind);
  },
);
