import { inject, injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../common/domain';
import {
  mongodbAdapter,
  MongoDbConnector,
  MongoDbDeleteRepository,
} from '../../../../../../integration-modules/mongodb/adapter';
import { GameSetupDeletionQuery } from '../../../../domain/query/setup/GameSetupDeletionQuery';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameSetupDb } from '../../model/setup/GameSetupDb';

@injectable()
export class GameSetupDbDeleteRepository extends MongoDbDeleteRepository<
  GameSetupDeletionQuery,
  GameSetupDb
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.collection.setup.GAME_SETUP_COLLECTION_NAME)
    collectionName: string,
    @inject(mongodbAdapter.config.types.db.MONGODB_CONNECTOR)
    mongoDbConnector: MongoDbConnector,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.setup
        .GAME_SETUP_DELETION_QUERY_TO_GAME_SETUP_DB_FILTER_CONVERTER,
    )
    gameSetupDeletionQueryToGameSetupDbFilterConverter: Converter<
      GameSetupDeletionQuery,
      mongodb.FilterQuery<GameSetupDb>
    >,
  ) {
    super(
      collectionName,
      mongoDbConnector,
      gameSetupDeletionQueryToGameSetupDbFilterConverter,
    );
  }
}
