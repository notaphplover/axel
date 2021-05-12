import { REDIS_DOMAIN_PUBLIC_TYPES } from './config/types';
import { RedisPublisher } from './RedisPublisher';
import { RedisSubscriber } from './RedisSubscriber';

export { RedisPublisher, RedisSubscriber };

// eslint-disable-next-line @typescript-eslint/typedef
export const redisDomain = {
  config: {
    types: REDIS_DOMAIN_PUBLIC_TYPES,
  },
};
