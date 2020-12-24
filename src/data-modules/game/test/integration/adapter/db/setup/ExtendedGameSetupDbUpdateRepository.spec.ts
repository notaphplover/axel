import 'reflect-metadata';
import { Capsule } from '../../../../../../../common/domain';
import { Container } from 'inversify';
import { ExtendedGameSetup } from '../../../../../domain/model/setup/ExtendedGameSetup';
import { ExtendedGameSetupDb } from '../../../../../adapter/db/model/setup/ExtendedGameSetupDb';
import { ExtendedGameSetupDbUpdateRepository } from '../../../../../adapter/db/repository/setup/ExtendedGameSetupDbUpdateRepository';
import { GAME_ADAPTER_TYPES } from '../../../../../adapter/config/types';
import { GAME_DOMAIN_TYPES } from '../../../../../domain/config/types';
import { GameSetupUpdateQuery } from '../../../../../domain/query/setup/GameSetupUpdateQuery';
import { MongoDbConnector } from '../../../../../../../integration-modules/mongodb/adapter';
import { PlayerSetup } from '../../../../../domain/model/setup/PlayerSetup';
import { configAdapter } from '../../../../../../../layer-modules/config/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { extendedGameSetupFixtureFactory } from '../../../../fixtures/domain/model/setup';
import { gameSetupUpdateQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';
import mongodb from 'mongodb';

const container: Container = configAdapter.container;

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  ExtendedGameSetupDbUpdateRepository.name,
  () => {
    describe('.updateAndSelect()', () => {
      let collection: mongodb.Collection<ExtendedGameSetupDb>;
      let extendedGameSetupDbUpdateRepository: ExtendedGameSetupDbUpdateRepository;

      beforeAll(() => {
        const collectionName: string =
          'extendedGameSetupIntegrationUpdateAndSelect';

        collection = (outputParam.elem as MongoDbConnector).db.collection(
          collectionName,
        );

        const childContainer: Container = container.createChild();

        childContainer
          .bind(
            GAME_ADAPTER_TYPES.db.collection.setup
              .EXTENDED_GAME_SETUP_COLLECTION_NAME,
          )
          .toConstantValue(collectionName);

        extendedGameSetupDbUpdateRepository = childContainer.get(
          GAME_DOMAIN_TYPES.repository.setup
            .EXTENDED_GAME_SETUP_UPDATE_REPOSITORY,
        );
      });

      describe('when called', () => {
        let extendedGameSetupDbInserted: ExtendedGameSetupDb;
        let gameSetupUpdateQueryFixture: GameSetupUpdateQuery;

        let result: unknown;

        beforeAll(async () => {
          await collection.deleteMany({});

          // eslint-disable-next-line @typescript-eslint/typedef
          [extendedGameSetupDbInserted] = (
            await collection.insertMany([
              {
                format: extendedGameSetupFixtureFactory.get().format,
                ownerUserId: extendedGameSetupFixtureFactory.get().ownerUserId,
                playerSetups: extendedGameSetupFixtureFactory.get()
                  .playerSetups,
                playerSlots: extendedGameSetupFixtureFactory.get().playerSlots,
              },
            ])
          ).ops;

          gameSetupUpdateQueryFixture = gameSetupUpdateQueryFixtureFactory.get();

          gameSetupUpdateQueryFixture.id = extendedGameSetupDbInserted._id.toHexString();

          const additionalPlayerSetupUserId: string = (gameSetupUpdateQueryFixture.additionalPlayerSetups as PlayerSetup[])[0]
            .userId;

          (gameSetupUpdateQueryFixture.additionalPlayerSetups as PlayerSetup[])[0].userId = (
            parseInt(additionalPlayerSetupUserId, 16) + 1
          ).toString(16);

          result = await extendedGameSetupDbUpdateRepository.updateAndSelect(
            gameSetupUpdateQueryFixture,
          );
        });

        afterAll(async () => {
          await collection.deleteMany({});
        });

        it('must return the game setup updated', () => {
          expect(result).toHaveProperty('length');
          expect((result as unknown[]).length).toBe(1);

          const [innerResult]: unknown[] = result as unknown[];

          expect((innerResult as ExtendedGameSetup).id).toBe(
            extendedGameSetupDbInserted._id.toHexString(),
          );

          expect((innerResult as ExtendedGameSetup).playerSetups).toEqual(
            gameSetupUpdateQueryFixture.additionalPlayerSetups,
          );
        });
      });

      describe('when called, with a query with additionalPlayerSetups with an existing player setup', () => {
        let extendedGameSetupDbInserted: ExtendedGameSetupDb;
        let gameSetupUpdateQueryFixture: GameSetupUpdateQuery;

        let result: unknown;

        beforeAll(async () => {
          await collection.deleteMany({});

          // eslint-disable-next-line @typescript-eslint/typedef
          [extendedGameSetupDbInserted] = (
            await collection.insertMany([
              {
                format: extendedGameSetupFixtureFactory.get().format,
                ownerUserId: extendedGameSetupFixtureFactory.get().ownerUserId,
                playerSetups: extendedGameSetupFixtureFactory.get()
                  .playerSetups,
                playerSlots: extendedGameSetupFixtureFactory.get().playerSlots,
              },
            ])
          ).ops;

          const childContainer: Container = container.createChild();

          const extendedGameSetupDbUpdateRepository: ExtendedGameSetupDbUpdateRepository = childContainer.get(
            GAME_DOMAIN_TYPES.repository.setup
              .EXTENDED_GAME_SETUP_UPDATE_REPOSITORY,
          );

          gameSetupUpdateQueryFixture = gameSetupUpdateQueryFixtureFactory.get();

          gameSetupUpdateQueryFixture.id = extendedGameSetupDbInserted._id.toHexString();

          result = await extendedGameSetupDbUpdateRepository.updateAndSelect(
            gameSetupUpdateQueryFixture,
          );
        });

        afterAll(async () => {
          await collection.deleteMany({});
        });

        it('must return no games', () => {
          expect(result).toHaveProperty('length');
          expect((result as unknown[]).length).toBe(0);
        });
      });

      describe('when called, with a query with removePlayerSetups with a non existing player setup', () => {
        let extendedGameSetupDbInserted: ExtendedGameSetupDb;
        let gameSetupUpdateQueryFixture: GameSetupUpdateQuery;

        let result: unknown;

        beforeAll(async () => {
          await collection.deleteMany({});

          // eslint-disable-next-line @typescript-eslint/typedef
          [extendedGameSetupDbInserted] = (
            await collection.insertMany([
              {
                format: extendedGameSetupFixtureFactory.get().format,
                ownerUserId: extendedGameSetupFixtureFactory.get().ownerUserId,
                playerSetups: extendedGameSetupFixtureFactory.get()
                  .playerSetups,
                playerSlots: extendedGameSetupFixtureFactory.get().playerSlots,
              },
            ])
          ).ops;

          const childContainer: Container = container.createChild();

          const extendedGameSetupDbUpdateRepository: ExtendedGameSetupDbUpdateRepository = childContainer.get(
            GAME_DOMAIN_TYPES.repository.setup
              .EXTENDED_GAME_SETUP_UPDATE_REPOSITORY,
          );

          gameSetupUpdateQueryFixture = gameSetupUpdateQueryFixtureFactory.get();

          gameSetupUpdateQueryFixture.id = extendedGameSetupDbInserted._id.toHexString();

          const removePlayerSetupUserId: string = (gameSetupUpdateQueryFixture.removePlayerSetups as PlayerSetup[])[0]
            .userId;

          (gameSetupUpdateQueryFixture.removePlayerSetups as PlayerSetup[])[0].userId = (
            parseInt(removePlayerSetupUserId, 16) + 1
          ).toString(16);

          result = await extendedGameSetupDbUpdateRepository.updateAndSelect(
            gameSetupUpdateQueryFixture,
          );
        });

        afterAll(async () => {
          await collection.deleteMany({});
        });

        it('must return no games', () => {
          expect(result).toHaveProperty('length');
          expect((result as unknown[]).length).toBe(0);
        });
      });
    });

    describe('.updateOneAndSelect()', () => {
      let collection: mongodb.Collection<ExtendedGameSetupDb>;
      let extendedGameSetupDbUpdateRepository: ExtendedGameSetupDbUpdateRepository;

      beforeAll(() => {
        const collectionName: string =
          'extendedGameSetupIntegrationUpdateAndSelect';

        collection = (outputParam.elem as MongoDbConnector).db.collection(
          collectionName,
        );

        const childContainer: Container = container.createChild();

        childContainer
          .bind(
            GAME_ADAPTER_TYPES.db.collection.setup
              .EXTENDED_GAME_SETUP_COLLECTION_NAME,
          )
          .toConstantValue(collectionName);

        extendedGameSetupDbUpdateRepository = childContainer.get(
          GAME_DOMAIN_TYPES.repository.setup
            .EXTENDED_GAME_SETUP_UPDATE_REPOSITORY,
        );
      });

      describe('when called', () => {
        let extendedGameSetupDbInserted: ExtendedGameSetupDb;
        let gameSetupUpdateQueryFixture: GameSetupUpdateQuery;

        let result: unknown;

        beforeAll(async () => {
          await collection.deleteMany({});

          // eslint-disable-next-line @typescript-eslint/typedef
          [extendedGameSetupDbInserted] = (
            await collection.insertMany([
              {
                format: extendedGameSetupFixtureFactory.get().format,
                ownerUserId: extendedGameSetupFixtureFactory.get().ownerUserId,
                playerSetups: extendedGameSetupFixtureFactory.get()
                  .playerSetups,
                playerSlots: extendedGameSetupFixtureFactory.get().playerSlots,
              },
            ])
          ).ops;

          gameSetupUpdateQueryFixture = gameSetupUpdateQueryFixtureFactory.get();

          gameSetupUpdateQueryFixture.id = extendedGameSetupDbInserted._id.toHexString();

          const additionalPlayerSetupUserId: string = (gameSetupUpdateQueryFixture.additionalPlayerSetups as PlayerSetup[])[0]
            .userId;

          (gameSetupUpdateQueryFixture.additionalPlayerSetups as PlayerSetup[])[0].userId = (
            parseInt(additionalPlayerSetupUserId, 16) + 1
          ).toString(16);

          result = await extendedGameSetupDbUpdateRepository.updateOneAndSelect(
            gameSetupUpdateQueryFixture,
          );
        });

        afterAll(async () => {
          await collection.deleteMany({});
        });

        it('must return the game setup updated', () => {
          expect((result as ExtendedGameSetup).id).toBe(
            extendedGameSetupDbInserted._id.toHexString(),
          );

          expect((result as ExtendedGameSetup).playerSetups).toEqual(
            gameSetupUpdateQueryFixture.additionalPlayerSetups,
          );
        });
      });

      describe('when called, with a query with additionalPlayerSetups with an existing player setup', () => {
        let extendedGameSetupDbInserted: ExtendedGameSetupDb;
        let gameSetupUpdateQueryFixture: GameSetupUpdateQuery;

        let result: unknown;

        beforeAll(async () => {
          await collection.deleteMany({});

          // eslint-disable-next-line @typescript-eslint/typedef
          [extendedGameSetupDbInserted] = (
            await collection.insertMany([
              {
                format: extendedGameSetupFixtureFactory.get().format,
                ownerUserId: extendedGameSetupFixtureFactory.get().ownerUserId,
                playerSetups: extendedGameSetupFixtureFactory.get()
                  .playerSetups,
                playerSlots: extendedGameSetupFixtureFactory.get().playerSlots,
              },
            ])
          ).ops;

          const childContainer: Container = container.createChild();

          const extendedGameSetupDbUpdateRepository: ExtendedGameSetupDbUpdateRepository = childContainer.get(
            GAME_DOMAIN_TYPES.repository.setup
              .EXTENDED_GAME_SETUP_UPDATE_REPOSITORY,
          );

          gameSetupUpdateQueryFixture = gameSetupUpdateQueryFixtureFactory.get();

          gameSetupUpdateQueryFixture.id = extendedGameSetupDbInserted._id.toHexString();

          result = await extendedGameSetupDbUpdateRepository.updateOneAndSelect(
            gameSetupUpdateQueryFixture,
          );
        });

        afterAll(async () => {
          await collection.deleteMany({});
        });

        it('must return no games', () => {
          expect(result).toBeNull();
        });
      });

      describe('when called, with a query with removePlayerSetups with a non existing player setup', () => {
        let extendedGameSetupDbInserted: ExtendedGameSetupDb;
        let gameSetupUpdateQueryFixture: GameSetupUpdateQuery;

        let result: unknown;

        beforeAll(async () => {
          await collection.deleteMany({});

          // eslint-disable-next-line @typescript-eslint/typedef
          [extendedGameSetupDbInserted] = (
            await collection.insertMany([
              {
                format: extendedGameSetupFixtureFactory.get().format,
                ownerUserId: extendedGameSetupFixtureFactory.get().ownerUserId,
                playerSetups: extendedGameSetupFixtureFactory.get()
                  .playerSetups,
                playerSlots: extendedGameSetupFixtureFactory.get().playerSlots,
              },
            ])
          ).ops;

          const childContainer: Container = container.createChild();

          const extendedGameSetupDbUpdateRepository: ExtendedGameSetupDbUpdateRepository = childContainer.get(
            GAME_DOMAIN_TYPES.repository.setup
              .EXTENDED_GAME_SETUP_UPDATE_REPOSITORY,
          );

          gameSetupUpdateQueryFixture = gameSetupUpdateQueryFixtureFactory.get();

          gameSetupUpdateQueryFixture.id = extendedGameSetupDbInserted._id.toHexString();

          const removePlayerSetupUserId: string = (gameSetupUpdateQueryFixture.removePlayerSetups as PlayerSetup[])[0]
            .userId;

          (gameSetupUpdateQueryFixture.removePlayerSetups as PlayerSetup[])[0].userId = (
            parseInt(removePlayerSetupUserId, 16) + 1
          ).toString(16);

          result = await extendedGameSetupDbUpdateRepository.updateOneAndSelect(
            gameSetupUpdateQueryFixture,
          );
        });

        afterAll(async () => {
          await collection.deleteMany({});
        });

        it('must return no games', () => {
          expect(result).toBeNull();
        });
      });
    });
  },
);
