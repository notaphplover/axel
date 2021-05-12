import { REDIS_DOMAIN_PUBLIC_TYPES } from './config/types';
import { RedisPublisher } from './RedisPublisher';

export { RedisPublisher };

// eslint-disable-next-line @typescript-eslint/typedef
export const redisDomain = {
  config: {
    types: REDIS_DOMAIN_PUBLIC_TYPES,
  },
};
