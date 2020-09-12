import { Converter } from '../../../../common/domain';
import { User } from '../../../domain/model/User';
import { UserApiV1 } from '../model/UserApiV1';
import { injectable } from 'inversify';

@injectable()
export class UserToUserApiV1Converter implements Converter<User, UserApiV1> {
  public transform(input: User): UserApiV1 {
    return {
      email: input.email,
      id: input.id,
      roles: input.roles,
      username: input.username,
    };
  }
}
