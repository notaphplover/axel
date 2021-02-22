import { injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { LiveGameFindQuery } from '../../../../domain/query/live/LiveGameFindQuery';
import { LiveGameFindQueryApiV1 } from '../../query/live/LiveGameFindQueryApiV1';

@injectable()
export class LiveGameFindQueryApiV1ToLiveGameFindQueryConverter
  implements Converter<LiveGameFindQueryApiV1, Promise<LiveGameFindQuery>> {
  public async transform(
    input: LiveGameFindQueryApiV1,
  ): Promise<LiveGameFindQuery> {
    const liveGameFindQuery: LiveGameFindQuery = {
      id: input.id,
    };

    return liveGameFindQuery;
  }
}
