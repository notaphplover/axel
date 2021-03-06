import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { UserCreationQuery } from '../../../../domain/query/UserCreationQuery';
import { UserFindQuery } from '../../../../domain/query/UserFindQuery';
import { user } from '../model/fixtures';

export const userCreationQuery: UserCreationQuery = {
  email: user.email,
  roles: user.roles,
  username: user.username,
  password: 'sample-password',
};

export const userCreationQueryFixtureFactory: FixtureFactory<UserCreationQuery> =
  new DeepCloneFixtureFactory(userCreationQuery);

export const userFindQuery: UserFindQuery = {
  email: user.email,
  id: user.id,
  username: user.username,
  password: 'sample-password',
};

export const userFindQueryFixtureFactory: FixtureFactory<UserFindQuery> =
  new DeepCloneFixtureFactory(userFindQuery);
