import 'reflect-metadata';
import * as axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

import { EnvLoader } from '../../../../layer-modules/env/domain';
import { AppEnvVariables } from '../../../app/adapter';
import { AppEnvLoader } from '../../../app/adapter/env/AppEnvLoader';
import { UserApiV1 } from '../../adapter/api/model/UserApiV1';
import { AuthCreationQueryApiV1 } from '../../adapter/api/query/AuthCreationQueryApiV1';
import { UserCreationQueryApiV1 } from '../../adapter/api/query/UserCreationQueryApiV1';
import {
  authCreationQueryApiV1FixtureFactory,
  userCreationQueryApiV1FixtureFactory,
} from '../fixtures/adapter/api/query/fixtures';

const dockerAppEnvLoader: EnvLoader<AppEnvVariables> = new AppEnvLoader(
  'docker',
);

const APP_URL_PROTOCOL: string = 'http://';
const APP_URL_HOST: string = '127.0.0.1';
const APP_URL_PORT: number = dockerAppEnvLoader.index.APP_SERVER_PORT;

const TEST_FIXTURES_DISCRIMINATOR: string = uuidv4();

function getAuthCreationQueryApiV1(): AuthCreationQueryApiV1 {
  const authCreationQueryApiV1: AuthCreationQueryApiV1 =
    authCreationQueryApiV1FixtureFactory.get();

  authCreationQueryApiV1.username += TEST_FIXTURES_DISCRIMINATOR;

  return authCreationQueryApiV1;
}

function getUserCreationQueryApiV1(): UserCreationQueryApiV1 {
  const userCreationQueryApiV1Fixture: UserCreationQueryApiV1 =
    userCreationQueryApiV1FixtureFactory.get();

  userCreationQueryApiV1Fixture.email =
    TEST_FIXTURES_DISCRIMINATOR + userCreationQueryApiV1Fixture.email;
  userCreationQueryApiV1Fixture.username += TEST_FIXTURES_DISCRIMINATOR;

  return userCreationQueryApiV1Fixture;
}

describe('User V1', () => {
  let userIdsCreated: string[];

  const client: axios.AxiosStatic = axios.default;

  beforeAll(async () => {
    userIdsCreated = [];
  });

  describe('when called POST, with a request with a valid UserCreationQueryApiV1', () => {
    let postUsersV1Response: axios.AxiosResponse;

    beforeAll(async () => {
      postUsersV1Response = await client.post(
        `${APP_URL_PROTOCOL}${APP_URL_HOST}:${APP_URL_PORT}/v1/users`,
        getUserCreationQueryApiV1(),
      );

      userIdsCreated.push((postUsersV1Response.data as UserApiV1).id);
    });

    it('must return a response with the user created', () => {
      expect(postUsersV1Response.data).toHaveProperty('id');
      expect((postUsersV1Response.data as UserApiV1).email).toBe(
        getUserCreationQueryApiV1().email,
      );
      expect((postUsersV1Response.data as UserApiV1).username).toBe(
        getUserCreationQueryApiV1().username,
      );
    });

    describe('when called POST auth with a request with the user credentials', () => {
      let postAuthV1Response: axios.AxiosResponse;

      beforeAll(async () => {
        postAuthV1Response = await client.post(
          `${APP_URL_PROTOCOL}${APP_URL_HOST}:${APP_URL_PORT}/v1/auth/tokens`,
          getAuthCreationQueryApiV1(),
        );
      });

      it('must return an HTTP OK response', () => {
        expect(postAuthV1Response.status).toBe(StatusCodes.OK);
        expect(postAuthV1Response.data).toHaveProperty('token');
      });
    });

    describe('when called POST auth with a request with the user credentials without password', () => {
      let postAuthV1Response: axios.AxiosResponse | undefined;
      let error: unknown;

      beforeAll(async () => {
        try {
          const authCreationQueryApiV1: AuthCreationQueryApiV1 =
            getAuthCreationQueryApiV1();

          authCreationQueryApiV1.password = undefined as unknown as string;

          postAuthV1Response = await client.post(
            `${APP_URL_PROTOCOL}${APP_URL_HOST}:${APP_URL_PORT}/v1/auth/tokens`,
            authCreationQueryApiV1,
          );
        } catch (err) {
          error = err;
        }
      });

      it('must return an HTTP BAD_REQUEST STATUS', () => {
        expect(postAuthV1Response).toBeUndefined();
        expect((error as axios.AxiosError).response?.status).toBe(
          StatusCodes.BAD_REQUEST,
        );
      });
    });
  });
});
