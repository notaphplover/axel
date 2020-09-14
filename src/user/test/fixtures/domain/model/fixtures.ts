import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../common/test';
import { User } from '../../../../domain/model/User';
import { UserRole } from '../../../../domain/model/UserRole';
import { UserToken } from '../../../../domain/model/UserToken';

export const user: User = {
  email: 'mail@sample.com',
  id: 'sample-user-id',
  roles: [UserRole.ADMIN, UserRole.CLIENT],
  username: 'sample-username',
};

export const userFixtureFactory: FixtureFactory<User> = new DeepCloneFixtureFactory(
  user,
);

export const userToken: UserToken = {
  token: 'sample-token',
};

export const userTokenFixtureFactory: FixtureFactory<UserToken> = new DeepCloneFixtureFactory(
  userToken,
);
