import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../integration-modules/mongodb/adapter';
import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../config/types';
import { Game } from '../../../domain/model/Game';
import { GameCreationQuery } from '../../../domain/query/GameCreationQuery';
import { GameDb } from '../model/GameDb';
import { MongoDbInsertRepository } from '../../../../../integration-modules/mongodb/adapter/MongoDbInsertRepository';
import mongodb from 'mongodb';

@injectable()
export class GameDbInsertRepository extends MongoDbInsertRepository<
  Game,
  GameDb,
  GameCreationQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.collection.GAME_COLLECTION_NAME)
    collectionName: string,
    @inject(GAME_ADAPTER_TYPES.db.converter.GAME_DB_TO_GAME_CONVERTER)
    gameDbToGameConverter: Converter<GameDb, Game>,
    @inject(mongodbAdapter.config.types.db.MONGODB_CONNECTOR)
    mongoDbConnector: MongoDbConnector,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.GAME_CREATION_QUERY_TO_GAME_DBS_CONVERTER,
    )
    gameCreationQueryToGameDbsConverter: Converter<
      GameCreationQuery,
      mongodb.OptionalId<GameDb>[]
    >,
  ) {
    super(
      collectionName,
      gameDbToGameConverter,
      mongoDbConnector,
      gameCreationQueryToGameDbsConverter,
    );
  }
}
