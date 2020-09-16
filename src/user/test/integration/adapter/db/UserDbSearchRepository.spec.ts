import 'reflect-metadata';
import { UserDb, userDbSchema } from '../../../../adapter/db/model/UserDb';
import mongoose, { Document, Model } from 'mongoose';
import { Container } from 'inversify';
import { SearchRepository } from '../../../../../layer-modules/db/domain';
import { USER_ADAPTER_TYPES } from '../../../../adapter/config/types';
import { USER_DOMAIN_TYPES } from '../../../../domain/config/types';
import { User } from '../../../../domain/model/User';
import { UserDbSearchReporitory } from '../../../../adapter/db/repository/UserDbSearchRepository';
import { UserFindQuery } from '../../../../domain/query/UserFindQuery';
import { container } from '../../../../../common/adapter/config/container';
import { dbTest } from '../../../../../layer-modules/db/test';
import { userFindQueryFixtureFactory } from '../../../fixtures/domain/query/fixtures';
import { userFixtureFactory } from '../../../fixtures/domain/model/fixtures';

const mongooseIntegrationDescribe: jest.Describe =
  dbTest.integration.utils.mongooseIntegrationDescribe;

async function clearCollection<T extends Document>(
  model: Model<T>,
): Promise<void> {
  await model.deleteMany({});
}

function createUserMongooseModelMock(alias: string): Model<UserDb> {
  return mongoose.model<UserDb>(alias, userDbSchema, alias);
}

function injectUserMongooseModelMock(
  container: Container,
  model: Model<UserDb>,
): void {
  container
    .bind(USER_ADAPTER_TYPES.db.model.USER_DB_MODEL)
    .toConstantValue(model);
}

mongooseIntegrationDescribe(UserDbSearchReporitory.name, () => {
  describe('.find()', () => {
    describe('when called and some users satisfies the query', () => {
      let userModelMock: Model<UserDb>;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string = 'TestUserUsernameSucessFindQuery';

        userModelMock = createUserMongooseModelMock(collectionName);

        await clearCollection(userModelMock);

        const [userDbInserted]: UserDb[] = await userModelMock.insertMany([
          new userModelMock({
            email: userFixtureFactory.get().email,
            roles: userFixtureFactory.get().roles,
            username: userFixtureFactory.get().username,
            hash: 'test-hash',
          }),
        ]);

        const childContainer: Container = container.createChild();
        injectUserMongooseModelMock(childContainer, userModelMock);

        const userDbSearchRepository: SearchRepository<
          User,
          UserFindQuery
        > = childContainer.get(
          USER_DOMAIN_TYPES.repository.USER_SEARCH_REPOSITORY,
        );

        const userFindQueryFixture: UserFindQuery = userFindQueryFixtureFactory.get();
        userFindQueryFixture.id = userDbInserted._id.toHexString();

        result = await userDbSearchRepository.find(userFindQueryFixture);
      });

      afterAll(async () => {
        await clearCollection(userModelMock);
      });

      it('must return the users', () => {
        const expectedUserResult: User = userFixtureFactory.get();

        expect(result).toHaveProperty('length');
        expect((result as Array<unknown>).length).toBe(1);

        const [userResult]: unknown[] = result as unknown[];

        expect((userResult as User).email).toBe(expectedUserResult.email);
        expect((userResult as User).roles).toEqual(expectedUserResult.roles);
        expect((userResult as User).username).toBe(expectedUserResult.username);
      });
    });

    describe('when called and no user satisfies the query', () => {
      let userModelMock: Model<UserDb>;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string = 'TestUserUsernameFailFindQuery';

        userModelMock = createUserMongooseModelMock(collectionName);

        await clearCollection(userModelMock);

        const childContainer: Container = container.createChild();
        injectUserMongooseModelMock(childContainer, userModelMock);

        const userDbSearchRepository: SearchRepository<
          User,
          UserFindQuery
        > = childContainer.get(
          USER_DOMAIN_TYPES.repository.USER_SEARCH_REPOSITORY,
        );

        result = await userDbSearchRepository.find(
          userFindQueryFixtureFactory.get(),
        );
      });

      afterAll(async () => {
        await clearCollection(userModelMock);
      });

      it('must return no user', () => {
        expect(result).toHaveProperty('length');
        expect((result as Array<unknown>).length).toBe(0);
      });
    });
  });
});
