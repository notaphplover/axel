import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { DbDotEnvVariables } from '../../../../adapter/env/DbDotEnvVariables';

const dbDotEnvVariables: DbDotEnvVariables = {
  MONGO_CONNECTION_AUTH_SOURCE: 'source',
  MONGO_CONNECTION_PASSWORD: 'password',
  MONGO_CONNECTION_PROTOCOL: 'protocol',
  MONGO_CONNECTION_URL: 'url',
  MONGO_CONNECTION_USER: 'user',
};

export const dbDotEnvVariablesFixtureFactory: FixtureFactory<DbDotEnvVariables> = new DeepCloneFixtureFactory(
  dbDotEnvVariables,
);
