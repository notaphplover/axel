import { ContainerModule, interfaces } from 'inversify';

function bindAdapter(_bind: interfaces.Bind): void {
  return undefined;
}

export const wsContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapter(bind);
  },
);
