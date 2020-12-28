import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../../integration-modules/mongodb/adapter';
import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameSetup } from '../../../../domain/model/setup/GameSetup';
import { GameSetupDb } from '../../model/setup/GameSetupDb';
import { GameSetupFindQuery } from '../../../../domain/query/setup/GameSetupFindQuery';
import { MongoDbPaginatedSearchRepository } from '../../../../../../integration-modules/mongodb/adapter/MongoDbPaginatedSearchRepository';
import mongodb from 'mongodb';

@injectable()
export class GameSetupDbSearchRepository extends MongoDbPaginatedSearchRepository<
  GameSetup,
  GameSetupDb,
  GameSetupDb,
  GameSetupFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.collection.setup.GAME_SETUP_COLLECTION_NAME)
    collectionName: string,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.setup
        .GAME_SETUP_DB_TO_GAME_SETUP_CONVERTER,
    )
    gameSetupDbToGameSetupConverter: Converter<GameSetupDb, GameSetup>,
    @inject(mongodbAdapter.config.types.db.MONGODB_CONNECTOR)
    mongoDbConnector: MongoDbConnector,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.setup
        .GAME_SETUP_FIND_QUERY_TO_GAME_SETUP_DB_FILTER_QUERY_CONVERTER,
    )
    gameSetupFindQueryToGameSetupDbFilterQueryConverter: Converter<
      GameSetupFindQuery,
      mongodb.FilterQuery<GameSetupDb>
    >,
  ) {
    super(
      collectionName,
      gameSetupDbToGameSetupConverter,
      mongoDbConnector,
      gameSetupFindQueryToGameSetupDbFilterQueryConverter,
    );
  }
}
