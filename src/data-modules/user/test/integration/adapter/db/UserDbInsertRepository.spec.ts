import 'reflect-metadata';
import mongodb from 'mongodb';

import { Capsule, Converter } from '../../../../../../common/domain';
import { MongoDbConnector } from '../../../../../../integration-modules/mongodb/adapter';
import { dbTest } from '../../../../../../layer-modules/db/test';
import { UserDb } from '../../../../adapter/db/model/UserDb';
import { UserDbInsertRepository } from '../../../../adapter/db/repository/UserDbInsertRepository';
import { User } from '../../../../domain/model/User';
import { UserCreationQuery } from '../../../../domain/query/UserCreationQuery';
import { userFixtureFactory } from '../../../fixtures/domain/model/fixtures';
import { userCreationQueryFixtureFactory } from '../../../fixtures/domain/query/fixtures';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  UserDbInsertRepository.name,
  () => {
    let collectionName: string;
    let userDbToUserConverter: Converter<UserDb, User>;
    let mongoDbConnector: MongoDbConnector;
    let userCreationQueryToUserDbsConverter: Converter<
      UserCreationQuery,
      Promise<mongodb.OptionalId<UserDb>[]>
    >;

    let userDbInsertRepository: UserDbInsertRepository;

    beforeAll(() => {
      collectionName = 'UserDbInsertRepositoryIntegrationTest';
      userDbToUserConverter = {
        transform: jest.fn(),
      };
      mongoDbConnector = outputParam.elem as MongoDbConnector;
      userCreationQueryToUserDbsConverter = {
        transform: jest.fn(),
      };

      userDbInsertRepository = new UserDbInsertRepository(
        collectionName,
        userDbToUserConverter,
        mongoDbConnector,
        userCreationQueryToUserDbsConverter,
      );
    });

    describe('.insert()', () => {
      describe('when called', () => {
        let userFixture: User;
        let userDbFixture: mongodb.OptionalId<UserDb>;

        let result: unknown;

        beforeAll(async () => {
          userFixture = userFixtureFactory.get();

          (userDbToUserConverter.transform as jest.Mock).mockReturnValueOnce(
            userFixture,
          );

          userDbFixture = {
            email: userFixture.email,
            hash: 'test-hash',
            roles: [...userFixture.roles],
            username: userFixture.username,
          };

          (userCreationQueryToUserDbsConverter.transform as jest.Mock).mockResolvedValueOnce(
            [userDbFixture],
          );

          result = await userDbInsertRepository.insert(
            userCreationQueryFixtureFactory.get(),
          );
        });

        it('must call userDbToUserConverter.transform with the db entities found', () => {
          const expectedUserDb: UserDb = {
            ...userDbFixture,
            _id: expect.any(mongodb.ObjectID) as mongodb.ObjectID,
          };

          expect(userDbToUserConverter.transform).toHaveBeenCalledTimes(1);
          expect(userDbToUserConverter.transform).toHaveBeenCalledWith(
            expectedUserDb,
          );
        });

        it('must return the user created', () => {
          expect(result).toStrictEqual([userFixture]);
        });
      });
    });
  },
);
