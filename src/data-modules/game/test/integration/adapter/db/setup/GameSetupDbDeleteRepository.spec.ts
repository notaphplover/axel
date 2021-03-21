import 'reflect-metadata';
import { Container } from 'inversify';
import mongodb from 'mongodb';

import { Capsule } from '../../../../../../../common/domain';
import { MongoDbConnector } from '../../../../../../../integration-modules/mongodb/adapter';
import { configAdapter } from '../../../../../../../layer-modules/config/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { GAME_ADAPTER_TYPES } from '../../../../../adapter/config/types';
import { GameSetupDb } from '../../../../../adapter/db/model/setup/GameSetupDb';
import { GameSetupDbDeleteRepository } from '../../../../../adapter/db/repository/setup/GameSetupDbDeleteRepository';
import { GAME_DOMAIN_TYPES } from '../../../../../domain/config/types';
import { GameSetupDeletionQuery } from '../../../../../domain/query/setup/GameSetupDeletionQuery';
import { gameSetupFixtureFactory } from '../../../../fixtures/domain/model/setup';

const container: Container = configAdapter.container;

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  GameSetupDbDeleteRepository.name,
  () => {
    describe('.delete()', () => {
      let collection: mongodb.Collection<GameSetupDb>;
      let gameSetupDbDeleteRepository: GameSetupDbDeleteRepository;

      beforeAll(() => {
        const collectionName: string =
          'gameSetupDbDeleteRepositoryIntegrationDelete';

        collection = (outputParam.elem as MongoDbConnector).db.collection(
          collectionName,
        );

        const childContainer: Container = container.createChild();

        childContainer
          .bind(
            GAME_ADAPTER_TYPES.db.collection.setup.GAME_SETUP_COLLECTION_NAME,
          )
          .toConstantValue(collectionName);

        gameSetupDbDeleteRepository = childContainer.get(
          GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_DELETE_REPOSITORY,
        );
      });

      describe('when called', () => {
        let gameSetupDbInserted: GameSetupDb;
        let gameSetupDbFoundAfterDeletion: GameSetupDb | null;
        let gameSetupDeleteQueryFixture: GameSetupDeletionQuery;

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

          gameSetupDeleteQueryFixture = {
            id: gameSetupDbInserted._id.toHexString(),
          };

          await gameSetupDbDeleteRepository.delete(gameSetupDeleteQueryFixture);

          const gameSetupFindQueryFixture: mongodb.FilterQuery<GameSetupDb> = {
            _id: gameSetupDbInserted._id,
          };

          gameSetupDbFoundAfterDeletion = await collection.findOne(
            gameSetupFindQueryFixture,
          );
        });

        afterAll(async () => {
          await collection.deleteMany({});
        });

        it('must delete the game setup created', () => {
          expect(gameSetupDbFoundAfterDeletion).toBeNull();
        });
      });
    });
  },
);
