import { Converter } from '../../../../../common/domain';
import { GameFindQuery } from '../../../domain/query/GameFindQuery';
import { LiveGameDb } from '../model/live/LiveGameDb';
import { commonDomain } from '../../../../../common/domain';
import { injectable } from 'inversify';
import mongodb from 'mongodb';

const hasValue: <TType>(
  value: TType,
) => value is Exclude<TType, null | undefined> = commonDomain.utils.hasValue;

@injectable()
export class GameFindQueryToLiveGameDbFilterQueryConverter
  implements Converter<GameFindQuery, mongodb.FilterQuery<LiveGameDb>> {
  public transform(input: GameFindQuery): mongodb.FilterQuery<LiveGameDb> {
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
