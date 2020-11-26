import { MONGODB_ADAPTER_PUBLIC_TYPES } from './config/types';
import { MongoDbConnector } from './MongoDbConnector';
import { mongoDbContainer } from './config/container';

export { MongoDbConnector };

// eslint-disable-next-line @typescript-eslint/typedef
export const mongodbAdapter = {
  config: {
    container: mongoDbContainer,
    types: MONGODB_ADAPTER_PUBLIC_TYPES,
  },
};
