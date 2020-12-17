/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Capsule, Converter, Filter } from '../../../../../../common/domain';
import { MongoDbConnector } from '../../../../../../integration-modules/mongodb/adapter';
import { User } from '../../../../domain/model/User';
import { UserDb } from '../../../../adapter/db/model/UserDb';
import { UserDbSearchRepository } from '../../../../adapter/db/repository/UserDbSearchRepository';
import { UserFindQuery } from '../../../../domain/query/UserFindQuery';
import { dbTest } from '../../../../../../layer-modules/db/test';
import mongodb from 'mongodb';
import { userFixtureFactory } from '../../../fixtures/domain/model/fixtures';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  UserDbSearchRepository.name,
  () => {
    let collectionName: string;
    let userDbToUserConverter: Converter<UserDb, User>;
    let mongoDbConnector: MongoDbConnector;
    let userFindQueryToUserDbFilterQueryConverter: Converter<
      UserFindQuery,
      mongodb.FilterQuery<UserDb>
    >;
    let postUserDbSearchFilter: Filter<UserDb, UserFindQuery>;

    let userDbSearchRepository: UserDbSearchRepository;

    beforeAll(() => {
      collectionName = 'UserDbSearchRepositoryIntegrationTests';
      userDbToUserConverter = {
        transform: jest.fn(),
      };
      mongoDbConnector = outputParam.elem as MongoDbConnector;
      userFindQueryToUserDbFilterQueryConverter = {
        transform: jest.fn(),
      };
      postUserDbSearchFilter = {
        filter: jest.fn(),
        filterOne: jest.fn(),
      };

      userDbSearchRepository = new UserDbSearchRepository(
        collectionName,
        userDbToUserConverter,
        mongoDbConnector,
        userFindQueryToUserDbFilterQueryConverter,
        postUserDbSearchFilter,
      );
    });

    describe('.find()', () => {
      describe('when called and some users satisfies the query', () => {
        let userDbInserted: UserDb;

        let result: unknown;

        beforeAll(async () => {
          const userDbCollection: mongodb.Collection<UserDb> = mongoDbConnector.db.collection(
            collectionName,
          );

          // eslint-disable-next-line @typescript-eslint/typedef
          [userDbInserted] = (
            await userDbCollection.insertMany([
              {
                email: userFixtureFactory.get().email,
                roles: userFixtureFactory.get().roles,
                username: userFixtureFactory.get().username,
                hash: 'test-hash',
              },
            ])
          ).ops;

          const userDbFilterQuery: mongodb.FilterQuery<UserDb> = {
            _id: userDbInserted._id,
          };

          (userDbToUserConverter.transform as jest.Mock).mockReturnValueOnce(
            userFixtureFactory.get(),
          );

          (userFindQueryToUserDbFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            userDbFilterQuery,
          );

          (postUserDbSearchFilter.filter as jest.Mock).mockResolvedValueOnce([
            userDbInserted,
          ]);

          const userFindQuery: UserFindQuery = {
            id: userDbInserted._id.toHexString(),
          };

          result = await userDbSearchRepository.find(userFindQuery);
        });

        afterAll(() => {
          (userDbToUserConverter.transform as jest.Mock).mockClear();
          (userFindQueryToUserDbFilterQueryConverter.transform as jest.Mock).mockClear();
          (postUserDbSearchFilter.filter as jest.Mock).mockClear();
        });

        it('must call userDbToUserConverter.transform with the db entities found', () => {
          expect(userDbToUserConverter.transform).toHaveBeenCalledTimes(1);
          expect(userDbToUserConverter.transform).toHaveBeenCalledWith(
            userDbInserted,
          );
        });

        it('must return users', () => {
          expect(result).toStrictEqual([userFixtureFactory.get()]);
        });
      });

      describe('when called and no user satisfies the query', () => {
        let result: unknown;

        beforeAll(async () => {
          const userDbId: mongodb.ObjectID = new mongodb.ObjectID();

          const userDbFilterQuery: mongodb.FilterQuery<UserDb> = {
            _id: userDbId,
          };

          (userDbToUserConverter.transform as jest.Mock).mockReturnValueOnce(
            userFixtureFactory.get(),
          );

          (userFindQueryToUserDbFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            userDbFilterQuery,
          );

          (postUserDbSearchFilter.filter as jest.Mock).mockResolvedValueOnce(
            [],
          );

          const userFindQuery: UserFindQuery = {
            id: userDbId.toHexString(),
          };

          result = await userDbSearchRepository.find(userFindQuery);
        });

        afterAll(() => {
          (userDbToUserConverter.transform as jest.Mock).mockClear();
          (userFindQueryToUserDbFilterQueryConverter.transform as jest.Mock).mockClear();
          (postUserDbSearchFilter.filter as jest.Mock).mockClear();
        });

        it('must not call userDbToUserConverter.transform', () => {
          expect(userDbToUserConverter.transform).toHaveBeenCalledTimes(0);
        });

        it('must return no user', () => {
          expect(result).toHaveProperty('length');
          expect((result as Array<unknown>).length).toBe(0);
        });
      });
    });
  },
);
