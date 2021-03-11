import 'reflect-metadata';

import mongodb from 'mongodb';

import { Capsule, Converter } from '../../../../../../../common/domain';
import { MongoDbConnector } from '../../../../../../../integration-modules/mongodb/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { LiveGameDb } from '../../../../../adapter/db/model/live/LiveGameDb';
import { LiveGameDbSearchRepository } from '../../../../../adapter/db/repository/live/LiveGameDbSearchRepository';
import { LiveGame } from '../../../../../domain/model/live/LiveGame';
import { LiveGameFindQuery } from '../../../../../domain/query/live/LiveGameFindQuery';
import { liveGameFixtureFactory } from '../../../../fixtures/domain/model/live';
import { gameFindQueryFixtureFactory } from '../../../../fixtures/domain/query/card';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  LiveGameDbSearchRepository.name,
  () => {
    let collectionName: string;
    let gameDbToGameConverter: Converter<LiveGameDb, LiveGame>;
    let mongoDbConnector: MongoDbConnector;
    let gameFindQueryToGameDbFilterQueryConverter: Converter<
      LiveGameFindQuery,
      mongodb.FilterQuery<LiveGameDb>
    >;

    let gameDbSearchRepository: LiveGameDbSearchRepository;

    beforeAll(() => {
      collectionName = 'GameDbSearchRepositoryIntegrationTest';
      gameDbToGameConverter = {
        transform: jest.fn(),
      };
      mongoDbConnector = outputParam.elem as MongoDbConnector;
      gameFindQueryToGameDbFilterQueryConverter = {
        transform: jest.fn(),
      };

      gameDbSearchRepository = new LiveGameDbSearchRepository(
        collectionName,
        gameDbToGameConverter,
        mongoDbConnector,
        gameFindQueryToGameDbFilterQueryConverter,
      );
    });

    describe('.find()', () => {
      describe('when called and some games satisfies the query', () => {
        let gameDbInserted: LiveGameDb;

        let result: unknown;

        beforeAll(async () => {
          const gameFixture: LiveGame = liveGameFixtureFactory.get();

          const gameDbCollection: mongodb.Collection<LiveGameDb> = mongoDbConnector.db.collection(
            collectionName,
          );

          // eslint-disable-next-line @typescript-eslint/typedef
          [gameDbInserted] = (
            await gameDbCollection.insertMany([
              {
                format: gameFixture.format,
                round: gameFixture.round,
                playerAreas: gameFixture.playerAreas,
                state: gameFixture.state,
              },
            ])
          ).ops;

          const gameFindQueryFixture: LiveGameFindQuery = {
            ...gameFindQueryFixtureFactory.get(),
            id: gameDbInserted._id.toHexString(),
          };

          (gameDbToGameConverter.transform as jest.Mock).mockReturnValueOnce(
            gameFixture,
          );

          const gameDbFilterQuery: mongodb.FilterQuery<LiveGameDb> = {
            _id: gameDbInserted._id,
          };

          (gameFindQueryToGameDbFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            gameDbFilterQuery,
          );

          result = await gameDbSearchRepository.find(gameFindQueryFixture);
        });

        afterAll(async () => {
          (gameDbToGameConverter.transform as jest.Mock).mockClear();
          (gameFindQueryToGameDbFilterQueryConverter.transform as jest.Mock).mockClear();
        });

        it('must call gameDbToGameConverter.transform with the db entities found', () => {
          expect(gameDbToGameConverter.transform).toHaveBeenCalledTimes(1);
          expect(gameDbToGameConverter.transform).toHaveBeenCalledWith(
            gameDbInserted,
          );
        });

        it('must return the games', () => {
          expect(result).toStrictEqual([liveGameFixtureFactory.get()]);
        });
      });

      describe('when called and no game satisfies the query', () => {
        let result: unknown;

        beforeAll(async () => {
          const mongoDbId: mongodb.ObjectID = new mongodb.ObjectID();

          const gameDbFilterQuery: mongodb.FilterQuery<LiveGameDb> = {
            _id: mongoDbId,
          };

          (gameFindQueryToGameDbFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            gameDbFilterQuery,
          );

          const gameFindQueryFixture: LiveGameFindQuery = {
            id: mongoDbId.toHexString(),
          };

          result = await gameDbSearchRepository.find(gameFindQueryFixture);
        });

        afterAll(async () => {
          (gameFindQueryToGameDbFilterQueryConverter.transform as jest.Mock).mockClear();
        });

        it('must return no game', () => {
          expect(result).toStrictEqual([]);
        });
      });
    });
  },
);
