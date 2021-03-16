import { inject, injectable } from 'inversify';
import mongodb from 'mongodb';

import {
  MongoDbCollectionInitializer,
  MongoDbIndex,
} from '../../../../../../integration-modules/mongodb/adapter';
import {
  DbDotEnvVariables,
  dbAdapter,
} from '../../../../../../layer-modules/db/adapter';
import { EnvLoader } from '../../../../../../layer-modules/env/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

@injectable()
export class LiveGameDbCollectionInitializer extends MongoDbCollectionInitializer {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.collection.live.LIVE_GAME_COLLECTION_NAME)
    collectionName: string,
    @inject(dbAdapter.config.types.env.DB_ENV_LOADER)
    dbEnvLoader: EnvLoader<DbDotEnvVariables>,
  ) {
    super(collectionName, dbEnvLoader);
  }

  protected getCollectionCreationOptions(): mongodb.CollectionCreateOptions {
    return {};
  }

  protected getIndexes(): MongoDbIndex[] {
    return [];
  }
}
