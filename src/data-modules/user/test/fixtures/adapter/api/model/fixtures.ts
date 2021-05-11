import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../../common/test';
import { UserApiV1 } from '../../../../../adapter/api/model/UserApiV1';
import { UserRoleApiV1 } from '../../../../../adapter/api/model/UserRoleApiV1';
import { UserTokenApiV1 } from '../../../../../adapter/api/model/UserTokenApiV1';
import { user, userToken } from '../../../domain/model/fixtures';

export const userApiV1: UserApiV1 = {
  email: user.email,
  id: user.id,
  roles: [UserRoleApiV1.ADMIN, UserRoleApiV1.CLIENT],
  username: user.username,
};

export const userApiV1FixtureFactory: FixtureFactory<UserApiV1> =
  new DeepCloneFixtureFactory(userApiV1);

export const userTokenApiV1: UserTokenApiV1 = {
  token: userToken.token,
};

export const userTokenApiV1FixtureFactory: FixtureFactory<UserTokenApiV1> =
  new DeepCloneFixtureFactory(userTokenApiV1);
