import { inject, injectable } from 'inversify';

import { Converter } from '../../../../../common/domain';
import { User } from '../../../domain/model/User';
import { UserRole } from '../../../domain/model/UserRole';
import { USER_ADAPTER_TYPES } from '../../config/types';
import { UserApiV1 } from '../model/UserApiV1';
import { UserRoleApiV1 } from '../model/UserRoleApiV1';

@injectable()
export class UserToUserApiV1Converter implements Converter<User, UserApiV1> {
  constructor(
    @inject(
      USER_ADAPTER_TYPES.api.converter.USER_ROLE_TO_USER_ROLE_API_V1_CONVERTER,
    )
    private readonly userRoleToUserRoleApiV1Converter: Converter<
      UserRole,
      UserRoleApiV1
    >,
  ) {}

  public transform(input: User): UserApiV1 {
    return {
      email: input.email,
      id: input.id,
      roles: input.roles.map((role: UserRole) =>
        this.userRoleToUserRoleApiV1Converter.transform(role),
      ),
      username: input.username,
    };
  }
}
