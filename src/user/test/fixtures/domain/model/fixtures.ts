import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../common/test';
import { NoIdUser } from '../../../../domain/model/NoIdUser';
import { User } from '../../../../domain/model/User';
import { UserRole } from '../../../../domain/model/UserRole';

export const noIdUser: NoIdUser = {
  email: 'mail@sample.com',
  roles: [UserRole.ADMIN, UserRole.CLIENT],
  username: 'sample-username',
};

export const noIdUserFixtureFactory: FixtureFactory<NoIdUser> = new DeepCloneFixtureFactory(
  noIdUser,
);

export const user: User = {
  email: noIdUser.email,
  id: 'sample-user-id',
  roles: [...noIdUser.roles],
  username: noIdUser.username,
};

export const userFixtureFactory: FixtureFactory<User> = new DeepCloneFixtureFactory(
  user,
);
