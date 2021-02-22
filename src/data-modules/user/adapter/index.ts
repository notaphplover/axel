import { FastifyUserAuthenticator } from './auth/FastifyUserAuthenticator';
import { userContainer } from './config/container';
import { USER_ADAPTER_PUBLIC_TYPES } from './config/types';

export { FastifyUserAuthenticator };

// eslint-disable-next-line @typescript-eslint/typedef
export const userAdapter = {
  config: {
    container: userContainer,
    types: USER_ADAPTER_PUBLIC_TYPES,
  },
};
