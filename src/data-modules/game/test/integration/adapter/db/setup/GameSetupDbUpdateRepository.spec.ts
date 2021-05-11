import 'reflect-metadata';
import { Container } from 'inversify';
import mongodb from 'mongodb';

import { Capsule } from '../../../../../../../common/domain';
import { MongoDbConnector } from '../../../../../../../integration-modules/mongodb/adapter';
import { configAdapter } from '../../../../../../../layer-modules/config/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { GAME_ADAPTER_TYPES } from '../../../../../adapter/config/types';
import { GameSetupDb } from '../../../../../adapter/db/model/setup/GameSetupDb';
import { GameSetupDbUpdateRepository } from '../../../../../adapter/db/repository/setup/GameSetupDbUpdateRepository';
import { GAME_DOMAIN_TYPES } from '../../../../../domain/config/types';
import { GameSetup } from '../../../../../domain/model/setup/GameSetup';
import { PlayerSetup } from '../../../../../domain/model/setup/PlayerSetup';
import { GameSetupUpdateQuery } from '../../../../../domain/query/setup/GameSetupUpdateQuery';
import { gameSetupFixtureFactory } from '../../../../fixtures/domain/model/setup';
import { gameSetupUpdateQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';

const container: Container = configAdapter.container;

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  GameSetupDbUpdateRepository.name,
  () => {
    describe('.updateAndSelect()', () => {
      let collection: mongodb.Collection<GameSetupDb>;
      let gameSetupDbUpdateRepository: GameSetupDbUpdateRepository;

      beforeAll(() => {
        const collectionName: string = 'gameSetupIntegrationUpdateAndSelect';

        collection = (outputParam.elem as MongoDbConnector).db.collection(
          collectionName,
        );

        const childContainer: Container = container.createChild();

        childContainer
          .bind(
            GAME_ADAPTER_TYPES.db.collection.setup.GAME_SETUP_COLLECTION_NAME,
          )
          .toConstantValue(collectionName);

        gameSetupDbUpdateRepository = childContainer.get(
          GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_UPDATE_REPOSITORY,
        );
      });

      describe('when called', () => {
        let gameSetupDbInserted: GameSetupDb;
        let gameSetupUpdateQueryFixture: GameSetupUpdateQuery;

        let result: unknown;

        beforeAll(async () => {
          await collection.deleteMany({});

          // eslint-disable-next-line @typescript-eslint/typedef
          [gameSetupDbInserted] = (
            await collection.insertMany([
              {
                format: gameSetupFixtureFactory.get().format,
                ownerUserId: gameSetupFixtureFactory.get().ownerUserId,
                playerSetups: gameSetupFixtureFactory.get().playerSetups,
                playerSlots: gameSetupFixtureFactory.get().playerSlots,
              },
            ])
          ).ops as GameSetupDb[] & [GameSetupDb];

          gameSetupUpdateQueryFixture =
            gameSetupUpdateQueryFixtureFactory.get();

          gameSetupUpdateQueryFixture.id =
            gameSetupDbInserted._id.toHexString();

          const additionalPlayerSetupUserId: string = (
            gameSetupUpdateQueryFixture.additionalPlayerSetups as PlayerSetup[] &
              [PlayerSetup]
          )[0].userId;

          (
            gameSetupUpdateQueryFixture.additionalPlayerSetups as PlayerSetup[] &
              [PlayerSetup]
          )[0].userId = (
            parseInt(additionalPlayerSetupUserId, 16) + 1
          ).toString(16);

          result = await gameSetupDbUpdateRepository.updateAndSelect(
            gameSetupUpdateQueryFixture,
          );
        });

        afterAll(async () => {
          await collection.deleteMany({});
        });

        it('must return the game setup updated', () => {
          expect(result).toHaveProperty('length');
          expect(result).toHaveLength(1);

          const [innerResult]: unknown[] = result as unknown[];

          expect((innerResult as GameSetup).id).toBe(
            gameSetupDbInserted._id.toHexString(),
          );

          expect((innerResult as GameSetup).playerSetups).toEqual(
            gameSetupUpdateQueryFixture.additionalPlayerSetups,
          );
        });
      });

      describe('when called, with a query with additionalPlayerSetups with an existing player setup', () => {
        let gameSetupDbInserted: GameSetupDb;
        let gameSetupUpdateQueryFixture: GameSetupUpdateQuery;

        let result: unknown;

        beforeAll(async () => {
          await collection.deleteMany({});

          // eslint-disable-next-line @typescript-eslint/typedef
          [gameSetupDbInserted] = (
            await collection.insertMany([
              {
                format: gameSetupFixtureFactory.get().format,
                ownerUserId: gameSetupFixtureFactory.get().ownerUserId,
                playerSetups: gameSetupFixtureFactory.get().playerSetups,
                playerSlots: gameSetupFixtureFactory.get().playerSlots,
              },
            ])
          ).ops as GameSetupDb[] & [GameSetupDb];

          const childContainer: Container = container.createChild();

          const gameSetupDbUpdateRepository: GameSetupDbUpdateRepository =
            childContainer.get(
              GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_UPDATE_REPOSITORY,
            );

          gameSetupUpdateQueryFixture =
            gameSetupUpdateQueryFixtureFactory.get();

          gameSetupUpdateQueryFixture.id =
            gameSetupDbInserted._id.toHexString();

          result = await gameSetupDbUpdateRepository.updateAndSelect(
            gameSetupUpdateQueryFixture,
          );
        });

        afterAll(async () => {
          await collection.deleteMany({});
        });

        it('must return no games', () => {
          expect(result).toHaveProperty('length');
          expect(result).toHaveLength(0);
        });
      });

      describe('when called, with a query with removePlayerSetups with a non existing player setup', () => {
        let gameSetupDbInserted: GameSetupDb;
        let gameSetupUpdateQueryFixture: GameSetupUpdateQuery;

        let result: unknown;

        beforeAll(async () => {
          await collection.deleteMany({});

          // eslint-disable-next-line @typescript-eslint/typedef
          [gameSetupDbInserted] = (
            await collection.insertMany([
              {
                format: gameSetupFixtureFactory.get().format,
                ownerUserId: gameSetupFixtureFactory.get().ownerUserId,
                playerSetups: gameSetupFixtureFactory.get().playerSetups,
                playerSlots: gameSetupFixtureFactory.get().playerSlots,
              },
            ])
          ).ops as GameSetupDb[] & [GameSetupDb];

          const childContainer: Container = container.createChild();

          const gameSetupDbUpdateRepository: GameSetupDbUpdateRepository =
            childContainer.get(
              GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_UPDATE_REPOSITORY,
            );

          gameSetupUpdateQueryFixture =
            gameSetupUpdateQueryFixtureFactory.get();

          gameSetupUpdateQueryFixture.id =
            gameSetupDbInserted._id.toHexString();

          const removePlayerSetupUserId: string = (
            gameSetupUpdateQueryFixture.removePlayerSetups as PlayerSetup[] &
              [PlayerSetup]
          )[0].userId;

          (
            gameSetupUpdateQueryFixture.removePlayerSetups as PlayerSetup[] &
              [PlayerSetup]
          )[0].userId = (parseInt(removePlayerSetupUserId, 16) + 1).toString(
            16,
          );

          result = await gameSetupDbUpdateRepository.updateAndSelect(
            gameSetupUpdateQueryFixture,
          );
        });

        afterAll(async () => {
          await collection.deleteMany({});
        });

        it('must return no games', () => {
          expect(result).toHaveProperty('length');
          expect(result).toHaveLength(0);
        });
      });
    });

    describe('.updateOneAndSelect()', () => {
      let collection: mongodb.Collection<GameSetupDb>;
      let gameSetupDbUpdateRepository: GameSetupDbUpdateRepository;

      beforeAll(() => {
        const collectionName: string = 'gameSetupIntegrationUpdateAndSelect';

        collection = (outputParam.elem as MongoDbConnector).db.collection(
          collectionName,
        );

        const childContainer: Container = container.createChild();

        childContainer
          .bind(
            GAME_ADAPTER_TYPES.db.collection.setup.GAME_SETUP_COLLECTION_NAME,
          )
          .toConstantValue(collectionName);

        gameSetupDbUpdateRepository = childContainer.get(
          GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_UPDATE_REPOSITORY,
        );
      });

      describe('when called', () => {
        let gameSetupDbInserted: GameSetupDb;
        let gameSetupUpdateQueryFixture: GameSetupUpdateQuery;

        let result: unknown;

        beforeAll(async () => {
          await collection.deleteMany({});

          // eslint-disable-next-line @typescript-eslint/typedef
          [gameSetupDbInserted] = (
            await collection.insertMany([
              {
                format: gameSetupFixtureFactory.get().format,
                ownerUserId: gameSetupFixtureFactory.get().ownerUserId,
                playerSetups: gameSetupFixtureFactory.get().playerSetups,
                playerSlots: gameSetupFixtureFactory.get().playerSlots,
              },
            ])
          ).ops as GameSetupDb[] & [GameSetupDb];

          gameSetupUpdateQueryFixture =
            gameSetupUpdateQueryFixtureFactory.get();

          gameSetupUpdateQueryFixture.id =
            gameSetupDbInserted._id.toHexString();

          const additionalPlayerSetupUserId: string = (
            gameSetupUpdateQueryFixture.additionalPlayerSetups as PlayerSetup[] &
              [PlayerSetup]
          )[0].userId;

          (
            gameSetupUpdateQueryFixture.additionalPlayerSetups as PlayerSetup[] &
              [PlayerSetup]
          )[0].userId = (
            parseInt(additionalPlayerSetupUserId, 16) + 1
          ).toString(16);

          result = await gameSetupDbUpdateRepository.updateOneAndSelect(
            gameSetupUpdateQueryFixture,
          );
        });

        afterAll(async () => {
          await collection.deleteMany({});
        });

        it('must return the game setup updated', () => {
          expect((result as GameSetup).id).toBe(
            gameSetupDbInserted._id.toHexString(),
          );

          expect((result as GameSetup).playerSetups).toEqual(
            gameSetupUpdateQueryFixture.additionalPlayerSetups,
          );
        });
      });

      describe('when called, with a query with additionalPlayerSetups with an existing player setup', () => {
        let gameSetupDbInserted: GameSetupDb;
        let gameSetupUpdateQueryFixture: GameSetupUpdateQuery;

        let result: unknown;

        beforeAll(async () => {
          await collection.deleteMany({});

          // eslint-disable-next-line @typescript-eslint/typedef
          [gameSetupDbInserted] = (
            await collection.insertMany([
              {
                format: gameSetupFixtureFactory.get().format,
                ownerUserId: gameSetupFixtureFactory.get().ownerUserId,
                playerSetups: gameSetupFixtureFactory.get().playerSetups,
                playerSlots: gameSetupFixtureFactory.get().playerSlots,
              },
            ])
          ).ops as GameSetupDb[] & [GameSetupDb];

          const childContainer: Container = container.createChild();

          const gameSetupDbUpdateRepository: GameSetupDbUpdateRepository =
            childContainer.get(
              GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_UPDATE_REPOSITORY,
            );

          gameSetupUpdateQueryFixture =
            gameSetupUpdateQueryFixtureFactory.get();

          gameSetupUpdateQueryFixture.id =
            gameSetupDbInserted._id.toHexString();

          result = await gameSetupDbUpdateRepository.updateOneAndSelect(
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
        let gameSetupDbInserted: GameSetupDb;
        let gameSetupUpdateQueryFixture: GameSetupUpdateQuery;

        let result: unknown;

        beforeAll(async () => {
          await collection.deleteMany({});

          // eslint-disable-next-line @typescript-eslint/typedef
          [gameSetupDbInserted] = (
            await collection.insertMany([
              {
                format: gameSetupFixtureFactory.get().format,
                ownerUserId: gameSetupFixtureFactory.get().ownerUserId,
                playerSetups: gameSetupFixtureFactory.get().playerSetups,
                playerSlots: gameSetupFixtureFactory.get().playerSlots,
              },
            ])
          ).ops as GameSetupDb[] & [GameSetupDb];

          const childContainer: Container = container.createChild();

          const gameSetupDbUpdateRepository: GameSetupDbUpdateRepository =
            childContainer.get(
              GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_UPDATE_REPOSITORY,
            );

          gameSetupUpdateQueryFixture =
            gameSetupUpdateQueryFixtureFactory.get();

          gameSetupUpdateQueryFixture.id =
            gameSetupDbInserted._id.toHexString();

          const removePlayerSetupUserId: string = (
            gameSetupUpdateQueryFixture.removePlayerSetups as PlayerSetup[] &
              [PlayerSetup]
          )[0].userId;

          (
            gameSetupUpdateQueryFixture.removePlayerSetups as PlayerSetup[] &
              [PlayerSetup]
          )[0].userId = (parseInt(removePlayerSetupUserId, 16) + 1).toString(
            16,
          );

          result = await gameSetupDbUpdateRepository.updateOneAndSelect(
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
