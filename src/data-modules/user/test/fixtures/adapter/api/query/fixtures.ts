import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../../common/test';
import { AuthCreationQueryApiV1 } from '../../../../../adapter/api/query/AuthCreationQueryApiV1';
import { UserCreationQueryApiV1 } from '../../../../../adapter/api/query/UserCreationQueryApiV1';
import {
  userCreationQuery,
  userFindQuery,
} from '../../../domain/query/fixtures';

export const authCreationQueryApiV1: AuthCreationQueryApiV1 = {
  password: userFindQuery.password as string,
  username: userFindQuery.username as string,
};

export const authCreationQueryApiV1FixtureFactory: FixtureFactory<AuthCreationQueryApiV1> =
  new DeepCloneFixtureFactory(authCreationQueryApiV1);

export const userCreationQueryApiV1: UserCreationQueryApiV1 = {
  email: userCreationQuery.email,
  password: userCreationQuery.password,
  username: userCreationQuery.username,
};

export const userCreationQueryApiV1FixtureFactory: FixtureFactory<UserCreationQueryApiV1> =
  new DeepCloneFixtureFactory(userCreationQueryApiV1);
