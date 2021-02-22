import { appContainer } from './config/container';
import { APP_ADAPTER_PUBLIC_TYPES } from './config/types';
import { AppEnvVariables } from './env/AppEnvVariables';

export { AppEnvVariables };

// eslint-disable-next-line @typescript-eslint/typedef
export const appAdapter = {
  config: {
    container: appContainer,
    types: APP_ADAPTER_PUBLIC_TYPES,
  },
};
