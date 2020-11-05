import { USER_E2E_TYPES } from './config/types/e2eTypes';
import { userTestE2eContainer } from './config/container/e2EContainer';

// eslint-disable-next-line @typescript-eslint/typedef
export const userTest = {
  config: {
    container: userTestE2eContainer,
    types: USER_E2E_TYPES,
  },
};
