import 'reflect-metadata';

import { Container } from 'inversify';
import mongodb from 'mongodb';

import { Capsule } from '../../../../../../../../common/domain';
import { MongoDbConnector } from '../../../../../../../../integration-modules/mongodb/adapter';
import { configAdapter } from '../../../../../../../../layer-modules/config/adapter';
import { dbTest } from '../../../../../../../../layer-modules/db/test';
import { GAME_ADAPTER_TYPES } from '../../../../../../adapter/config/types';
import { LiveGameConnectionsDb } from '../../../../../../adapter/db/model/live/connection/LiveGameConnectionsDb';
import { LiveGameConnectionsDbUpdateRepository } from '../../../../../../adapter/db/repository/live/connection/LiveGameConnectionsDbUpdateRepository';
import { GAME_DOMAIN_TYPES } from '../../../../../../domain/config/types';
import { LiveGameConnections } from '../../../../../../domain/model/live/connection/LiveGameConnections';
import { LiveGameConnectionsUpdateQuery } from '../../../../../../domain/query/live/connection/LiveGameConnectionsUpdateQuery';
import { liveGameConnectionsFixtureFactory } from '../../../../../fixtures/domain/model/live';
import { liveGameConnectionsUpdateQueryFixtureFactory } from '../../../../../fixtures/domain/query/live';

const container: Container = configAdapter.container;

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  LiveGameConnectionsDbUpdateRepository.name,
  () => {
    describe('.updateAndSelect()', () => {
      let collection: mongodb.Collection<LiveGameConnectionsDb>;
      let liveGameConnectionsDbUpdateRepository: LiveGameConnectionsDbUpdateRepository;

      beforeAll(() => {
        const collectionName: string =
          'liveGameConnectionsIntegrationUpdateAndSelect';

        collection = (outputParam.elem as MongoDbConnector).db.collection(
          collectionName,
        );

        const childContainer: Container = container.createChild();

        childContainer
          .bind(
            GAME_ADAPTER_TYPES.db.collection.live
              .LIVE_GAME_CONNECTIONS_COLLECTION_NAME,
          )
          .toConstantValue(collectionName);

        liveGameConnectionsDbUpdateRepository = childContainer.get(
          GAME_DOMAIN_TYPES.repository.live.connection
            .LIVE_GAME_CONNECTIONS_UPDATE_REPOSITORY,
        );
      });

      describe('when called', () => {
        let liveGameConnectionsDbInserted: LiveGameConnectionsDb;
        let liveGameConnectionsUpdateQueryFixture: LiveGameConnectionsUpdateQuery;

        let result: unknown;

        beforeAll(async () => {
          await collection.deleteMany({});

          // eslint-disable-next-line @typescript-eslint/typedef
          [liveGameConnectionsDbInserted] = (
            await collection.insertMany([
              {
                connections: [],
                liveGameId: liveGameConnectionsFixtureFactory.get().id,
              },
            ])
          ).ops as LiveGameConnectionsDb[] & [LiveGameConnectionsDb];

          liveGameConnectionsUpdateQueryFixture =
            liveGameConnectionsUpdateQueryFixtureFactory.get();

          liveGameConnectionsUpdateQueryFixture.liveGameId =
            liveGameConnectionsDbInserted.liveGameId;

          result = await liveGameConnectionsDbUpdateRepository.updateAndSelect(
            liveGameConnectionsUpdateQueryFixture,
          );
        });

        afterAll(async () => {
          await collection.deleteMany({});
        });

        it('must return the game connections updated', () => {
          expect(result).toHaveProperty('length');
          expect(result).toHaveLength(1);

          const [innerResult]: unknown[] = result as unknown[];

          expect((innerResult as LiveGameConnections).id).toBe(
            liveGameConnectionsDbInserted._id.toHexString(),
          );

          expect((innerResult as LiveGameConnections).connections).toEqual([
            liveGameConnectionsUpdateQueryFixtureFactory.get()
              .liveGameConnection,
          ]);
        });
      });
    });
  },
);
