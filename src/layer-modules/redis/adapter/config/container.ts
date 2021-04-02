import { ContainerModule, interfaces } from 'inversify';

import { RedisDotEnvLoader } from '../env/RedisDotEnvLoader';
import { REDIS_ADAPTER_TYPES } from './types';

function bindAdapter(bind: interfaces.Bind): void {
  bind(REDIS_ADAPTER_TYPES.env.RedisEnvLoader)
    .to(RedisDotEnvLoader)
    .inSingletonScope();
}

export const redisContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapter(bind);
  },
);
