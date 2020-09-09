import { DbDotEnvVariables } from '../../../../adapter/env/DbDotEnvVariables';
import { DbDotEnvVariablesFixtureFactory } from './DbDotEnvVariablesFixtureFactory';
import { FixtureFactory } from '../../../../../../common/test/fixtures/domain/fixture/FixtureFactory';

const commonDotEnvVariables: DbDotEnvVariables = {
  MONGO_CONNECTION_AUTH_SOURCE: 'source',
  MONGO_CONNECTION_PASSWORD: 'password',
  MONGO_CONNECTION_URL: 'url',
  MONGO_CONNECTION_USER: 'user',
};

export const commonDotEnvVariablesFixtureFactory: FixtureFactory<DbDotEnvVariables> = new DbDotEnvVariablesFixtureFactory(
  commonDotEnvVariables,
);
