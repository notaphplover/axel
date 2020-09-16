import 'reflect-metadata';
import { GameDb, gameDbSchema } from '../../../../adapter/db/model/GameDb';
import mongoose, { Document, Model } from 'mongoose';
import { Container } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../../../adapter/config/types';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { Game } from '../../../../domain/model/Game';
import { GameCreationQuery } from '../../../../domain/query/GameCreationQuery';
import { GameDbInsertRepository } from '../../../../adapter/db/repository/GameDbInsertRepository';
import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { container } from '../../../../../common/adapter/config/container';
import { dbTest } from '../../../../../layer-modules/db/test';
import { gameCreationQueryFixtureFactory } from '../../../fixtures/domain/query/fixtures';
import { gameFixtureFactory } from '../../../fixtures/domain/model/fixtures';

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

mongooseIntegrationDescribe(GameDbInsertRepository.name, () => {
  describe('.insert()', () => {
    describe('when called', () => {
      let gameModelMock: Model<GameDb>;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string = 'GameDbInsertRepositoryModel';

        gameModelMock = createGameMongooseModelMock(collectionName);

        await clearCollection(gameModelMock);

        const childContainer: Container = container.createChild();
        injectGameMongooseModelMock(childContainer, gameModelMock);

        const gameDbInsertRepository: InsertRepository<
          Game,
          GameCreationQuery
        > = childContainer.get(
          GAME_DOMAIN_TYPES.repository.GAME_INSERT_REPOSITORY,
        );

        result = await gameDbInsertRepository.insert(
          gameCreationQueryFixtureFactory.get(),
        );
      });

      afterAll(async () => {
        await clearCollection(gameModelMock);
      });

      it('must return the game created', () => {
        expect(result).toHaveProperty('length');
        expect((result as unknown[]).length).toBe(1);

        const [innerResult]: unknown[] = result as unknown[];

        expect((innerResult as Game).round).toStrictEqual(
          gameFixtureFactory.get().round,
        );
      });
    });
  });
});
