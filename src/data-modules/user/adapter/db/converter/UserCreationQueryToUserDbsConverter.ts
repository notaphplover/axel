import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../common/domain';
import { Model } from 'mongoose';
import { PasswordHasher } from '../../security/PasswordHasher';
import { USER_ADAPTER_TYPES } from '../../config/types';
import { UserCreationQuery } from '../../../domain/query/UserCreationQuery';
import { UserDb } from '../model/UserDb';

@injectable()
export class UserCreationQueryToUserDbsConverter
  implements Converter<UserCreationQuery, Promise<UserDb[]>> {
  constructor(
    @inject(USER_ADAPTER_TYPES.db.model.USER_DB_MODEL)
    private readonly userDbModel: Model<UserDb>,
    @inject(USER_ADAPTER_TYPES.security.PASSWORD_HASHER)
    private readonly passwordHasher: PasswordHasher,
  ) {}

  public async transform(input: UserCreationQuery): Promise<UserDb[]> {
    return [
      new this.userDbModel({
        email: input.email,
        roles: input.roles,
        username: input.username,
        hash: await this.passwordHasher.hashPassword(input.password),
      }),
    ];
  }
}
