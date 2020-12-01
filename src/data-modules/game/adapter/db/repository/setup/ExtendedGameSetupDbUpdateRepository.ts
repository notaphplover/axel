import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { ExtendedGameSetup } from '../../../../domain/model/setup/ExtendedGameSetup';
import { ExtendedGameSetupDb } from '../../model/setup/ExtendedGameSetupDb';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameSetupUpdateQuery } from '../../../../domain/query/setup/GameSetupUpdateQuery';
import { MONGODB_ADAPTER_TYPES } from '../../../../../../integration-modules/mongodb/adapter/config/types';
import { MongoDbConnector } from '../../../../../../integration-modules/mongodb/adapter';
import { MongoDbUpdateRepository } from '../../../../../../integration-modules/mongodb/adapter/MongoDbUpdateRepository';
import mongodb from 'mongodb';

@injectable()
export class ExtendedGameSetupDbUpdateRepository extends MongoDbUpdateRepository<
  ExtendedGameSetup,
  GameSetupUpdateQuery,
  ExtendedGameSetupDb
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.db.collection.setup
        .EXTENDED_GAME_SETUP_COLLECTION_NAME,
    )
    extendedGameSetupCollectionName: string,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.setup
        .EXTENDED_GAME_SETUP_DB_TO_EXTENDED_GAME_SETUP_CONVERTER,
    )
    extendedGameSetupDbToExtendedGameSetupConverter: Converter<
      ExtendedGameSetupDb,
      ExtendedGameSetup
    >,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.setup
        .GAME_SETUP_UPDATE_QUERY_TO_EXTENDED_GAME_SETUP_DB_FILTER_QUERY_CONVERTER,
    )
    gameSetupUpdateQueryToExtendedGameSetupDbFilterQueryConverter: Converter<
      GameSetupUpdateQuery,
      mongodb.FilterQuery<ExtendedGameSetupDb>
    >,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.setup
        .GAME_SETUP_UPDATE_QUERY_TO_EXTENDED_GAME_SETUP_DB_UPDATE_QUERY_CONVERTER,
    )
    gameSetupUpdateQueryToExtendedGameSetupDbUpdateQueryConverter: Converter<
      GameSetupUpdateQuery,
      mongodb.UpdateQuery<ExtendedGameSetupDb>
    >,
    @inject(MONGODB_ADAPTER_TYPES.db.MONGODB_CONNECTOR)
    protected readonly mongoDbConnector: MongoDbConnector,
  ) {
    super(
      extendedGameSetupCollectionName,
      extendedGameSetupDbToExtendedGameSetupConverter,
      mongoDbConnector,
      gameSetupUpdateQueryToExtendedGameSetupDbFilterQueryConverter,
      gameSetupUpdateQueryToExtendedGameSetupDbUpdateQueryConverter,
    );
  }
}
