import { mongooseContainer } from './config/container';
import { MONGOOSE_ADAPTER_PUBLIC_TYPES } from './config/types';
import { MongooseInsertRepository } from './MongooseInsertRepository';
import { MongoosePaginatedSearchRepository } from './MongoosePaginatedSearchRepository';
import { MongooseProjectionPaginatedSearchRepository } from './MongooseProjectionPaginatedSearchRepository';
import { MongooseSearchRepository } from './MongooseSearchRepository';
import { MongooseUpdateRepository } from './MongooseUpdateRepository';

export {
  MongooseInsertRepository,
  MongoosePaginatedSearchRepository,
  MongooseProjectionPaginatedSearchRepository,
  MongooseSearchRepository,
  MongooseUpdateRepository,
};

// eslint-disable-next-line @typescript-eslint/typedef
export const mongooseAdapter = {
  config: {
    container: mongooseContainer,
    types: MONGOOSE_ADAPTER_PUBLIC_TYPES,
  },
};
