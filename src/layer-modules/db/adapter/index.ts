import { DB_ADAPTER_PUBLIC_TYPES } from './config/types';
import { MongooseConector } from './MongooseConnector';
import { MongooseInsertRepository } from './MongooseInsertRepository';
import { MongoosePaginatedSearchRepository } from './MongoosePaginatedSearchRepository';
import { MongooseProjectionPaginatedSearchRepository } from './MongooseProjectionPaginatedSearchRepository';
import { MongooseSearchRepository } from './MongooseSearchRepository';
import { dbContainer } from './config/container';

export {
  MongooseConector,
  MongooseInsertRepository,
  MongoosePaginatedSearchRepository,
  MongooseProjectionPaginatedSearchRepository,
  MongooseSearchRepository,
};

// eslint-disable-next-line @typescript-eslint/typedef
export const dbAdapter = {
  config: {
    container: dbContainer,
    types: DB_ADAPTER_PUBLIC_TYPES,
  },
};
