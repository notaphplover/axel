/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import mongodb from 'mongodb';

import { Capsule, Converter } from '../../../../../../../common/domain';
import { MongoDbConnector } from '../../../../../../../integration-modules/mongodb/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { GameSetupDb } from '../../../../../adapter/db/model/setup/GameSetupDb';
import { GameSetupDbSearchRepository } from '../../../../../adapter/db/repository/setup/GameSetupDbSearchRepository';
import { GameSetup } from '../../../../../domain/model/setup/GameSetup';
import { GameSetupFindQuery } from '../../../../../domain/query/setup/GameSetupFindQuery';
import { gameSetupFixtureFactory } from '../../../../fixtures/domain/model/setup';
import { gameSetupFindQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  GameSetupDbSearchRepository.name,
  () => {
    let collectionName: string;
    let gameSetupDbToGameSetupConverter: Converter<GameSetupDb, GameSetup>;
    let mongoDbConnector: MongoDbConnector;
    let gameSetupFindQueryToGameSetupDbFilterQueryConverter: Converter<
      GameSetupFindQuery,
      mongodb.FilterQuery<GameSetupDb>
    >;

    let gameSetupDbSearchRepository: GameSetupDbSearchRepository;

    beforeAll(() => {
      collectionName = 'GameSetupDbSearchRepository';
      gameSetupDbToGameSetupConverter = {
        transform: jest.fn(),
      };
      mongoDbConnector = outputParam.elem as MongoDbConnector;
      gameSetupFindQueryToGameSetupDbFilterQueryConverter = {
        transform: jest.fn(),
      };

      gameSetupDbSearchRepository = new GameSetupDbSearchRepository(
        collectionName,
        gameSetupDbToGameSetupConverter,
        mongoDbConnector,
        gameSetupFindQueryToGameSetupDbFilterQueryConverter,
      );
    });

    describe('.find()', () => {
      describe('when called and some game setups satisfies the query', () => {
        let gameSetupDbInserted: GameSetupDb;

        let result: unknown;

        beforeAll(async () => {
          const gameSetupFixture: GameSetup = gameSetupFixtureFactory.get();

          const gameDbCollection: mongodb.Collection<GameSetupDb> = mongoDbConnector.db.collection(
            collectionName,
          );

          // eslint-disable-next-line @typescript-eslint/typedef
          [gameSetupDbInserted] = (
            await gameDbCollection.insertMany([
              {
                format: gameSetupFixture.format,
                ownerUserId: gameSetupFixture.ownerUserId,
                playerSetups: gameSetupFixture.playerSetups,
                playerSlots: gameSetupFixture.playerSlots,
              },
            ])
          ).ops;

          (gameSetupDbToGameSetupConverter.transform as jest.Mock).mockReturnValueOnce(
            gameSetupFixture,
          );

          const gameSetupDbFilterQuery: mongodb.FilterQuery<GameSetupDb> = {
            _id: gameSetupDbInserted._id,
          };

          (gameSetupFindQueryToGameSetupDbFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            gameSetupDbFilterQuery,
          );

          const gameSetupFindQueryFixture: GameSetupFindQuery = gameSetupFindQueryFixtureFactory.get();
          gameSetupFindQueryFixture.id = gameSetupDbInserted._id.toHexString();

          result = await gameSetupDbSearchRepository.find(
            gameSetupFindQueryFixture,
          );
        });

        afterAll(() => {
          (gameSetupDbToGameSetupConverter.transform as jest.Mock).mockClear();
          (gameSetupFindQueryToGameSetupDbFilterQueryConverter.transform as jest.Mock).mockClear();
        });

        it('must call gameSetupDbToGameSetupConverter.transform with the db entities found', () => {
          expect(
            gameSetupDbToGameSetupConverter.transform,
          ).toHaveBeenCalledTimes(1);
          expect(
            gameSetupDbToGameSetupConverter.transform,
          ).toHaveBeenCalledWith(gameSetupDbInserted);
        });

        it('must return the game setups', () => {
          expect(result).toStrictEqual([gameSetupFixtureFactory.get()]);
        });
      });

      describe('when called and no game setup satisfies the query', () => {
        let result: unknown;

        beforeAll(async () => {
          const gameSetupDbFilterQuery: mongodb.FilterQuery<GameSetupDb> = {
            _id: new mongodb.ObjectID(),
          };

          (gameSetupFindQueryToGameSetupDbFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            gameSetupDbFilterQuery,
          );

          result = await gameSetupDbSearchRepository.find(
            gameSetupFindQueryFixtureFactory.get(),
          );
        });

        afterAll(() => {
          (gameSetupFindQueryToGameSetupDbFilterQueryConverter.transform as jest.Mock).mockClear();
        });

        it('must return no game', () => {
          expect(result).toStrictEqual([]);
        });
      });
    });
  },
);
