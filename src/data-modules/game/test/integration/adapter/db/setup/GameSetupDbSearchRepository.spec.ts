import 'reflect-metadata';
import {
  GameSetupDb,
  gameSetupDbSchema,
} from '../../../../../adapter/db/model/setup/GameSetupDb';
import mongoose, { Document, Model } from 'mongoose';
import { Container } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../../../../adapter/config/types';
import { GAME_DOMAIN_TYPES } from '../../../../../domain/config/types';
import { GameSetup } from '../../../../../domain/model/setup/GameSetup';
import { GameSetupDbSearchRepository } from '../../../../../adapter/db/repository/setup/GameSetupDbSearchRepository';
import { GameSetupFindQuery } from '../../../../../domain/query/setup/GameSetupFindQuery';
import { SearchRepository } from '../../../../../../../layer-modules/db/domain';
import { configAdapter } from '../../../../../../../layer-modules/config/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { gameSetupFindQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';
import { gameSetupFixtureFactory } from '../../../../fixtures/domain/model/setup';

const container: Container = configAdapter.container;

const mongooseIntegrationDescribe: jest.Describe =
  dbTest.integration.utils.mongooseIntegrationDescribe;

async function clearCollection<T extends Document>(
  model: Model<T>,
): Promise<void> {
  await model.deleteMany({});
}

function createGameSetupMongooseModelMock(alias: string): Model<GameSetupDb> {
  return mongoose.model<GameSetupDb>(alias, gameSetupDbSchema, alias);
}

function injectGameMongooseModelMock(
  container: Container,
  model: Model<GameSetupDb>,
): void {
  container
    .bind(GAME_ADAPTER_TYPES.db.model.setup.GAME_SETUP_DB_MODEL)
    .toConstantValue(model);
}

mongooseIntegrationDescribe(GameSetupDbSearchRepository.name, () => {
  describe('.find()', () => {
    describe('when called and some game setups satisfies the query', () => {
      let gameSetupModelMock: Model<GameSetupDb>;
      let gameSetupFindQueryFixture: GameSetupFindQuery;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string =
          'GameSetupDbSearchRepositoryModelSuccess';

        gameSetupModelMock = createGameSetupMongooseModelMock(collectionName);

        await clearCollection(gameSetupModelMock);

        const [
          gameSetupDbInserted,
        ]: GameSetupDb[] = await gameSetupModelMock.insertMany([
          new gameSetupModelMock({
            format: gameSetupFixtureFactory.get().format,
            ownerUserId: gameSetupFixtureFactory.get().ownerUserId,
            playerSetups: gameSetupFixtureFactory.get().playerSetups,
            playerSlots: gameSetupFixtureFactory.get().playerSlots,
          }),
        ]);

        const childContainer: Container = container.createChild();
        injectGameMongooseModelMock(childContainer, gameSetupModelMock);

        const gameSetupDbSearchRepository: SearchRepository<
          GameSetup,
          GameSetupFindQuery
        > = childContainer.get(
          GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_SEARCH_REPOSITORY,
        );

        gameSetupFindQueryFixture = gameSetupFindQueryFixtureFactory.get();
        gameSetupFindQueryFixture.id = gameSetupDbInserted._id.toHexString();

        result = await gameSetupDbSearchRepository.find(
          gameSetupFindQueryFixture,
        );
      });

      afterAll(async () => {
        await clearCollection(gameSetupModelMock);
      });

      it('must return the game setups', () => {
        const expectedGameSetupResult: GameSetup = gameSetupFixtureFactory.get();
        expectedGameSetupResult.id = gameSetupFindQueryFixture.id as string;

        expect(result).toHaveProperty('length');
        expect((result as Array<unknown>).length).toBe(1);

        const [gameResult]: unknown[] = result as unknown[];

        expect(gameResult as GameSetup).toEqual(expectedGameSetupResult);
      });
    });

    describe('when called and no game setup satisfies the query', () => {
      let gameSetupModelMock: Model<GameSetupDb>;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string = 'GameSetupDbSearchRepositoryModelFail';

        gameSetupModelMock = createGameSetupMongooseModelMock(collectionName);

        await clearCollection(gameSetupModelMock);

        const childContainer: Container = container.createChild();
        injectGameMongooseModelMock(childContainer, gameSetupModelMock);

        const gameSetupDbSearchRepository: SearchRepository<
          GameSetup,
          GameSetupFindQuery
        > = childContainer.get(
          GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_SEARCH_REPOSITORY,
        );

        result = await gameSetupDbSearchRepository.find(
          gameSetupFindQueryFixtureFactory.get(),
        );
      });

      afterAll(async () => {
        await clearCollection(gameSetupModelMock);
      });

      it('must return no game', () => {
        expect(result).toHaveProperty('length');
        expect((result as Array<unknown>).length).toBe(0);
      });
    });
  });
});
