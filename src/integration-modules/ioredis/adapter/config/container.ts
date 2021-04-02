import { ContainerModule, interfaces } from 'inversify';

import { IoredisClientBuilder } from '../builder/IoredisClientBuilder';
import { IoredisClientSingleton } from '../IoredisClientSingleton';
import { IOREDIS_ADAPTER_TYPES } from './types';

function bindAdapter(bind: interfaces.Bind): void {
  bind(IOREDIS_ADAPTER_TYPES.builder.IoredisClientBuilder).to(
    IoredisClientBuilder,
  );

  bind(IOREDIS_ADAPTER_TYPES.IoredisClientSingleton)
    .to(IoredisClientSingleton)
    .inSingletonScope();
}

export const ioredisContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapter(bind);
  },
);
