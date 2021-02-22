import { jwtContainer } from './config/container';
import { JWT_ADAPTER_PUBLIC_TYPES } from './config/types';
import { JwtDotEnvVariables } from './env/JwtDotEnvVariables';

export { JwtDotEnvVariables };

// eslint-disable-next-line @typescript-eslint/typedef
export const jwtAdapter = {
  config: {
    container: jwtContainer,
    types: JWT_ADAPTER_PUBLIC_TYPES,
  },
};
