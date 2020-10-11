import { FilterQuery, MongooseFilterQuery, Types } from 'mongoose';
import { Converter } from '../../../../../common/domain';
import { UserDb } from '../model/UserDb';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { hasValue } from '../../../../../common/domain/utils/hasValue';
import { injectable } from 'inversify';

@injectable()
export class UserFindQueryToUserDbFilterQueryConverter
  implements Converter<UserFindQuery, FilterQuery<UserDb>> {
  public transform(input: UserFindQuery): MongooseFilterQuery<UserDb> {
    const filterQuery: FilterQuery<UserDb> = {};

    if (hasValue(input.id)) {
      filterQuery._id = Types.ObjectId(input.id);
    }

    if (hasValue(input.email)) {
      filterQuery.email = input.email;
    }

    if (hasValue(input.username)) {
      filterQuery.username = input.username;
    }

    return filterQuery;
  }
}
