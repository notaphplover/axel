import { Converter } from '../../../../common/domain';
import { User } from '../../../domain/model/User';
import { UserDb } from '../model/UserDb';
import { injectable } from 'inversify';

@injectable()
export class UserDbToUserConverter implements Converter<UserDb, User> {
  public transform(input: UserDb): User {
    return {
      email: input.email,
      id: input._id.toHexString(),
      roles: [...input.roles],
      username: input.username,
    };
  }
}
