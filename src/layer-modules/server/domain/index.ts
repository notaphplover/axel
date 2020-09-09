import { SERVER_DOMAIN_TYPES } from './config/types';
import { Server } from './Server';

export { Server };

// eslint-disable-next-line @typescript-eslint/typedef
export const serverDomain = {
  config: {
    types: SERVER_DOMAIN_TYPES,
  },
};
