import { Converter } from '../../../../../../common/domain';
import { LiveGameFindQuery } from '../../../../domain/query/live/LiveGameFindQuery';
import { LiveGameFindQueryApiV1 } from '../../query/live/LiveGameFindQueryApiV1';
import { injectable } from 'inversify';

@injectable()
export class LiveGameFindQueryApiV1ToLiveGameFindQueryConverter
  implements Converter<LiveGameFindQueryApiV1, LiveGameFindQuery> {
  public transform(input: LiveGameFindQueryApiV1): LiveGameFindQuery {
    const liveGameFindQuery: LiveGameFindQuery = {
      id: input.id,
    };

    return liveGameFindQuery;
  }
}
