import 'reflect-metadata';
import { UserDb, userDbSchema } from '../../../../adapter/db/model/UserDb';
import mongoose, { Document, Model } from 'mongoose';
import { Container } from 'inversify';
import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { USER_ADAPTER_TYPES } from '../../../../adapter/config/types';
import { USER_DOMAIN_TYPES } from '../../../../domain/config/types';
import { User } from '../../../../domain/model/User';
import { UserCreationQuery } from '../../../../domain/query/UserCreationQuery';
import { UserDbInsertRepository } from '../../../../adapter/db/repository/UserDbInsertRepository';
import { configAdapter } from '../../../../../layer-modules/config';
import { dbTest } from '../../../../../layer-modules/db/test';
import { userCreationQueryFixtureFactory } from '../../../fixtures/domain/query/fixtures';
import { userFixtureFactory } from '../../../fixtures/domain/model/fixtures';

const container: Container = configAdapter.container;

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

mongooseIntegrationDescribe(UserDbInsertRepository.name, () => {
  describe('.insert()', () => {
    describe('when called', () => {
      let userModelMock: Model<UserDb>;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string = 'UserDbInsertRepositoryModel';

        userModelMock = createUserMongooseModelMock(collectionName);

        await clearCollection(userModelMock);

        const childContainer: Container = container.createChild();
        injectUserMongooseModelMock(childContainer, userModelMock);

        const userDbInsertRepository: InsertRepository<
          User,
          UserCreationQuery
        > = childContainer.get(
          USER_DOMAIN_TYPES.repository.USER_INSERT_REPOSITORY,
        );

        result = await userDbInsertRepository.insert(
          userCreationQueryFixtureFactory.get(),
        );
      });

      afterAll(async () => {
        await clearCollection(userModelMock);
      });

      it('must return the user created', () => {
        expect(result).toHaveProperty('length');
        expect((result as unknown[]).length).toBe(1);

        const [innerResult]: unknown[] = result as unknown[];

        expect((innerResult as User).email).toStrictEqual(
          userFixtureFactory.get().email,
        );
        expect((innerResult as User).roles).toStrictEqual(
          userFixtureFactory.get().roles,
        );
        expect((innerResult as User).username).toStrictEqual(
          userFixtureFactory.get().username,
        );
      });
    });
  });
});
