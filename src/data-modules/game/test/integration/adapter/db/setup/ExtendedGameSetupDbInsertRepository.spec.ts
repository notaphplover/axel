/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Capsule, Converter } from '../../../../../../../common/domain';
import { ExtendedGameSetup } from '../../../../../domain/model/setup/ExtendedGameSetup';
import { ExtendedGameSetupDb } from '../../../../../adapter/db/model/setup/ExtendedGameSetupDb';
import { ExtendedGameSetupDbInsertRepository } from '../../../../../adapter/db/repository/setup/ExtendedGameSetupDbInsertRepository';
import { GameSetupsCreationQuery } from '../../../../../domain/query/setup/GameSetupCreationQuery';
import { MongoDbConnector } from '../../../../../../../integration-modules/mongodb/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { extendedGameSetupFixtureFactory } from '../../../../fixtures/domain/model/setup';
import { gameSetupsCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';
import mongodb from 'mongodb';
const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  ExtendedGameSetupDbInsertRepository.name,
  () => {
    let collectionName: string;
    let extendedGameSetupDbToExtendedGameSetupConverter: Converter<
      ExtendedGameSetupDb,
      ExtendedGameSetup
    >;
    let mongoDbConnector: MongoDbConnector;
    let gameSetupCreationQueryToExtendedGameSetupDbsConverter: Converter<
      GameSetupsCreationQuery,
      mongodb.OptionalId<ExtendedGameSetupDb>[]
    >;

    let extendedGameSetupDbInsertRepository: ExtendedGameSetupDbInsertRepository;

    beforeAll(() => {
      collectionName = 'ExtendedGameSetupDbInsertRepositoryIntegrationTest';
      extendedGameSetupDbToExtendedGameSetupConverter = {
        transform: jest.fn(),
      };
      mongoDbConnector = outputParam.elem as MongoDbConnector;
      gameSetupCreationQueryToExtendedGameSetupDbsConverter = {
        transform: jest.fn(),
      };

      extendedGameSetupDbInsertRepository = new ExtendedGameSetupDbInsertRepository(
        collectionName,
        extendedGameSetupDbToExtendedGameSetupConverter,
        mongoDbConnector,
        gameSetupCreationQueryToExtendedGameSetupDbsConverter,
      );
    });

    describe('.insert()', () => {
      describe('when called', () => {
        let extendedGameSetupDb: mongodb.OptionalId<ExtendedGameSetupDb>;

        let result: unknown;

        beforeAll(async () => {
          (extendedGameSetupDbToExtendedGameSetupConverter.transform as jest.Mock).mockReturnValueOnce(
            extendedGameSetupFixtureFactory.get(),
          );

          extendedGameSetupDb = {
            format: extendedGameSetupFixtureFactory.get().format,
            ownerUserId: extendedGameSetupFixtureFactory.get().ownerUserId,
            playerSetups: extendedGameSetupFixtureFactory.get().playerSetups,
            playerSlots: extendedGameSetupFixtureFactory.get().playerSlots,
          };

          (gameSetupCreationQueryToExtendedGameSetupDbsConverter.transform as jest.Mock).mockReturnValueOnce(
            [extendedGameSetupDb],
          );

          result = await extendedGameSetupDbInsertRepository.insert(
            gameSetupsCreationQueryFixtureFactory.get(),
          );
        });

        afterAll(() => {
          (extendedGameSetupDbToExtendedGameSetupConverter.transform as jest.Mock).mockClear();
          (gameSetupCreationQueryToExtendedGameSetupDbsConverter.transform as jest.Mock).mockClear();
        });

        it('must call extendedGameSetupDbToExtendedGameSetupConverter.transform with the db entities created', () => {
          const expectedExtendedGameSetupDb: ExtendedGameSetupDb = {
            ...extendedGameSetupDb,
            _id: expect.any(mongodb.ObjectID) as mongodb.ObjectID,
          };

          expect(
            extendedGameSetupDbToExtendedGameSetupConverter.transform,
          ).toHaveBeenCalledTimes(1);
          expect(
            extendedGameSetupDbToExtendedGameSetupConverter.transform,
          ).toHaveBeenCalledWith(expectedExtendedGameSetupDb);
        });

        it('must return the entities created', () => {
          expect(result).toStrictEqual([extendedGameSetupFixtureFactory.get()]);
        });
      });
    });
  },
);
