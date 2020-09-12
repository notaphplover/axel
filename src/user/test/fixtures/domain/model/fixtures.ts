import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../common/test';
import { User } from '../../../../domain/model/User';
import { UserRole } from '../../../../domain/model/UserRole';

export const user: User = {
  email: 'mail@sample.com',
  id: 'sample-user-id',
  roles: [UserRole.ADMIN, UserRole.CLIENT],
  username: 'sample-username',
};

export const userFixtureFactory: FixtureFactory<User> = new DeepCloneFixtureFactory(
  user,
);
