import { FastifyRequestHandler } from './FastifyRequestHandler';
import { FastifyRouter } from './FastifyRouter';
import { serverContainer } from './config/container';

export { FastifyRequestHandler, FastifyRouter };

// eslint-disable-next-line @typescript-eslint/typedef
export const serverAdapter = {
  config: {
    container: serverContainer,
  },
};
