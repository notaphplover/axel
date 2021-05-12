import { redisContainer } from './config/container';
import { REDIS_ADAPTER_PUBLIC_TYPES } from './config/types';
import { RedisSubscriber } from './RedisSubscriber';

export { RedisSubscriber };

// eslint-disable-next-line @typescript-eslint/typedef
export const redisAdapter = {
  config: {
    container: redisContainer,
    types: REDIS_ADAPTER_PUBLIC_TYPES,
  },
};
