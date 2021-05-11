import { injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter, commonDomain } from '../../../../../../common/domain';
import { LiveGameFindQuery } from '../../../../domain/query/live/LiveGameFindQuery';
import { LiveGameDb } from '../../model/live/LiveGameDb';

const hasValue: <TType>(
  value: TType,
) => value is Exclude<TType, null | undefined> = commonDomain.utils.hasValue;

@injectable()
export class LiveGameFindQueryToLiveGameDbFilterQueryConverter
  implements Converter<LiveGameFindQuery, mongodb.FilterQuery<LiveGameDb>>
{
  public transform(input: LiveGameFindQuery): mongodb.FilterQuery<LiveGameDb> {
    const filterQuery: mongodb.FilterQuery<LiveGameDb> = {};

    if (hasValue(input.id)) {
      filterQuery._id = new mongodb.ObjectID(input.id);
    }

    if (hasValue(input.round)) {
      filterQuery.round = input.round;
    }

    return filterQuery;
  }
}
