/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Capsule, Converter } from '../../../../../../../common/domain';
import { ExtendedGameSetup } from '../../../../../domain/model/setup/ExtendedGameSetup';
import { ExtendedGameSetupDb } from '../../../../../adapter/db/model/setup/ExtendedGameSetupDb';
import { ExtendedGameSetupDbSearchRepository } from '../../../../../adapter/db/repository/setup/ExtendedGameSetupDbSearchRepository';
import { ExtendedGameSetupFindQuery } from '../../../../../domain/query/setup/ExtendedGameSetupFindQuery';
import { MongoDbConnector } from '../../../../../../../integration-modules/mongodb/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { extendedGameSetupFindQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';
import { extendedGameSetupFixtureFactory } from '../../../../fixtures/domain/model/setup';
import mongodb from 'mongodb';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  ExtendedGameSetupDbSearchRepository.name,
  () => {
    let collectionName: string;
    let extendedGameSetupDbToExtendedGameSetupConverter: Converter<
      ExtendedGameSetupDb,
      ExtendedGameSetup
    >;
    let mongoDbConnector: MongoDbConnector;
    let gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter: Converter<
      ExtendedGameSetupFindQuery,
      mongodb.FilterQuery<ExtendedGameSetupDb>
    >;

    let extendedGameSetupDbSearchRepository: ExtendedGameSetupDbSearchRepository;

    beforeAll(() => {
      collectionName = 'ExtendedGameSetupDbSearchRepository';
      extendedGameSetupDbToExtendedGameSetupConverter = {
        transform: jest.fn(),
      };
      mongoDbConnector = outputParam.elem as MongoDbConnector;
      gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter = {
        transform: jest.fn(),
      };

      extendedGameSetupDbSearchRepository = new ExtendedGameSetupDbSearchRepository(
        collectionName,
        extendedGameSetupDbToExtendedGameSetupConverter,
        mongoDbConnector,
        gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter,
      );
    });

    describe('.find()', () => {
      describe('when called and some game setups satisfies the query', () => {
        let extendedGameSetupDbInserted: ExtendedGameSetupDb;

        let result: unknown;

        beforeAll(async () => {
          const extendedGameSetupFixture: ExtendedGameSetup = extendedGameSetupFixtureFactory.get();

          const extendedGameDbCollection: mongodb.Collection<ExtendedGameSetupDb> = mongoDbConnector.db.collection(
            collectionName,
          );

          // eslint-disable-next-line @typescript-eslint/typedef
          [extendedGameSetupDbInserted] = (
            await extendedGameDbCollection.insertMany([
              {
                format: extendedGameSetupFixture.format,
                ownerUserId: extendedGameSetupFixture.ownerUserId,
                playerSetups: extendedGameSetupFixture.playerSetups,
                playerSlots: extendedGameSetupFixture.playerSlots,
              },
            ])
          ).ops;

          (extendedGameSetupDbToExtendedGameSetupConverter.transform as jest.Mock).mockReturnValueOnce(
            extendedGameSetupFixture,
          );

          const extendedGameSetupDbFilterQuery: mongodb.FilterQuery<ExtendedGameSetupDb> = {
            _id: extendedGameSetupDbInserted._id,
          };

          (gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            extendedGameSetupDbFilterQuery,
          );

          const extendedGameSetupFindQueryFixture: ExtendedGameSetupFindQuery = extendedGameSetupFindQueryFixtureFactory.get();
          extendedGameSetupFindQueryFixture.id = extendedGameSetupDbInserted._id.toHexString();

          result = await extendedGameSetupDbSearchRepository.find(
            extendedGameSetupFindQueryFixture,
          );
        });

        afterAll(() => {
          (extendedGameSetupDbToExtendedGameSetupConverter.transform as jest.Mock).mockClear();
          (gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter.transform as jest.Mock).mockClear();
        });

        it('must call extendedGameSetupDbToExtendedGameSetupConverter.transform with the db entities found', () => {
          expect(
            extendedGameSetupDbToExtendedGameSetupConverter.transform,
          ).toHaveBeenCalledTimes(1);
          expect(
            extendedGameSetupDbToExtendedGameSetupConverter.transform,
          ).toHaveBeenCalledWith(extendedGameSetupDbInserted);
        });

        it('must return the game setups', () => {
          expect(result).toStrictEqual([extendedGameSetupFixtureFactory.get()]);
        });
      });

      describe('when called and no game setup satisfies the query', () => {
        let result: unknown;

        beforeAll(async () => {
          const extendedGameSetupDbFilterQuery: mongodb.FilterQuery<ExtendedGameSetupDb> = {
            _id: new mongodb.ObjectID(),
          };

          (gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            extendedGameSetupDbFilterQuery,
          );

          result = await extendedGameSetupDbSearchRepository.find(
            extendedGameSetupFindQueryFixtureFactory.get(),
          );
        });

        afterAll(() => {
          (gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter.transform as jest.Mock).mockClear();
        });

        it('must return no game', () => {
          expect(result).toStrictEqual([]);
        });
      });
    });
  },
);
