import 'reflect-metadata';

import mongodb from 'mongodb';

import { Capsule, Converter } from '../../../../../../../../common/domain';
import { MongoDbConnector } from '../../../../../../../../integration-modules/mongodb/adapter';
import { dbTest } from '../../../../../../../../layer-modules/db/test';
import { LiveGameConnectionsDb } from '../../../../../../adapter/db/model/live/connection/LiveGameConnectionsDb';
import { LiveGameConnectionsDbSearchRepository } from '../../../../../../adapter/db/repository/live/connection/LiveGameConnectionsDbSearchRepository';
import { LiveGameConnections } from '../../../../../../domain/model/live/connection/LiveGameConnections';
import { LiveGameConnectionsFindQuery } from '../../../../../../domain/query/live/connection/LiveGameConnectionsFindQuery';
import { liveGameConnectionsFixtureFactory } from '../../../../../fixtures/domain/model/live';
import { liveGameConnectionsFindQueryFixtureFactory } from '../../../../../fixtures/domain/query/live';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  LiveGameConnectionsDbSearchRepository.name,
  () => {
    let collectionName: string;
    let liveGameConnectionsDbToLiveGameConnectionsConverter: Converter<
      LiveGameConnectionsDb,
      LiveGameConnections
    >;
    let mongoDbConnector: MongoDbConnector;
    let liveGameConnectionsFindQueryToLiveGameConnectionsDbFilterQueryConverter: Converter<
      LiveGameConnectionsFindQuery,
      mongodb.FilterQuery<LiveGameConnectionsDb>
    >;

    let liveGameConnectionsDbSearchRepository: LiveGameConnectionsDbSearchRepository;

    beforeAll(() => {
      collectionName = 'LiveGameConnectionsDbSearchRepositoryIntegrationTest';
      liveGameConnectionsDbToLiveGameConnectionsConverter = {
        transform: jest.fn(),
      };
      mongoDbConnector = outputParam.elem as MongoDbConnector;
      liveGameConnectionsFindQueryToLiveGameConnectionsDbFilterQueryConverter = {
        transform: jest.fn(),
      };

      liveGameConnectionsDbSearchRepository = new LiveGameConnectionsDbSearchRepository(
        collectionName,
        liveGameConnectionsDbToLiveGameConnectionsConverter,
        mongoDbConnector,
        liveGameConnectionsFindQueryToLiveGameConnectionsDbFilterQueryConverter,
      );
    });

    describe('.find()', () => {
      describe('when called and some games satisfies the query', () => {
        let liveGameConnectionsDbInserted: LiveGameConnectionsDb;

        let result: unknown;

        beforeAll(async () => {
          const liveGameConnectionsFixture: LiveGameConnections = liveGameConnectionsFixtureFactory.get();

          const gameDbCollection: mongodb.Collection<LiveGameConnectionsDb> = mongoDbConnector.db.collection(
            collectionName,
          );

          // eslint-disable-next-line @typescript-eslint/typedef
          [liveGameConnectionsDbInserted] = (
            await gameDbCollection.insertMany([
              {
                connections: liveGameConnectionsFixture.connections,
                liveGameId: liveGameConnectionsFixture.liveGameId,
              },
            ])
          ).ops as LiveGameConnectionsDb[] & [LiveGameConnectionsDb];

          const liveGameConnectionsFindQueryFixture: LiveGameConnectionsFindQuery = {
            ...liveGameConnectionsFindQueryFixtureFactory.get(),
            id: liveGameConnectionsDbInserted._id.toHexString(),
          };

          (liveGameConnectionsDbToLiveGameConnectionsConverter.transform as jest.Mock).mockReturnValueOnce(
            liveGameConnectionsFixture,
          );

          const liveGameConnectionsDbFilterQuery: mongodb.FilterQuery<LiveGameConnectionsDb> = {
            _id: liveGameConnectionsDbInserted._id,
          };

          (liveGameConnectionsFindQueryToLiveGameConnectionsDbFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            liveGameConnectionsDbFilterQuery,
          );

          result = await liveGameConnectionsDbSearchRepository.find(
            liveGameConnectionsFindQueryFixture,
          );
        });

        afterAll(async () => {
          (liveGameConnectionsDbToLiveGameConnectionsConverter.transform as jest.Mock).mockClear();
          (liveGameConnectionsFindQueryToLiveGameConnectionsDbFilterQueryConverter.transform as jest.Mock).mockClear();
        });

        it('must call liveGameConnectionsDbToLiveGameConnectionsConverter.transform with the db entities found', () => {
          expect(
            liveGameConnectionsDbToLiveGameConnectionsConverter.transform,
          ).toHaveBeenCalledTimes(1);
          expect(
            liveGameConnectionsDbToLiveGameConnectionsConverter.transform,
          ).toHaveBeenCalledWith(liveGameConnectionsDbInserted);
        });

        it('must return all the live game connections', () => {
          expect(result).toStrictEqual([
            liveGameConnectionsFixtureFactory.get(),
          ]);
        });
      });

      describe('when called and no games satisfies the query', () => {
        let result: unknown;

        beforeAll(async () => {
          const mongoDbId: mongodb.ObjectID = new mongodb.ObjectID();

          const liveGameConnectionsDbFilterQuery: mongodb.FilterQuery<LiveGameConnectionsDb> = {
            _id: mongoDbId,
          };

          (liveGameConnectionsFindQueryToLiveGameConnectionsDbFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            liveGameConnectionsDbFilterQuery,
          );

          const gameFindQueryFixture: LiveGameConnectionsFindQuery = {
            id: mongoDbId.toHexString(),
          };

          result = await liveGameConnectionsDbSearchRepository.find(
            gameFindQueryFixture,
          );
        });

        afterAll(async () => {
          (liveGameConnectionsFindQueryToLiveGameConnectionsDbFilterQueryConverter.transform as jest.Mock).mockClear();
        });

        it('must return no live game connection', () => {
          expect(result).toStrictEqual([]);
        });
      });
    });
  },
);
