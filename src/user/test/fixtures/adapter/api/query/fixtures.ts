import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { UserCreationQueryApiV1 } from '../../../../../adapter/api/query/UserCreationQueryApiV1';
import { userCreationQuery } from '../../../domain/query/fixtures';

export const userCreationQueryApiV1: UserCreationQueryApiV1 = {
  email: userCreationQuery.email,
  password: userCreationQuery.password,
  username: userCreationQuery.username,
};

export const userCreationQueryApiV1FixtureFactory: FixtureFactory<UserCreationQueryApiV1> = new DeepCloneFixtureFactory(
  userCreationQueryApiV1,
);
