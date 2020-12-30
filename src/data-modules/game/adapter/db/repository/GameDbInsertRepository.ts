import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../integration-modules/mongodb/adapter';
import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../config/types';
import { GameCreationQuery } from '../../../domain/query/GameCreationQuery';
import { LiveGame } from '../../../domain/model/live/LiveGame';
import { LiveGameDb } from '../model/live/LiveGameDb';
import { MongoDbInsertRepository } from '../../../../../integration-modules/mongodb/adapter/MongoDbInsertRepository';
import mongodb from 'mongodb';

@injectable()
export class GameDbInsertRepository extends MongoDbInsertRepository<
  LiveGame,
  LiveGameDb,
  GameCreationQuery
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
      GAME_ADAPTER_TYPES.db.converter.live
        .GAME_CREATION_QUERY_TO_LIVE_GAME_DBS_CONVERTER,
    )
    gameCreationQueryToGameDbsConverter: Converter<
      GameCreationQuery,
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
