import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../../integration-modules/mongodb/adapter';
import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { LiveGame } from '../../../../domain/model/live/LiveGame';
import { LiveGameCreationQuery } from '../../../../domain/query/live/LiveGameCreationQuery';
import { LiveGameDb } from '../../model/live/LiveGameDb';
import { MongoDbInsertRepository } from '../../../../../../integration-modules/mongodb/adapter/MongoDbInsertRepository';
import mongodb from 'mongodb';

@injectable()
export class LiveGameDbInsertRepository extends MongoDbInsertRepository<
  LiveGame,
  LiveGameDb,
  LiveGameCreationQuery
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
        .LIVE_GAME_CREATION_QUERY_TO_LIVE_GAME_DBS_CONVERTER,
    )
    gameCreationQueryToGameDbsConverter: Converter<
      LiveGameCreationQuery,
      mongodb.OptionalId<LiveGameDb>[]
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
