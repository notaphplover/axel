import { ioredisContainer } from './config/container';
import { IOREDIS_ADAPTER_PUBLIC_TYPES } from './config/types';
import { IoredisPublisher } from './IoredisPublisher';
import { IoredisSubscriber } from './IoredisSubscriber';

export { IoredisPublisher, IoredisSubscriber };

// eslint-disable-next-line @typescript-eslint/typedef
export const ioredisAdapter = {
  config: {
    container: ioredisContainer,
    types: IOREDIS_ADAPTER_PUBLIC_TYPES,
  },
};
