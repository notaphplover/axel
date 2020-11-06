import { ContainerModule, interfaces } from 'inversify';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function bindE2E(bind: interfaces.Bind): void {
  return undefined;
}

export const commonTestE2eContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindE2E(bind);
  },
);
