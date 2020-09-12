import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { UserApiV1 } from '../../../../../adapter/api/model/UserApiV1';
import { user } from '../../../domain/model/fixtures';

export const userApiV1: UserApiV1 = {
  email: user.email,
  id: user.id,
  roles: [...user.roles],
  username: user.username,
};

export const userApiV1FixtureFactory: FixtureFactory<UserApiV1> = new DeepCloneFixtureFactory(
  userApiV1,
);
