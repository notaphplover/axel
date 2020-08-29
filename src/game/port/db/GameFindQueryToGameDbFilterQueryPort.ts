import { Converter } from '../../../common/domain';
import { FilterQuery } from 'mongoose';
import { GameDb } from '../../adapter/db/model/GameDb';
import { GameFindQuery } from '../../domain/query/GameFindQuery';
import { common } from '../../../common/domain';
import { injectable } from 'inversify';

const hasValue: (object: unknown) => boolean = common.utils.hasValue;

@injectable()
export class GameFindQueryToGameDbFilterQueryPort
  implements Converter<GameFindQuery, FilterQuery<GameDb>> {
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
