/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import mongodb from 'mongodb';

import { Capsule, Converter } from '../../../../../../../common/domain';
import { MongoDbConnector } from '../../../../../../../integration-modules/mongodb/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { LiveGameDb } from '../../../../../adapter/db/model/live/LiveGameDb';
import { LiveGameDbInsertRepository } from '../../../../../adapter/db/repository/live/LiveGameDbInsertRepository';
import { LiveGame } from '../../../../../domain/model/live/LiveGame';
import { LiveGameCreationQuery } from '../../../../../domain/query/live/LiveGameCreationQuery';
import { liveGameFixtureFactory } from '../../../../fixtures/domain/model';
import { liveGameCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/card';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  LiveGameDbInsertRepository.name,
  () => {
    let collectionName: string;
    let gameDbToGameConverter: Converter<LiveGameDb, LiveGame>;
    let mongoDbConnector: MongoDbConnector;
    let gameCreationQueryToGameDbsConverter: Converter<
      LiveGameCreationQuery,
      mongodb.OptionalId<LiveGameDb>[]
    >;

    let gameDbInsertRepository: LiveGameDbInsertRepository;

    beforeAll(() => {
      collectionName = 'GameDbInsertRepositoryIntegrationTest';
      gameDbToGameConverter = {
        transform: jest.fn(),
      };
      mongoDbConnector = outputParam.elem as MongoDbConnector;
      gameCreationQueryToGameDbsConverter = {
        transform: jest.fn(),
      };

      gameDbInsertRepository = new LiveGameDbInsertRepository(
        collectionName,
        gameDbToGameConverter,
        mongoDbConnector,
        gameCreationQueryToGameDbsConverter,
      );
    });

    describe('.insert()', () => {
      describe('when called', () => {
        let gameFixture: LiveGame;
        let gameDbFixture: mongodb.OptionalId<LiveGameDb>;

        let result: unknown;

        beforeAll(async () => {
          gameFixture = liveGameFixtureFactory.get();
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
            liveGameCreationQueryFixtureFactory.get(),
          );
        });

        afterAll(async () => {
          (gameDbToGameConverter.transform as jest.Mock).mockClear();
          (gameCreationQueryToGameDbsConverter.transform as jest.Mock).mockClear();
        });

        it('must call gameDbToGameConverter.transform with the db entities found', () => {
          const expectedGameDb: LiveGameDb = {
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
