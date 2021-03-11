import { inject, injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../common/domain';
import {
  MongoDbConnector,
  mongodbAdapter,
  MongoDbSearchRepository,
} from '../../../../../../integration-modules/mongodb/adapter';
import { LiveGame } from '../../../../domain/model/live/LiveGame';
import { LiveGameFindQuery } from '../../../../domain/query/live/LiveGameFindQuery';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { LiveGameDb } from '../../model/live/LiveGameDb';

@injectable()
export class LiveGameDbSearchRepository extends MongoDbSearchRepository<
  LiveGame,
  LiveGameDb,
  LiveGameDb,
  LiveGameFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.collection.GAME_COLLECTION_NAME)
    collectionName: string,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.live.LIVE_GAME_DB_TO_LIVE_GAME_CONVERTER,
    )
    gameDbToGameConverter: Converter<LiveGameDb, LiveGame>,
    @inject(mongodbAdapter.config.types.db.MONGODB_CONNECTOR)
    mongoDbConnector: MongoDbConnector,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.live
        .LIVE_GAME_FIND_QUERY_TO_LIVE_GAME_DB_FILTER_QUERY_CONVERTER,
    )
    gameFindQueryToGameDbFilterQueryConverter: Converter<
      LiveGameFindQuery,
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
