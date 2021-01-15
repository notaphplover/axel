import { Converter } from '../../../../../../common/domain';
import { LiveGameCreationQuery } from '../../../../domain/query/live/LiveGameCreationQuery';
import { LiveGameCreationQueryApiV1 } from '../../query/live/LiveGameCreationQueryApiV1';

export class LiveGameCreationQueryApiV1ToLiveGameCreationQueryConverter
  implements Converter<LiveGameCreationQueryApiV1, LiveGameCreationQuery> {
  public transform(): LiveGameCreationQuery {
    const liveGameCreationQuery: LiveGameCreationQuery = {
      round: 1,
    };

    return liveGameCreationQuery;
  }
}
