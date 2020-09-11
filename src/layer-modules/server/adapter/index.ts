import { FastifyRequestHandler } from './FastifyRequestHandler';
import { FastifyRouter } from './FastifyRouter';
import { SERVER_ADAPTER_PUBLIC_TYPES } from './config/types';
import { serverContainer } from './config/container';

export { FastifyRequestHandler, FastifyRouter };

// eslint-disable-next-line @typescript-eslint/typedef
export const serverAdapter = {
  config: {
    container: serverContainer,
    types: SERVER_ADAPTER_PUBLIC_TYPES,
  },
};
