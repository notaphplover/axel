/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Capsule, Converter } from '../../../../../../common/domain';
import { GameCreationQuery } from '../../../../domain/query/GameCreationQuery';
import { GameDb } from '../../../../adapter/db/model/GameDb';
import { GameDbInsertRepository } from '../../../../adapter/db/repository/GameDbInsertRepository';
import { LiveGame } from '../../../../domain/model/live/LiveGame';
import { MongoDbConnector } from '../../../../../../integration-modules/mongodb/adapter';
import { dbTest } from '../../../../../../layer-modules/db/test';
import { gameCreationQueryFixtureFactory } from '../../../fixtures/domain/query/card';
import { gameFixtureFactory } from '../../../fixtures/domain/model';
import mongodb from 'mongodb';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  GameDbInsertRepository.name,
  () => {
    let collectionName: string;
    let gameDbToGameConverter: Converter<GameDb, LiveGame>;
    let mongoDbConnector: MongoDbConnector;
    let gameCreationQueryToGameDbsConverter: Converter<
      GameCreationQuery,
      mongodb.OptionalId<GameDb>[]
    >;

    let gameDbInsertRepository: GameDbInsertRepository;

    beforeAll(() => {
      collectionName = 'GameDbInsertRepositoryIntegrationTest';
      gameDbToGameConverter = {
        transform: jest.fn(),
      };
      mongoDbConnector = outputParam.elem as MongoDbConnector;
      gameCreationQueryToGameDbsConverter = {
        transform: jest.fn(),
      };

      gameDbInsertRepository = new GameDbInsertRepository(
        collectionName,
        gameDbToGameConverter,
        mongoDbConnector,
        gameCreationQueryToGameDbsConverter,
      );
    });

    describe('.insert()', () => {
      describe('when called', () => {
        let gameFixture: LiveGame;
        let gameDbFixture: mongodb.OptionalId<GameDb>;

        let result: unknown;

        beforeAll(async () => {
          gameFixture = gameFixtureFactory.get();
          gameDbFixture = {
            round: gameFixture.round,
          };

          (gameDbToGameConverter.transform as jest.Mock).mockReturnValueOnce(
            gameFixture,
          );

          (gameCreationQueryToGameDbsConverter.transform as jest.Mock).mockReturnValueOnce(
            [gameDbFixture],
          );

          result = await gameDbInsertRepository.insert(
            gameCreationQueryFixtureFactory.get(),
          );
        });

        afterAll(async () => {
          (gameDbToGameConverter.transform as jest.Mock).mockClear();
          (gameCreationQueryToGameDbsConverter.transform as jest.Mock).mockClear();
        });

        it('must call gameDbToGameConverter.transform with the db entities found', () => {
          const expectedGameDb: GameDb = {
            ...gameDbFixture,
            _id: expect.any(mongodb.ObjectID) as mongodb.ObjectID,
          };

          expect(gameDbToGameConverter.transform).toHaveBeenCalledTimes(1);
          expect(gameDbToGameConverter.transform).toHaveBeenCalledWith(
            expectedGameDb,
          );
        });

        it('must return the game created', () => {
          expect(result).toStrictEqual([gameFixture]);
        });
      });
    });
  },
);
