import { REDIS_DOMAIN_PUBLIC_TYPES } from './config/types';
import { GameIdPlayerIdRedisKey } from './model/GameIdPlayerIdRedisKey';
import { RedisPublisher } from './RedisPublisher';
import { RedisSubscriber } from './RedisSubscriber';

export { GameIdPlayerIdRedisKey, RedisPublisher, RedisSubscriber };

// eslint-disable-next-line @typescript-eslint/typedef
export const redisDomain = {
  config: {
    types: REDIS_DOMAIN_PUBLIC_TYPES,
  },
};
