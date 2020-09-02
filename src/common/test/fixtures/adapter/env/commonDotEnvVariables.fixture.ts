import { CommonDotEnvVariables } from '../../../../adapter/env/CommonDotEnvVariables';
import { CommonDotEnvVariablesFixtureFactory } from './CommonDotEnvVariablesFixtureFactory';
import { FixtureFactory } from '../../domain/fixture/FixtureFactory';

const commonDotEnvVariables: CommonDotEnvVariables = {
  MONGO_CONNECTION_AUTH_SOURCE: 'source',
  MONGO_CONNECTION_PASSWORD: 'password',
  MONGO_CONNECTION_URL: 'url',
  MONGO_CONNECTION_USER: 'user',
};

export const commonDotEnvVariablesFixtureFactory: FixtureFactory<CommonDotEnvVariables> = new CommonDotEnvVariablesFixtureFactory(
  commonDotEnvVariables,
);
