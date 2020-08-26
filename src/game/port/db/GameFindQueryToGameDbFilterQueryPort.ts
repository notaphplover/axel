import { FilterQuery } from 'mongoose';
import { GameDb } from '../../adapter/db/model/GameDb';
import { GameFindQuery } from '../../domain/query/GameFindQuery';
import { Port } from '../../../common/port';
import { common } from '../../../common/domain';

const hasValue: (object: unknown) => boolean = common.utils.hasValue;

export class GameFindQueryToGameDbFilterQueryPort
  implements Port<GameFindQuery, FilterQuery<GameDb>> {
  public transform(input: GameFindQuery): FilterQuery<GameDb> {
    const filterQuery: FilterQuery<GameDb> = {};

    if (hasValue(input.id)) {
      filterQuery._id = input.id;
    }

    if (hasValue(input.round)) {
      filterQuery.round = input.round;
    }

    return filterQuery;
  }
}
