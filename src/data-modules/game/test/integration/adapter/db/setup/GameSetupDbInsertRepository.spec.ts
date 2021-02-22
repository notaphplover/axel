/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import mongodb from 'mongodb';

import { Capsule, Converter } from '../../../../../../../common/domain';
import { MongoDbConnector } from '../../../../../../../integration-modules/mongodb/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { GameSetupDb } from '../../../../../adapter/db/model/setup/GameSetupDb';
import { GameSetupDbInsertRepository } from '../../../../../adapter/db/repository/setup/GameSetupDbInsertRepository';
import { GameSetup } from '../../../../../domain/model/setup/GameSetup';
import { GameSetupsCreationQuery } from '../../../../../domain/query/setup/GameSetupCreationQuery';
import { gameSetupFixtureFactory } from '../../../../fixtures/domain/model/setup';
import { gameSetupsCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  GameSetupDbInsertRepository.name,
  () => {
    let collectionName: string;
    let gameSetupDbToGameSetupConverter: Converter<GameSetupDb, GameSetup>;
    let mongoDbConnector: MongoDbConnector;
    let gameSetupCreationQueryToGameSetupDbsConverter: Converter<
      GameSetupsCreationQuery,
      mongodb.OptionalId<GameSetupDb>[]
    >;

    let gameSetupDbInsertRepository: GameSetupDbInsertRepository;

    beforeAll(() => {
      collectionName = 'GameSetupDbInsertRepositoryIntegrationTest';
      gameSetupDbToGameSetupConverter = {
        transform: jest.fn(),
      };
      mongoDbConnector = outputParam.elem as MongoDbConnector;
      gameSetupCreationQueryToGameSetupDbsConverter = {
        transform: jest.fn(),
      };

      gameSetupDbInsertRepository = new GameSetupDbInsertRepository(
        collectionName,
        gameSetupDbToGameSetupConverter,
        mongoDbConnector,
        gameSetupCreationQueryToGameSetupDbsConverter,
      );
    });

    describe('.insert()', () => {
      describe('when called', () => {
        let gameSetupDb: mongodb.OptionalId<GameSetupDb>;

        let result: unknown;

        beforeAll(async () => {
          (gameSetupDbToGameSetupConverter.transform as jest.Mock).mockReturnValueOnce(
            gameSetupFixtureFactory.get(),
          );

          gameSetupDb = {
            format: gameSetupFixtureFactory.get().format,
            ownerUserId: gameSetupFixtureFactory.get().ownerUserId,
            playerSetups: gameSetupFixtureFactory.get().playerSetups,
            playerSlots: gameSetupFixtureFactory.get().playerSlots,
          };

          (gameSetupCreationQueryToGameSetupDbsConverter.transform as jest.Mock).mockReturnValueOnce(
            [gameSetupDb],
          );

          result = await gameSetupDbInsertRepository.insert(
            gameSetupsCreationQueryFixtureFactory.get(),
          );
        });

        afterAll(() => {
          (gameSetupDbToGameSetupConverter.transform as jest.Mock).mockClear();
          (gameSetupCreationQueryToGameSetupDbsConverter.transform as jest.Mock).mockClear();
        });

        it('must call gameSetupDbToGameSetupConverter.transform with the db entities created', () => {
          const expectedGameSetupDb: GameSetupDb = {
            ...gameSetupDb,
            _id: expect.any(mongodb.ObjectID) as mongodb.ObjectID,
          };

          expect(
            gameSetupDbToGameSetupConverter.transform,
          ).toHaveBeenCalledTimes(1);
          expect(
            gameSetupDbToGameSetupConverter.transform,
          ).toHaveBeenCalledWith(expectedGameSetupDb);
        });

        it('must return the entities created', () => {
          expect(result).toStrictEqual([gameSetupFixtureFactory.get()]);
        });
      });
    });
  },
);
