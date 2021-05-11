import { injectable } from 'inversify';

import { Converter } from '../../../../../common/domain';
import { UserRole } from '../../../domain/model/UserRole';
import { UserRoleApiV1 } from '../model/UserRoleApiV1';

const userRoleToUserRoleApiV1Map: { [TKey in UserRole]: UserRoleApiV1 } = {
  [UserRole.ADMIN]: UserRoleApiV1.ADMIN,
  [UserRole.CLIENT]: UserRoleApiV1.CLIENT,
};

@injectable()
export class UserRoleToUserRoleApiV1Converter
  implements Converter<UserRole, UserRoleApiV1>
{
  public transform(input: UserRole): UserRoleApiV1 {
    if (input in userRoleToUserRoleApiV1Map) {
      return userRoleToUserRoleApiV1Map[input];
    } else {
      throw new Error(`Unecpected user role "${input}"`);
    }
  }
}
