import { inject, injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../../common/domain';
import {
  mongodbAdapter,
  MongoDbConnector,
  MongoDbSearchRepository,
} from '../../../../../../../integration-modules/mongodb/adapter';
import { LiveGameConnections } from '../../../../../domain/model/live/connection/LiveGameConnections';
import { LiveGameConnectionsFindQuery } from '../../../../../domain/query/live/connection/LiveGameConnectionsFindQuery';
import { GAME_ADAPTER_TYPES } from '../../../../config/types';
import { LiveGameConnectionsDb } from '../../../model/live/connection/LiveGameConnectionsDb';

@injectable()
export class LiveGameConnectionsDbSearchRepository extends MongoDbSearchRepository<
  LiveGameConnections,
  LiveGameConnectionsDb,
  LiveGameConnectionsDb,
  LiveGameConnectionsFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.db.collection.live
        .LIVE_GAME_CONNECTIONS_COLLECTION_NAME,
    )
    collectionName: string,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.live.connection
        .LIVE_GAME_CONNECTIONS_DB_TO_LIVE_GAME_CONNECTIONS_CONVERTER,
    )
    liveGameConnectionsDbToLiveGameConnectionsConverter: Converter<
      LiveGameConnectionsDb,
      LiveGameConnections
    >,
    @inject(mongodbAdapter.config.types.db.MONGODB_CONNECTOR)
    mongoDbConnector: MongoDbConnector,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.live.connection
        .LIVE_GAME_CONNECTIONS_FIND_QUERY_TO_LIVE_GAME_CONNECTIONS_DB_FILTER_QUERY_CONVERTER,
    )
    liveGameConnectionsFindQueryToLiveGameConnectionsDbFilterQueryConverter: Converter<
      LiveGameConnectionsFindQuery,
      mongodb.FilterQuery<LiveGameConnectionsDb>
    >,
  ) {
    super(
      collectionName,
      liveGameConnectionsDbToLiveGameConnectionsConverter,
      mongoDbConnector,
      liveGameConnectionsFindQueryToLiveGameConnectionsDbFilterQueryConverter,
    );
  }
}
