import 'reflect-metadata';
import mongodb from 'mongodb';

import { Capsule, Converter } from '../../../../../../../../common/domain';
import { MongoDbConnector } from '../../../../../../../../integration-modules/mongodb/adapter';
import { dbTest } from '../../../../../../../../layer-modules/db/test';
import { LiveGameConnectionsDb } from '../../../../../../adapter/db/model/live/connection/LiveGameConnectionsDb';
import { LiveGameConnectionsDbInsertRepository } from '../../../../../../adapter/db/repository/live/connection/LiveGameConnectionsDbInsertRepository';
import { LiveGameConnections } from '../../../../../../domain/model/live/connection/LiveGameConnections';
import { LiveGameConnectionsCreationQuery } from '../../../../../../domain/query/live/connection/LiveGameConnectionsCreationQuery';
import { liveGameConnectionsFixtureFactory } from '../../../../../fixtures/domain/model/live';
import { liveGameConnectionsCreationQueryFixtureFactory } from '../../../../../fixtures/domain/query/live';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  LiveGameConnectionsDbInsertRepository.name,
  () => {
    let collectionName: string;
    let liveGameConnectionsDbToLiveGameConnectionsConverter: Converter<
      LiveGameConnectionsDb,
      LiveGameConnections
    >;
    let mongoDbConnector: MongoDbConnector;
    let gameCreationQueryToGameDbsConverter: Converter<
      LiveGameConnectionsCreationQuery,
      mongodb.OptionalId<LiveGameConnectionsDb>[]
    >;

    let liveGameConnectionsDbInsertRepository: LiveGameConnectionsDbInsertRepository;

    beforeAll(() => {
      collectionName = 'LiveGameConnectionsDbInsertRepositoryIntegrationTest';
      liveGameConnectionsDbToLiveGameConnectionsConverter = {
        transform: jest.fn(),
      };
      mongoDbConnector = outputParam.elem as MongoDbConnector;
      gameCreationQueryToGameDbsConverter = {
        transform: jest.fn(),
      };

      liveGameConnectionsDbInsertRepository =
        new LiveGameConnectionsDbInsertRepository(
          collectionName,
          liveGameConnectionsDbToLiveGameConnectionsConverter,
          mongoDbConnector,
          gameCreationQueryToGameDbsConverter,
        );
    });

    describe('.insert()', () => {
      describe('when called', () => {
        let liveGameConnectionsFixture: LiveGameConnections;
        let gameDbFixture: mongodb.OptionalId<LiveGameConnectionsDb>;

        let result: unknown;

        beforeAll(async () => {
          liveGameConnectionsFixture = liveGameConnectionsFixtureFactory.get();

          gameDbFixture = {
            connections: [...liveGameConnectionsFixture.connections],
            liveGameId: liveGameConnectionsFixture.liveGameId,
          };

          (
            liveGameConnectionsDbToLiveGameConnectionsConverter.transform as jest.Mock
          ).mockReturnValueOnce(liveGameConnectionsFixture);

          (
            gameCreationQueryToGameDbsConverter.transform as jest.Mock
          ).mockReturnValueOnce([gameDbFixture]);

          result = await liveGameConnectionsDbInsertRepository.insert(
            liveGameConnectionsCreationQueryFixtureFactory.get(),
          );
        });

        afterAll(async () => {
          (
            liveGameConnectionsDbToLiveGameConnectionsConverter.transform as jest.Mock
          ).mockClear();
          (
            gameCreationQueryToGameDbsConverter.transform as jest.Mock
          ).mockClear();
        });

        it('must call gameDbToGameConverter.transform with the db entities found', () => {
          const expectedGameDb: LiveGameConnectionsDb = {
            ...gameDbFixture,
            _id: expect.any(mongodb.ObjectID) as mongodb.ObjectID,
          };

          expect(
            liveGameConnectionsDbToLiveGameConnectionsConverter.transform,
          ).toHaveBeenCalledTimes(1);
          expect(
            liveGameConnectionsDbToLiveGameConnectionsConverter.transform,
          ).toHaveBeenCalledWith(expectedGameDb);
        });

        it('must return the live game connections created', () => {
          expect(result).toStrictEqual([liveGameConnectionsFixture]);
        });
      });
    });
  },
);
