import { Converter } from '../../../../../common/domain';
import { FilterQuery } from 'mongoose';
import { GameDb } from '../model/GameDb';
import { GameFindQuery } from '../../../domain/query/GameFindQuery';
import { Types } from 'mongoose';
import { commonDomain } from '../../../../../common/domain';
import { injectable } from 'inversify';

const hasValue: (object: unknown) => boolean = commonDomain.utils.hasValue;

@injectable()
export class GameFindQueryToGameDbFilterQueryConverter
  implements Converter<GameFindQuery, FilterQuery<GameDb>> {
  public transform(input: GameFindQuery): FilterQuery<GameDb> {
    const filterQuery: FilterQuery<GameDb> = {};

    if (hasValue(input.id)) {
      filterQuery._id = Types.ObjectId(input.id);
    }

    if (hasValue(input.round)) {
      filterQuery.round = input.round;
    }

    return filterQuery;
  }
}
