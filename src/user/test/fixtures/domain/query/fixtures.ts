import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../common/test';
import { UserFindQuery } from '../../../../domain/query/UserFindQuery';
import { user } from '../model/fixtures';

export const userFindQuery: UserFindQuery = {
  email: user.email,
  id: user.id,
  username: user.username,
};

export const userFindQueryFixtureFactory: FixtureFactory<UserFindQuery> = new DeepCloneFixtureFactory(
  userFindQuery,
);
