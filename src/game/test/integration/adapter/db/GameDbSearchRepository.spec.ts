import 'reflect-metadata';
import { GameDb, gameDbSchema } from '../../../../adapter/db/model/GameDb';
import mongoose, { Document, Model } from 'mongoose';
import { Container } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../../../adapter/config/types';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { Game } from '../../../../domain/model/Game';
import { GameDbSearchReporitory } from '../../../../adapter/db/repository/GameDbSearchRepository';
import { GameFindQuery } from '../../../../domain/query/GameFindQuery';
import { SearchRepository } from '../../../../../layer-modules/db/domain';
import { configAdapter } from '../../../../../layer-modules/config';
import { dbTest } from '../../../../../layer-modules/db/test';
import { gameFindQueryFixtureFactory } from '../../../fixtures/domain/query/fixtures';
import { gameFixtureFactory } from '../../../fixtures/domain/model/fixtures';

const container: Container = configAdapter.container;

const mongooseIntegrationDescribe: jest.Describe =
  dbTest.integration.utils.mongooseIntegrationDescribe;

async function clearCollection<T extends Document>(
  model: Model<T>,
): Promise<void> {
  await model.deleteMany({});
}

function createGameMongooseModelMock(alias: string): Model<GameDb> {
  return mongoose.model<GameDb>(alias, gameDbSchema, alias);
}

function injectGameMongooseModelMock(
  container: Container,
  model: Model<GameDb>,
): void {
  container
    .bind(GAME_ADAPTER_TYPES.db.model.GAME_DB_MODEL)
    .toConstantValue(model);
}

mongooseIntegrationDescribe(GameDbSearchReporitory.name, () => {
  describe('.find()', () => {
    describe('when called and some games satisfies the query', () => {
      let gameModelMock: Model<GameDb>;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string = 'GameDbSearchRepositoryModelSuccess';

        gameModelMock = createGameMongooseModelMock(collectionName);

        await clearCollection(gameModelMock);

        const [gameDbInserted]: GameDb[] = await gameModelMock.insertMany([
          new gameModelMock({
            round: gameFixtureFactory.get().round,
          }),
        ]);

        const childContainer: Container = container.createChild();
        injectGameMongooseModelMock(childContainer, gameModelMock);

        const gameDbSearchRepository: SearchRepository<
          Game,
          GameFindQuery
        > = childContainer.get(
          GAME_DOMAIN_TYPES.repository.GAME_SEARCH_REPOSITORY,
        );

        const gameFindQueryFixture: GameFindQuery = gameFindQueryFixtureFactory.get();
        gameFindQueryFixture.id = gameDbInserted._id.toHexString();

        result = await gameDbSearchRepository.find(gameFindQueryFixture);
      });

      afterAll(async () => {
        await clearCollection(gameModelMock);
      });

      it('must return the games', () => {
        const expectedGameResult: Game = gameFixtureFactory.get();

        expect(result).toHaveProperty('length');
        expect((result as Array<unknown>).length).toBe(1);

        const [gameResult]: unknown[] = result as unknown[];

        expect((gameResult as Game).round).toBe(expectedGameResult.round);
      });
    });

    describe('when called and no game satisfies the query', () => {
      let gameModelMock: Model<GameDb>;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string = 'GameDbSearchRepositoryModelFail';

        gameModelMock = createGameMongooseModelMock(collectionName);

        await clearCollection(gameModelMock);

        const childContainer: Container = container.createChild();
        injectGameMongooseModelMock(childContainer, gameModelMock);

        const gameDbSearchRepository: SearchRepository<
          Game,
          GameFindQuery
        > = childContainer.get(
          GAME_DOMAIN_TYPES.repository.GAME_SEARCH_REPOSITORY,
        );

        result = await gameDbSearchRepository.find(
          gameFindQueryFixtureFactory.get(),
        );
      });

      afterAll(async () => {
        await clearCollection(gameModelMock);
      });

      it('must return no game', () => {
        expect(result).toHaveProperty('length');
        expect((result as Array<unknown>).length).toBe(0);
      });
    });
  });
});
