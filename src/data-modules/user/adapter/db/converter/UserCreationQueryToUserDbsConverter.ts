import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../common/domain';
import { PasswordHasher } from '../../security/PasswordHasher';
import { USER_ADAPTER_TYPES } from '../../config/types';
import { UserCreationQuery } from '../../../domain/query/UserCreationQuery';
import { UserDb } from '../model/UserDb';
import mongodb from 'mongodb';

@injectable()
export class UserCreationQueryToUserDbsConverter
  implements
    Converter<UserCreationQuery, Promise<mongodb.OptionalId<UserDb>[]>> {
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
    } as mongodb.OptionalId<UserDb>;

    return [userDb];
  }
}
