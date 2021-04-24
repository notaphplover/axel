import { inject, injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../../common/domain';
import {
  mongodbAdapter,
  MongoDbConnector,
  MongoDbUpdateRepository,
} from '../../../../../../../integration-modules/mongodb/adapter';
import { LiveGameConnections } from '../../../../../domain/model/live/connection/LiveGameConnections';
import { LiveGameConnectionsUpdateQuery } from '../../../../../domain/query/live/connection/LiveGameConnectionsUpdateQuery';
import { GAME_ADAPTER_TYPES } from '../../../../config/types';
import { LiveGameConnectionsDb } from '../../../model/live/connection/LiveGameConnectionsDb';

@injectable()
export class LiveGameConnectionsDbUpdateRepository extends MongoDbUpdateRepository<
  LiveGameConnections,
  LiveGameConnectionsUpdateQuery,
  LiveGameConnectionsDb
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
        .LIVE_GAME_CONNECTIONS_UPDATE_QUERY_TO_LIVE_GAME_CONNECTIONS_DB_FILTER_QUERY_CONVERTER,
    )
    queryToFilterQueryConverter: Converter<
      LiveGameConnectionsUpdateQuery,
      | mongodb.FilterQuery<LiveGameConnectionsDb>
      | Promise<mongodb.FilterQuery<LiveGameConnectionsDb>>
    >,
    queryToUpdateQueryConverter: Converter<
      LiveGameConnectionsUpdateQuery,
      | mongodb.UpdateQuery<LiveGameConnectionsDb>
      | Promise<mongodb.UpdateQuery<LiveGameConnectionsDb>>
    >,
  ) {
    super(
      collectionName,
      liveGameConnectionsDbToLiveGameConnectionsConverter,
      mongoDbConnector,
      queryToFilterQueryConverter,
      queryToUpdateQueryConverter,
    );
  }
}
