import 'reflect-metadata';
import {
  ExtendedGameSetupDb,
  extendedGameSetupDbSchema,
} from '../../../../../adapter/db/model/setup/ExtendedGameSetupDb';
import mongoose, { Document, Model } from 'mongoose';
import { Container } from 'inversify';
import { ExtendedGameSetup } from '../../../../../domain/model/setup/ExtendedGameSetup';
import { ExtendedGameSetupDbInsertRepository } from '../../../../../adapter/db/repository/setup/ExtendedGameSetupDbInsertRepository';
import { GAME_ADAPTER_TYPES } from '../../../../../adapter/config/types';
import { GAME_DOMAIN_TYPES } from '../../../../../domain/config/types';
import { GameSetupsCreationQuery } from '../../../../../domain/query/setup/GameSetupCreationQuery';
import { InsertRepository } from '../../../../../../../layer-modules/db/domain';
import { configAdapter } from '../../../../../../../layer-modules/config/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { extendedGameSetupFixtureFactory } from '../../../../fixtures/domain/model/setup';
import { gameSetupsCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';

const container: Container = configAdapter.container;

const mongooseIntegrationDescribe: jest.Describe =
  dbTest.integration.utils.mongooseIntegrationDescribe;

async function clearCollection<T extends Document>(
  model: Model<T>,
): Promise<void> {
  await model.deleteMany({});
}

function createExtendedGameSetupMongooseModelMock(
  alias: string,
): Model<ExtendedGameSetupDb> {
  return mongoose.model<ExtendedGameSetupDb>(
    alias,
    extendedGameSetupDbSchema,
    alias,
  );
}

function injectExtendedGameSetupMongooseModelMock(
  container: Container,
  model: Model<ExtendedGameSetupDb>,
): void {
  container
    .bind(GAME_ADAPTER_TYPES.db.model.setup.EXTENDED_GAME_SETUP_DB_MODEL)
    .toConstantValue(model);
}

mongooseIntegrationDescribe(ExtendedGameSetupDbInsertRepository.name, () => {
  describe('.insert()', () => {
    describe('when called', () => {
      let extendedGameSetupModelMock: Model<ExtendedGameSetupDb>;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string =
          'ExtendedGameSetupDbInsertRepositoryModel';

        extendedGameSetupModelMock = createExtendedGameSetupMongooseModelMock(
          collectionName,
        );

        await clearCollection(extendedGameSetupModelMock);

        const childContainer: Container = container.createChild();
        injectExtendedGameSetupMongooseModelMock(
          childContainer,
          extendedGameSetupModelMock,
        );

        const extendedGameSetupDbInsertRepository: InsertRepository<
          ExtendedGameSetup,
          GameSetupsCreationQuery
        > = childContainer.get(
          GAME_DOMAIN_TYPES.repository.setup
            .EXTENDED_GAME_SETUP_INSERT_REPOSITORY,
        );

        result = await extendedGameSetupDbInsertRepository.insert(
          gameSetupsCreationQueryFixtureFactory.get(),
        );
      });

      afterAll(async () => {
        await clearCollection(extendedGameSetupModelMock);
      });

      it('must return the game setup created', () => {
        expect(result).toHaveProperty('length');
        expect((result as unknown[]).length).toBe(1);

        const [innerResult]: unknown[] = result as unknown[];

        expect((innerResult as ExtendedGameSetup).format).toStrictEqual(
          extendedGameSetupFixtureFactory.get().format,
        );
        expect((innerResult as ExtendedGameSetup).playerSetups).toEqual(
          extendedGameSetupFixtureFactory.get().playerSetups,
        );
        expect((innerResult as ExtendedGameSetup).playerSlots).toStrictEqual(
          extendedGameSetupFixtureFactory.get().playerSlots,
        );
      });
    });
  });
});
