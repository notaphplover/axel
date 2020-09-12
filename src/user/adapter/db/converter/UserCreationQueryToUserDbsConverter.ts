import * as argon2 from 'argon2';
import { inject, injectable } from 'inversify';
import { Converter } from '../../../../common/domain';
import { Model } from 'mongoose';
import { USER_ADAPTER_TYPES } from '../../config/types';
import { UserCreationQuery } from '../../../domain/query/UserCreationQuery';
import { UserDb } from '../model/UserDb';

@injectable()
export class UserCreationQueryToUserDbsConverter
  implements Converter<UserCreationQuery, UserDb[]> {
  constructor(
    @inject(USER_ADAPTER_TYPES.db.model.USER_DB_MODEL)
    private readonly userDbModel: Model<UserDb>,
  ) {}

  public transform(input: UserCreationQuery): UserDb[] {
    return [
      new this.userDbModel({
        email: input.email,
        roles: input.roles,
        username: input.username,
        hash: argon2.hash(input.password),
      }),
    ];
  }
}
