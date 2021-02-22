import { inject, injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter, Filter } from '../../../../../common/domain';
import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../integration-modules/mongodb/adapter';
import { MongoDbSearchRepository } from '../../../../../integration-modules/mongodb/adapter/MongoDbSearchRepository';
import { User } from '../../../domain/model/User';
import { UserFindQuery } from '../../../domain/query/UserFindQuery';
import { USER_ADAPTER_TYPES } from '../../config/types';
import { UserDb } from '../model/UserDb';


@injectable()
export class UserDbSearchRepository extends MongoDbSearchRepository<
  User,
  UserDb,
  UserDb,
  UserFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(USER_ADAPTER_TYPES.db.collection.USER_COLLECTION_NAME)
    collectionName: string,
    @inject(USER_ADAPTER_TYPES.db.converter.USER_DB_TO_USER_CONVERTER)
    userDbToUserConverter: Converter<UserDb, User>,
    @inject(mongodbAdapter.config.types.db.MONGODB_CONNECTOR)
    mongoDbConnector: MongoDbConnector,
    @inject(
      USER_ADAPTER_TYPES.db.converter
        .USER_FIND_QUERY_TO_USER_DB_FILTER_QUERY_CONVERTER,
    )
    userFindQueryToUserDbFilterQueryConverter: Converter<
      UserFindQuery,
      mongodb.FilterQuery<UserDb>
    >,
    @inject(USER_ADAPTER_TYPES.db.filter.POST_USER_DB_SEARCH_FILTER)
    postUserDbSearchFilter: Filter<UserDb, UserFindQuery>,
  ) {
    super(
      collectionName,
      userDbToUserConverter,
      mongoDbConnector,
      userFindQueryToUserDbFilterQueryConverter,
      postUserDbSearchFilter,
    );
  }
}
