import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameSetup } from '../../../../domain/model/setup/GameSetup';
import { GameSetupDb } from '../../model/setup/GameSetupDb';
import { GameSetupUpdateQuery } from '../../../../domain/query/setup/GameSetupUpdateQuery';
import { MONGODB_ADAPTER_TYPES } from '../../../../../../integration-modules/mongodb/adapter/config/types';
import { MongoDbConnector } from '../../../../../../integration-modules/mongodb/adapter';
import { MongoDbUpdateRepository } from '../../../../../../integration-modules/mongodb/adapter/MongoDbUpdateRepository';
import mongodb from 'mongodb';

@injectable()
export class GameSetupDbUpdateRepository extends MongoDbUpdateRepository<
  GameSetup,
  GameSetupUpdateQuery,
  GameSetupDb
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.collection.setup.GAME_SETUP_COLLECTION_NAME)
    gameSetupCollectionName: string,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.setup
        .GAME_SETUP_DB_TO_GAME_SETUP_CONVERTER,
    )
    gameSetupDbToGameSetupConverter: Converter<GameSetupDb, GameSetup>,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.setup
        .GAME_SETUP_UPDATE_QUERY_TO_GAME_SETUP_DB_FILTER_QUERY_CONVERTER,
    )
    gameSetupUpdateQueryToGameSetupDbFilterQueryConverter: Converter<
      GameSetupUpdateQuery,
      mongodb.FilterQuery<GameSetupDb>
    >,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.setup
        .GAME_SETUP_UPDATE_QUERY_TO_GAME_SETUP_DB_UPDATE_QUERY_CONVERTER,
    )
    gameSetupUpdateQueryToGameSetupDbUpdateQueryConverter: Converter<
      GameSetupUpdateQuery,
      mongodb.UpdateQuery<GameSetupDb>
    >,
    @inject(MONGODB_ADAPTER_TYPES.db.MONGODB_CONNECTOR)
    protected readonly mongoDbConnector: MongoDbConnector,
  ) {
    super(
      gameSetupCollectionName,
      gameSetupDbToGameSetupConverter,
      mongoDbConnector,
      gameSetupUpdateQueryToGameSetupDbFilterQueryConverter,
      gameSetupUpdateQueryToGameSetupDbUpdateQueryConverter,
    );
  }
}
