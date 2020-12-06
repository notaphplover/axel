import { inject, injectable } from 'inversify';
import { DB_ADAPTER_PUBLIC_TYPES } from '../../../../../../layer-modules/db/adapter/config/types';
import { DbDotEnvVariables } from '../../../../../../layer-modules/db/adapter';
import { EnvLoader } from '../../../../../../layer-modules/env/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { MongoDbCollectionInitializer } from '../../../../../../integration-modules/mongodb/adapter/MongoDbCollectionInitializer';
import { MongoDbIndex } from '../../../../../../integration-modules/mongodb/adapter/MongoDbIndex';
import mongodb from 'mongodb';

@injectable()
export class ExtendedGameSetupDbCollectionInitializer extends MongoDbCollectionInitializer {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.db.collection.setup
        .EXTENDED_GAME_SETUP_COLLECTION_NAME,
    )
    collectionName: string,
    @inject(DB_ADAPTER_PUBLIC_TYPES.env.DB_ENV_LOADER)
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
        name: 'extendedGameSetup.ownerUserId',
        spec: { ownerUserId: 1 },
      },
      {
        name: 'extendedGameSetup.playerSetups.userId',
        spec: { 'playerSetups.userId': 1 },
      },
    ];
  }
}
