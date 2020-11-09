import { DB_ADAPTER_PUBLIC_TYPES } from './config/types';
import { DbDotEnvVariables } from './env/DbDotEnvVariables';
import { dbContainer } from './config/container';

export { DbDotEnvVariables };

// eslint-disable-next-line @typescript-eslint/typedef
export const dbAdapter = {
  config: {
    container: dbContainer,
    types: DB_ADAPTER_PUBLIC_TYPES,
  },
};
