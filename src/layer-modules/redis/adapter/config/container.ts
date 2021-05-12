import { ContainerModule, interfaces } from 'inversify';

import { IoredisPublisher } from '../../../../integration-modules/ioredis/adapter';
import { REDIS_DOMAIN_TYPES } from '../../domain/config/types';
import { RedisDotEnvLoader } from '../env/RedisDotEnvLoader';
import { REDIS_ADAPTER_TYPES } from './types';

function bindAdapter(bind: interfaces.Bind): void {
  bind(REDIS_ADAPTER_TYPES.env.RedisEnvLoader)
    .to(RedisDotEnvLoader)
    .inSingletonScope();
}

function bindDomain(bind: interfaces.Bind): void {
  bind(REDIS_DOMAIN_TYPES.RedisPublisher)
    .to(IoredisPublisher)
    .inSingletonScope();
}

export const redisContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindAdapter(bind);
    bindDomain(bind);
  },
);
