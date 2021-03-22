import { injectable } from 'inversify';

import { Converter } from '../../../../../common/domain';
import { UserRole } from '../../../domain/model/UserRole';
import { UserCreationQuery } from '../../../domain/query/UserCreationQuery';
import { UserCreationQueryApiV1 } from '../query/UserCreationQueryApiV1';

@injectable()
export class UserCreationQueryApiV1ToUserCreationQueryConverter
  implements Converter<UserCreationQueryApiV1, UserCreationQuery> {
  public transform(
    userCreationQueryApiV1: UserCreationQueryApiV1,
  ): UserCreationQuery {
    const userCreationQuery: UserCreationQuery = {
      email: userCreationQueryApiV1.email,
      roles: [UserRole.CLIENT],
      password: userCreationQueryApiV1.password,
      username: userCreationQueryApiV1.username,
    };

    return userCreationQuery;
  }
}
