import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../integration-modules/mongodb/adapter';
import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../config/types';
import { GameFindQuery } from '../../../domain/query/GameFindQuery';
import { LiveGame } from '../../../domain/model/live/LiveGame';
import { LiveGameDb } from '../model/live/LiveGameDb';
import { MongoDbSearchRepository } from '../../../../../integration-modules/mongodb/adapter/MongoDbSearchRepository';
import mongodb from 'mongodb';

@injectable()
export class GameDbSearchRepository extends MongoDbSearchRepository<
  LiveGame,
  LiveGameDb,
  LiveGameDb,
  GameFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.collection.GAME_COLLECTION_NAME)
    collectionName: string,
    @inject(GAME_ADAPTER_TYPES.db.converter.live.GAME_DB_TO_LIVE_GAME_CONVERTER)
    gameDbToGameConverter: Converter<LiveGameDb, LiveGame>,
    @inject(mongodbAdapter.config.types.db.MONGODB_CONNECTOR)
    mongoDbConnector: MongoDbConnector,
    @inject(
      GAME_ADAPTER_TYPES.db.converter
        .GAME_FIND_QUERY_TO_GAME_DB_FILTER_QUERY_CONVERTER,
    )
    gameFindQueryToGameDbFilterQueryConverter: Converter<
      GameFindQuery,
      mongodb.FilterQuery<LiveGameDb>
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
