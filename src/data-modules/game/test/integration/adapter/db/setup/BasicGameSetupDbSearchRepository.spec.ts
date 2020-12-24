/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Capsule, Converter } from '../../../../../../../common/domain';
import {
  basicGameSetupFixtureFactory,
  extendedGameSetupFixtureFactory,
} from '../../../../fixtures/domain/model/setup';
import { BasicGameSetup } from '../../../../../domain/model/setup/BasicGameSetup';
import { BasicGameSetupDb } from '../../../../../adapter/db/model/setup/BasicGameSetupDb';
import { BasicGameSetupDbSearchRepository } from '../../../../../adapter/db/repository/setup/BasicGameSetupDbSearchRepository';
import { BasicGameSetupFindQuery } from '../../../../../domain/query/setup/BasicGameSetupFindQuery';
import { ExtendedGameSetup } from '../../../../../domain/model/setup/ExtendedGameSetup';
import { ExtendedGameSetupDb } from '../../../../../adapter/db/model/setup/ExtendedGameSetupDb';
import { MongoDbConnector } from '../../../../../../../integration-modules/mongodb/adapter';
import { PlayerSetup } from '../../../../../domain/model/setup/PlayerSetup';
import { basicGameSetupFindQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import mongodb from 'mongodb';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  BasicGameSetupDbSearchRepository.name,
  () => {
    let collectionName: string;
    let basicGameSetupDbToBasicGameSetupConverter: Converter<
      BasicGameSetupDb,
      BasicGameSetup
    >;
    let mongoDbConnector: MongoDbConnector;
    let gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter: Converter<
      BasicGameSetupFindQuery,
      mongodb.FilterQuery<ExtendedGameSetupDb>
    >;

    let basicGameSetupDbSearchRepository: BasicGameSetupDbSearchRepository;

    beforeAll(() => {
      collectionName = 'BasicGameSetupDbSearchRepositoryIntegrationTest';
      basicGameSetupDbToBasicGameSetupConverter = {
        transform: jest.fn(),
      };
      mongoDbConnector = outputParam.elem as MongoDbConnector;
      gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter = {
        transform: jest.fn(),
      };

      basicGameSetupDbSearchRepository = new BasicGameSetupDbSearchRepository(
        collectionName,
        basicGameSetupDbToBasicGameSetupConverter,
        mongoDbConnector,
        gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter,
      );
    });

    describe('.find()', () => {
      describe('when called and some game setups satisfies the query', () => {
        let basicGameSetupFindQueryFixture: BasicGameSetupFindQuery;
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
              } as mongodb.OptionalId<ExtendedGameSetupDb>,
            ])
          ).ops;

          (basicGameSetupDbToBasicGameSetupConverter.transform as jest.Mock).mockReturnValueOnce(
            basicGameSetupFixtureFactory.get(),
          );

          const extendedGameSetupDbFilterQuery: mongodb.FilterQuery<ExtendedGameSetupDb> = {
            _id: extendedGameSetupDbInserted._id,
          };

          (gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            extendedGameSetupDbFilterQuery,
          );

          basicGameSetupFindQueryFixture = basicGameSetupFindQueryFixtureFactory.get();
          basicGameSetupFindQueryFixture.id = extendedGameSetupDbInserted._id.toHexString();

          result = await basicGameSetupDbSearchRepository.find(
            basicGameSetupFindQueryFixture,
          );
        });

        afterAll(() => {
          (basicGameSetupDbToBasicGameSetupConverter.transform as jest.Mock).mockClear();
          (gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter.transform as jest.Mock).mockClear();
        });

        it('must call basicGameSetupDbToBasicGameSetupConverter.transform with the db entity found', () => {
          const expectedGameSetupDb: BasicGameSetupDb = {
            _id: extendedGameSetupDbInserted._id,
            format: extendedGameSetupDbInserted.format,
            ownerUserId: extendedGameSetupDbInserted.ownerUserId,
            playerSetups: extendedGameSetupDbInserted.playerSetups.map(
              (playerSetup: PlayerSetup) => ({ userId: playerSetup.userId }),
            ),
            playerSlots: extendedGameSetupDbInserted.playerSlots,
          } as BasicGameSetupDb;

          expect(
            basicGameSetupDbToBasicGameSetupConverter.transform,
          ).toHaveBeenCalledTimes(1);
          expect(
            basicGameSetupDbToBasicGameSetupConverter.transform,
          ).toHaveBeenCalledWith(expectedGameSetupDb);
        });

        it('must return the game setups', () => {
          expect(result as BasicGameSetup).toStrictEqual([
            basicGameSetupFixtureFactory.get(),
          ]);
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

          result = await basicGameSetupDbSearchRepository.find(
            basicGameSetupFindQueryFixtureFactory.get(),
          );
        });

        afterAll(() => {
          (gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter.transform as jest.Mock).mockClear();
        });

        it('must return no game', () => {
          expect(result).toHaveProperty('length');
          expect((result as Array<unknown>).length).toBe(0);
        });
      });
    });
  },
);
