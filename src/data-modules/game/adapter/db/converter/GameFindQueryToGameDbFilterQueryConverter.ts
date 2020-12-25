import { Converter } from '../../../../../common/domain';
import { GameDb } from '../model/GameDb';
import { GameFindQuery } from '../../../domain/query/GameFindQuery';
import { commonDomain } from '../../../../../common/domain';
import { injectable } from 'inversify';
import mongodb from 'mongodb';

const hasValue: <TType>(
  value: TType,
) => value is Exclude<TType, null | undefined> = commonDomain.utils.hasValue;

@injectable()
export class GameFindQueryToGameDbFilterQueryConverter
  implements Converter<GameFindQuery, mongodb.FilterQuery<GameDb>> {
  public transform(input: GameFindQuery): mongodb.FilterQuery<GameDb> {
    const filterQuery: mongodb.FilterQuery<GameDb> = {};

    if (hasValue(input.id)) {
      filterQuery._id = new mongodb.ObjectID(input.id);
    }

    if (hasValue(input.round)) {
      filterQuery.round = input.round;
    }

    return filterQuery;
  }
}
