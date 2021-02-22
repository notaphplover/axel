import { inject, injectable } from 'inversify';
import mongodb from 'mongodb';

import {
  MongoDbCollectionInitializer,
  MongoDbIndex,
} from '../../../../../../integration-modules/mongodb/adapter';
import { DbDotEnvVariables , dbAdapter } from '../../../../../../layer-modules/db/adapter';
import { EnvLoader } from '../../../../../../layer-modules/env/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';


@injectable()
export class GameSetupDbCollectionInitializer extends MongoDbCollectionInitializer {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.collection.setup.GAME_SETUP_COLLECTION_NAME)
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
    return [
      {
        name: 'gameSetup.ownerUserId',
        spec: { ownerUserId: 1 },
      },
      {
        name: 'gameSetup.playerSetups.userId',
        spec: { 'playerSetups.userId': 1 },
      },
    ];
  }
}
