import { appContainer } from './config/container';
import { APP_ADAPTER_PUBLIC_TYPES } from './config/types';
import { AppEnvVariables } from './env/AppEnvVariables';
import { AppWsMessageRouter } from './ws/msgHandler/AppWsMessageRouter';

export { AppEnvVariables, AppWsMessageRouter };

// eslint-disable-next-line @typescript-eslint/typedef
export const appAdapter = {
  config: {
    container: appContainer,
    types: APP_ADAPTER_PUBLIC_TYPES,
  },
};
