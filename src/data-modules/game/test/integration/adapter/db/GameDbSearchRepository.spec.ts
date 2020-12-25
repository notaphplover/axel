/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';

import { Capsule, Converter } from '../../../../../../common/domain';
import { Game } from '../../../../domain/model/Game';
import { GameDb } from '../../../../adapter/db/model/GameDb';
import { GameDbSearchRepository } from '../../../../adapter/db/repository/GameDbSearchRepository';
import { GameFindQuery } from '../../../../domain/query/GameFindQuery';
import { MongoDbConnector } from '../../../../../../integration-modules/mongodb/adapter';
import { dbTest } from '../../../../../../layer-modules/db/test';
import { gameFindQueryFixtureFactory } from '../../../fixtures/domain/query/card';
import { gameFixtureFactory } from '../../../fixtures/domain/model';
import mongodb from 'mongodb';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  GameDbSearchRepository.name,
  () => {
    let collectionName: string;
    let gameDbToGameConverter: Converter<GameDb, Game>;
    let mongoDbConnector: MongoDbConnector;
    let gameFindQueryToGameDbFilterQueryConverter: Converter<
      GameFindQuery,
      mongodb.FilterQuery<GameDb>
    >;

    let gameDbSearchRepository: GameDbSearchRepository;

    beforeAll(() => {
      collectionName = 'GameDbSearchRepositoryIntegrationTest';
      gameDbToGameConverter = {
        transform: jest.fn(),
      };
      mongoDbConnector = outputParam.elem as MongoDbConnector;
      gameFindQueryToGameDbFilterQueryConverter = {
        transform: jest.fn(),
      };

      gameDbSearchRepository = new GameDbSearchRepository(
        collectionName,
        gameDbToGameConverter,
        mongoDbConnector,
        gameFindQueryToGameDbFilterQueryConverter,
      );
    });

    describe('.find()', () => {
      describe('when called and some games satisfies the query', () => {
        let gameDbInserted: GameDb;

        let result: unknown;

        beforeAll(async () => {
          const gameFixture: Game = gameFixtureFactory.get();

          const gameDbCollection: mongodb.Collection<GameDb> = mongoDbConnector.db.collection(
            collectionName,
          );

          // eslint-disable-next-line @typescript-eslint/typedef
          [gameDbInserted] = (
            await gameDbCollection.insertMany([
              {
                round: gameFixture.round,
              } as mongodb.OptionalId<GameDb>,
            ])
          ).ops;

          const gameFindQueryFixture: GameFindQuery = {
            ...gameFindQueryFixtureFactory.get(),
            id: gameDbInserted._id.toHexString(),
          };

          (gameDbToGameConverter.transform as jest.Mock).mockReturnValueOnce(
            gameFixture,
          );

          const gameDbFilterQuery: mongodb.FilterQuery<GameDb> = {
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
          expect(result).toStrictEqual([gameFixtureFactory.get()]);
        });
      });

      describe('when called and no game satisfies the query', () => {
        let result: unknown;

        beforeAll(async () => {
          const mongoDbId: mongodb.ObjectID = new mongodb.ObjectID();

          const gameDbFilterQuery: mongodb.FilterQuery<GameDb> = {
            _id: mongoDbId,
          };

          (gameFindQueryToGameDbFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            gameDbFilterQuery,
          );

          const gameFindQueryFixture: GameFindQuery = {
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
