import 'reflect-metadata';
import * as axios from 'axios';
import {
  MongooseConector,
  dbAdapter,
} from '../../../../layer-modules/db/adapter';
import {
  QueueBasedTaskGraph,
  TaskGraph,
  TaskGraphNode,
} from '../../../task-graph/domain';
import {
  authCreationQueryApiV1FixtureFactory,
  userCreationQueryApiV1FixtureFactory,
} from '../fixtures/adapter/api/query/fixtures';
import { AppEnvLoader } from '../../../../app/adapter/env/AppEnvLoader';
import { AppEnvVariables } from '../../../../app/adapter';
import { AuthCreationQueryApiV1 } from '../../adapter/api/query/AuthCreationQueryApiV1';
import { Container } from 'inversify';
import { DeleteEntityByIdsTaskGraphNode } from '../../../task-graph/adapter';
import { EnvLoader } from '../../../../layer-modules/env/domain';
import { Model } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { USER_ADAPTER_TYPES } from '../../adapter/config/types';
import { UserApiV1 } from '../../adapter/api/model/UserApiV1';
import { UserCreationQueryApiV1 } from '../../adapter/api/query/UserCreationQueryApiV1';
import { UserDb } from '../../adapter/db/model/UserDb';
import { configAdapter } from '../../../../layer-modules/config/adapter';

const container: Container = configAdapter.container;

const dockerAppEnvLoader: EnvLoader<AppEnvVariables> = new AppEnvLoader(
  'docker',
);

const APP_URL_PROTOCOL: string = 'http://';
const APP_URL_HOST: string = '127.0.0.1';
const APP_URL_PORT: number = dockerAppEnvLoader.index.APP_SERVER_PORT;

const TEST_FIXTURES_DISCRIMINATOR: string = 'End2EndUserV1';

function getAuthCreationQueryApiV1(): AuthCreationQueryApiV1 {
  const authCreationQueryApiV1: AuthCreationQueryApiV1 = authCreationQueryApiV1FixtureFactory.get();

  authCreationQueryApiV1.username += TEST_FIXTURES_DISCRIMINATOR;

  return authCreationQueryApiV1;
}

function getUserCreationQueryApiV1(): UserCreationQueryApiV1 {
  const userCreationQueryApiV1Fixture: UserCreationQueryApiV1 = userCreationQueryApiV1FixtureFactory.get();

  userCreationQueryApiV1Fixture.email += TEST_FIXTURES_DISCRIMINATOR;
  userCreationQueryApiV1Fixture.username += TEST_FIXTURES_DISCRIMINATOR;

  return userCreationQueryApiV1Fixture;
}

async function resetData(userDbModel: Model<UserDb>, userIdsCreated: string[]) {
  const deleteUsersGraphNode: TaskGraphNode<
    string,
    void
  > = new DeleteEntityByIdsTaskGraphNode(
    'delete-users-node',
    userDbModel,
    userIdsCreated,
  );

  const deleteUsersGraph: TaskGraph<string> = new QueueBasedTaskGraph([
    deleteUsersGraphNode,
  ]);

  await deleteUsersGraph.performTasks();
}

describe('User V1', () => {
  let mongooseConnector: MongooseConector;
  let userDbModel: Model<UserDb>;

  let userIdsCreated: string[];

  const client: axios.AxiosStatic = axios.default;

  beforeAll(async () => {
    mongooseConnector = container.get(
      dbAdapter.config.types.db.MONGOOSE_CONNECTOR,
    );
    userDbModel = container.get(USER_ADAPTER_TYPES.db.model.USER_DB_MODEL);

    userIdsCreated = [];

    await mongooseConnector.connect();
  });

  afterAll(async () => {
    await resetData(userDbModel, userIdsCreated);

    await mongooseConnector.close();
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
  });
});
