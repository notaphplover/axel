import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../../integration-modules/mongodb/adapter';
import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { ExtendedGameSetup } from '../../../../domain/model/setup/ExtendedGameSetup';
import { ExtendedGameSetupDb } from '../../model/setup/ExtendedGameSetupDb';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameSetupsCreationQuery } from '../../../../domain/query/setup/GameSetupCreationQuery';
import { MongoDbInsertRepository } from '../../../../../../integration-modules/mongodb/adapter/MongoDbInsertRepository';
import mongodb from 'mongodb';

@injectable()
export class ExtendedGameSetupDbInsertRepository extends MongoDbInsertRepository<
  ExtendedGameSetup,
  ExtendedGameSetupDb,
  GameSetupsCreationQuery
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
        .EXTENDED_GAME_SETUP_DB_TO_EXTENDED_GAME_SETUP_CONVERTER,
    )
    extendedGameSetupDbToExtendedGameSetupConverter: Converter<
      ExtendedGameSetupDb,
      ExtendedGameSetup
    >,
    @inject(mongodbAdapter.config.types.db.MONGODB_CONNECTOR)
    mongoDbConnector: MongoDbConnector,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.setup
        .GAME_SETUP_CREATION_QUERY_TO_EXTENDED_GAME_SETUP_DBS_CONVERTER,
    )
    gameSetupCreationQueryToExtendedGameSetupDbsConverter: Converter<
      GameSetupsCreationQuery,
      mongodb.OptionalId<ExtendedGameSetupDb>[]
    >,
  ) {
    super(
      collectionName,
      extendedGameSetupDbToExtendedGameSetupConverter,
      mongoDbConnector,
      gameSetupCreationQueryToExtendedGameSetupDbsConverter,
    );
  }
}
