import { injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../common/domain';
import { hasValue } from '../../../../../common/domain/utils/hasValue';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { UserDb } from '../model/UserDb';

@injectable()
export class UserFindQueryToUserDbFilterQueryConverter
  implements Converter<UserFindQuery, mongodb.FilterQuery<UserDb>> {
  public transform(input: UserFindQuery): mongodb.FilterQuery<UserDb> {
    const filterQuery: mongodb.FilterQuery<UserDb> = {};

    if (hasValue(input.id)) {
      filterQuery._id = new mongodb.ObjectID(input.id);
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
