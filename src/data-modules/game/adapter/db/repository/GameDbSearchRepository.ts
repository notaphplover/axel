import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../integration-modules/mongodb/adapter';
import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../config/types';
import { Game } from '../../../domain/model/Game';
import { GameDb } from '../model/GameDb';
import { GameFindQuery } from '../../../domain/query/GameFindQuery';
import { MongoDbSearchRepository } from '../../../../../integration-modules/mongodb/adapter/MongoDbSearchRepository';
import mongodb from 'mongodb';

@injectable()
export class GameDbSearchRepository extends MongoDbSearchRepository<
  Game,
  GameDb,
  GameDb,
  GameFindQuery
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
      GAME_ADAPTER_TYPES.db.converter
        .GAME_FIND_QUERY_TO_GAME_DB_FILTER_QUERY_CONVERTER,
    )
    gameFindQueryToGameDbFilterQueryConverter: Converter<
      GameFindQuery,
      mongodb.FilterQuery<GameDb>
    >,
  ) {
    super(
      collectionName,
      gameDbToGameConverter,
      mongoDbConnector,
      gameFindQueryToGameDbFilterQueryConverter,
    );
  }
}
