import { inject, injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../common/domain';
import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../../integration-modules/mongodb/adapter';
import { MongoDbInsertRepository } from '../../../../../../integration-modules/mongodb/adapter/MongoDbInsertRepository';
import { GameSetup } from '../../../../domain/model/setup/GameSetup';
import { GameSetupsCreationQuery } from '../../../../domain/query/setup/GameSetupCreationQuery';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameSetupDb } from '../../model/setup/GameSetupDb';


@injectable()
export class GameSetupDbInsertRepository extends MongoDbInsertRepository<
  GameSetup,
  GameSetupDb,
  GameSetupsCreationQuery
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
        .GAME_SETUP_CREATION_QUERY_TO_GAME_SETUP_DBS_CONVERTER,
    )
    gameSetupCreationQueryToGameSetupDbsConverter: Converter<
      GameSetupsCreationQuery,
      mongodb.OptionalId<GameSetupDb>[]
    >,
  ) {
    super(
      collectionName,
      gameSetupDbToGameSetupConverter,
      mongoDbConnector,
      gameSetupCreationQueryToGameSetupDbsConverter,
    );
  }
}
