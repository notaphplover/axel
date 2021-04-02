import { ioredisContainer } from './config/container';
import { IOREDIS_ADAPTER_PUBLIC_TYPES } from './config/types';
import { IoredisSubscriber } from './IoredisSubscriber';

export { IoredisSubscriber };

// eslint-disable-next-line @typescript-eslint/typedef
export const ioredisAdapter = {
  config: {
    container: ioredisContainer,
    types: IOREDIS_ADAPTER_PUBLIC_TYPES,
  },
};
