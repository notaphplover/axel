import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../../integration-modules/mongodb/adapter';
import { inject, injectable } from 'inversify';
import { BasicGameSetup } from '../../../../domain/model/setup/BasicGameSetup';
import { BasicGameSetupDb } from '../../model/setup/BasicGameSetupDb';
import { BasicGameSetupFindQuery } from '../../../../domain/query/setup/BasicGameSetupFindQuery';
import { Converter } from '../../../../../../common/domain';
import { ExtendedGameSetupDb } from '../../model/setup/ExtendedGameSetupDb';
import { ExtendedGameSetupFindQuery } from '../../../../domain/query/setup/ExtendedGameSetupFindQuery';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { MongoDbPaginatedSearchRepository } from '../../../../../../integration-modules/mongodb/adapter/MongoDbPaginatedSearchRepository';
import mongodb from 'mongodb';

@injectable()
export class BasicGameSetupDbSearchRepository extends MongoDbPaginatedSearchRepository<
  BasicGameSetup,
  ExtendedGameSetupDb,
  BasicGameSetupDb,
  ExtendedGameSetupFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.db.collection.setup
        .EXTENDED_GAME_SETUP_COLLECTION_NAME,
    )
    collectionName: string,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.setup
        .BASIC_GAME_SETUP_DB_TO_BASIC_GAME_SETUP_CONVERTER,
    )
    basicGameSetupDbToBasicGameSetupConverter: Converter<
      BasicGameSetupDb,
      BasicGameSetup
    >,
    @inject(mongodbAdapter.config.types.db.MONGODB_CONNECTOR)
    mongoDbConnector: MongoDbConnector,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.setup
        .GAME_SETUP_FIND_QUERY_TO_EXTENDED_GAME_SETUP_DB_FILTER_QUERY_CONVERTER,
    )
    gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter: Converter<
      BasicGameSetupFindQuery,
      mongodb.FilterQuery<ExtendedGameSetupDb>
    >,
  ) {
    super(
      collectionName,
      basicGameSetupDbToBasicGameSetupConverter,
      mongoDbConnector,
      gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter,
    );
  }

  protected getFindOptions(): mongodb.FindOneOptions<BasicGameSetupDb> {
    const findOneOptions: mongodb.FindOneOptions<BasicGameSetupDb> = super.getFindOptions();

    findOneOptions.projection = { 'playerSetups.deck': 0 };

    return findOneOptions;
  }
}
