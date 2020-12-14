import { MONGODB_ADAPTER_PUBLIC_TYPES } from './config/types';
import { MongoDbCollectionInitializer } from './MongoDbCollectionInitializer';
import { MongoDbConnector } from './MongoDbConnector';
import { MongoDbIndex } from './MongoDbIndex';
import { MongoDbInitializer } from './MongoDbInitializer';
import { mongoDbContainer } from './config/container';

export {
  MongoDbCollectionInitializer,
  MongoDbConnector,
  MongoDbIndex,
  MongoDbInitializer,
};

// eslint-disable-next-line @typescript-eslint/typedef
export const mongodbAdapter = {
  config: {
    container: mongoDbContainer,
    types: MONGODB_ADAPTER_PUBLIC_TYPES,
  },
};
