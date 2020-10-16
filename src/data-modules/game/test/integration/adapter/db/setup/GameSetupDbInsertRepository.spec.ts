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
import { GameSetupCreationQuery } from '../../../../../domain/query/setup/GameSetupCreationQuery';
import { GameSetupDbInsertRepository } from '../../../../../adapter/db/repository/setup/GameSetupDbInsertRepository';
import { InsertRepository } from '../../../../../../../layer-modules/db/domain';
import { configAdapter } from '../../../../../../../layer-modules/config/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { gameSetupCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';
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

function injectGameSetupMongooseModelMock(
  container: Container,
  model: Model<GameSetupDb>,
): void {
  container
    .bind(GAME_ADAPTER_TYPES.db.model.setup.GAME_SETUP_DB_MODEL)
    .toConstantValue(model);
}

mongooseIntegrationDescribe(GameSetupDbInsertRepository.name, () => {
  describe('.insert()', () => {
    describe('when called', () => {
      let gameSetupModelMock: Model<GameSetupDb>;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string = 'GameSetupDbInsertRepositoryModel';

        gameSetupModelMock = createGameSetupMongooseModelMock(collectionName);

        await clearCollection(gameSetupModelMock);

        const childContainer: Container = container.createChild();
        injectGameSetupMongooseModelMock(childContainer, gameSetupModelMock);

        const gameSetupDbInsertRepository: InsertRepository<
          GameSetup,
          GameSetupCreationQuery
        > = childContainer.get(
          GAME_DOMAIN_TYPES.repository.setup.GAME_SETUP_INSERT_REPOSITORY,
        );

        result = await gameSetupDbInsertRepository.insert(
          gameSetupCreationQueryFixtureFactory.get(),
        );
      });

      afterAll(async () => {
        await clearCollection(gameSetupModelMock);
      });

      it('must return the game setup created', () => {
        expect(result).toHaveProperty('length');
        expect((result as unknown[]).length).toBe(1);

        const [innerResult]: unknown[] = result as unknown[];

        expect((innerResult as GameSetup).format).toStrictEqual(
          gameSetupFixtureFactory.get().format,
        );
        expect((innerResult as GameSetup).playerSetups).toEqual(
          gameSetupFixtureFactory.get().playerSetups,
        );
        expect((innerResult as GameSetup).playerSlots).toStrictEqual(
          gameSetupFixtureFactory.get().playerSlots,
        );
      });
    });
  });
});
