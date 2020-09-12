import { inject, injectable } from 'inversify';
import { Converter } from '../../../../common/domain';
import { Model } from 'mongoose';
import { MongooseInsertRepository } from '../../../../layer-modules/db/adapter';
import { USER_ADAPTER_TYPES } from '../../config/types';
import { User } from '../../../domain/model/User';
import { UserCreationQuery } from '../../../domain/query/UserCreationQuery';
import { UserDb } from '../model/UserDb';

@injectable()
export class UserDbInsertRepository extends MongooseInsertRepository<
  User,
  UserCreationQuery,
  UserDb
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(USER_ADAPTER_TYPES.db.model.USER_DB_MODEL)
    model: Model<UserDb>,
    @inject(USER_ADAPTER_TYPES.db.converter.USER_DB_TO_USER_CONVERTER)
    userDbToUserConverter: Converter<UserDb, User>,
    @inject(
      USER_ADAPTER_TYPES.db.converter.USER_CREATION_QUERY_TO_USER_DBS_CONVERTER,
    )
    userCreationQueryToUserDbsConverter: Converter<
      UserCreationQuery,
      Promise<UserDb[]>
    >,
  ) {
    super(model, userDbToUserConverter, userCreationQueryToUserDbsConverter);
  }
}
