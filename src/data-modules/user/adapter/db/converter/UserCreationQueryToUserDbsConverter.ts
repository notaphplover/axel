import { inject, injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../common/domain';
import { UserCreationQuery } from '../../../domain/query/UserCreationQuery';
import { USER_ADAPTER_TYPES } from '../../config/types';
import { PasswordHasher } from '../../security/PasswordHasher';
import { UserDb } from '../model/UserDb';

@injectable()
export class UserCreationQueryToUserDbsConverter
  implements
    Converter<UserCreationQuery, Promise<mongodb.OptionalId<UserDb>[]>>
{
  constructor(
    @inject(USER_ADAPTER_TYPES.security.PASSWORD_HASHER)
    private readonly passwordHasher: PasswordHasher,
  ) {}

  public async transform(
    input: UserCreationQuery,
  ): Promise<mongodb.OptionalId<UserDb>[]> {
    const userDb: mongodb.OptionalId<UserDb> = {
      email: input.email,
      hash: await this.passwordHasher.hashPassword(input.password),
      roles: input.roles,
      username: input.username,
    };

    return [userDb];
  }
}
