import { injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../../common/domain';
import { LiveGameConnectionsUpdateQuery } from '../../../../../domain/query/live/connection/LiveGameConnectionsUpdateQuery';
import { LiveGameConnectionsDb } from '../../../model/live/connection/LiveGameConnectionsDb';

@injectable()
export class LiveGameConnectionsUpdateQueryToLiveGameConnectionsDbFilterQueryConverter
  implements
    Converter<
      LiveGameConnectionsUpdateQuery,
      mongodb.FilterQuery<LiveGameConnectionsDb>
    > {
  public transform(
    liveGameConnectionsUpdateQuery: LiveGameConnectionsUpdateQuery,
  ): mongodb.FilterQuery<LiveGameConnectionsDb> {
    const liveGameConnectionsDbFilterQuery: mongodb.FilterQuery<LiveGameConnectionsDb> = {
      liveGameId: liveGameConnectionsUpdateQuery.liveGameId,
    };

    return liveGameConnectionsDbFilterQuery;
  }
}
