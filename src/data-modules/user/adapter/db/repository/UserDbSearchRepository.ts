import { Converter, Filter } from '../../../../../common/domain';
import { FilterQuery, Model } from 'mongoose';
import { inject, injectable } from 'inversify';
import { MongooseSearchRepository } from '../../../../../layer-modules/db/adapter';
import { USER_ADAPTER_TYPES } from '../../config/types';
import { User } from '../../../domain/model/User';
import { UserDb } from '../model/UserDb';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';

@injectable()
export class UserDbSearchReporitory extends MongooseSearchRepository<
  User,
  UserDb,
  UserFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(USER_ADAPTER_TYPES.db.model.USER_DB_MODEL)
    model: Model<UserDb>,
    @inject(USER_ADAPTER_TYPES.db.converter.USER_DB_TO_USER_CONVERTER)
    userDbToUserConverter: Converter<UserDb, User>,
    @inject(
      USER_ADAPTER_TYPES.db.converter
        .USER_FIND_QUERY_TO_USER_DB_FILTER_QUERY_CONVERTER,
    )
    userFindQueryToUserDbFilterQueryConverter: Converter<
      UserFindQuery,
      FilterQuery<UserDb>
    >,
    @inject(USER_ADAPTER_TYPES.db.filter.POST_USER_DB_SEARCH_FILTER)
    postUserDbSearchFilter: Filter<UserDb, UserFindQuery>,
  ) {
    super(
      model,
      userDbToUserConverter,
      userFindQueryToUserDbFilterQueryConverter,
      postUserDbSearchFilter,
    );
  }
}
