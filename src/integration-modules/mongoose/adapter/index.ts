import { MONGOOSE_ADAPTER_PUBLIC_TYPES } from './config/types';
import { MongooseConector } from './MongooseConnector';
import { MongooseInsertRepository } from './MongooseInsertRepository';
import { MongoosePaginatedSearchRepository } from './MongoosePaginatedSearchRepository';
import { MongooseProjectionPaginatedSearchRepository } from './MongooseProjectionPaginatedSearchRepository';
import { MongooseSearchRepository } from './MongooseSearchRepository';
import { mongooseContainer } from './config/container';

export {
  MongooseConector,
  MongooseInsertRepository,
  MongoosePaginatedSearchRepository,
  MongooseProjectionPaginatedSearchRepository,
  MongooseSearchRepository,
};

// eslint-disable-next-line @typescript-eslint/typedef
export const mongooseAdapter = {
  config: {
    container: mongooseContainer,
    types: MONGOOSE_ADAPTER_PUBLIC_TYPES,
  },
};
