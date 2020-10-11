import { USER_ADAPTER_PUBLIC_TYPES } from './config/types';
import { userContainer } from './config/container';

// eslint-disable-next-line @typescript-eslint/typedef
export const userAdapter = {
  config: {
    container: userContainer,
    types: USER_ADAPTER_PUBLIC_TYPES,
  },
};