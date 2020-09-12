import { Converter } from '../../../common/domain';
import { NoIdUser } from '../model/NoIdUser';
import { UserCreationQuery } from '../query/UserCreationQuery';
import { injectable } from 'inversify';

@injectable()
export class UserCreationQueryToNoIdUsersConverter
  implements Converter<UserCreationQuery, NoIdUser[]> {
  public transform(input: UserCreationQuery): NoIdUser[] {
    return [
      { email: input.email, roles: [...input.roles], username: input.username },
    ];
  }
}
