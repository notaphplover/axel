import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../integration-modules/mongodb/adapter';
import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../common/domain';
import { MongoDbInsertRepository } from '../../../../../integration-modules/mongodb/adapter/MongoDbInsertRepository';
import { USER_ADAPTER_TYPES } from '../../config/types';
import { User } from '../../../domain/model/User';
import { UserCreationQuery } from '../../../domain/query/UserCreationQuery';
import { UserDb } from '../model/UserDb';
import mongodb from 'mongodb';

@injectable()
export class UserDbInsertRepository extends MongoDbInsertRepository<
  User,
  UserDb,
  UserCreationQuery
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
      USER_ADAPTER_TYPES.db.converter.USER_CREATION_QUERY_TO_USER_DBS_CONVERTER,
    )
    userCreationQueryToUserDbsConverter: Converter<
      UserCreationQuery,
      Promise<mongodb.OptionalId<UserDb>[]>
    >,
  ) {
    super(
      collectionName,
      userDbToUserConverter,
      mongoDbConnector,
      userCreationQueryToUserDbsConverter,
    );
  }
}
