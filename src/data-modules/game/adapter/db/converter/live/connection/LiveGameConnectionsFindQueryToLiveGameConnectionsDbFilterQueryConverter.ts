import { injectable } from 'inversify';
import mongodb from 'mongodb';

import { commonDomain, Converter } from '../../../../../../../common/domain';
import { LiveGameConnectionsFindQuery } from '../../../../../domain/query/live/connection/LiveGameConnectionsFindQuery';
import { LiveGameConnectionsDb } from '../../../model/live/connection/LiveGameConnectionsDb';

const hasValue: <TType>(
  value: TType,
) => value is Exclude<TType, null | undefined> = commonDomain.utils.hasValue;

@injectable()
export class LiveGameConnectionsFindQueryToLiveGameConnectionsDbFilterQueryConverter
  implements
    Converter<
      LiveGameConnectionsFindQuery,
      mongodb.FilterQuery<LiveGameConnectionsDb>
    >
{
  public transform(
    liveGameConnectionsFindQuery: LiveGameConnectionsFindQuery,
  ): mongodb.FilterQuery<LiveGameConnectionsDb> {
    const andFilterQuery: mongodb.FilterQuery<LiveGameConnectionsDb>[] = [];

    if (hasValue(liveGameConnectionsFindQuery.id)) {
      andFilterQuery.push({
        _id: new mongodb.ObjectID(liveGameConnectionsFindQuery.id),
      });
    }

    if (hasValue(liveGameConnectionsFindQuery.liveGameId)) {
      andFilterQuery.push({
        liveGameId: liveGameConnectionsFindQuery.liveGameId,
      });
    }

    const filterQuery: mongodb.FilterQuery<LiveGameConnectionsDb> = {};

    if (andFilterQuery.length > 0) {
      filterQuery.$and = andFilterQuery;
    }

    return filterQuery;
  }
}
