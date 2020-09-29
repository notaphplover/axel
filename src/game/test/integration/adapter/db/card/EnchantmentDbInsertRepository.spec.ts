import 'reflect-metadata';
import mongoose, { Document, Model } from 'mongoose';
import { Container } from 'inversify';
import { Enchantment } from '../../../../../domain/model/card/Enchantment';
import { EnchantmentCreationQuery } from '../../../../../domain/query/card/EnchantmentCreationQuery';
import { EnchantmentDb } from '../../../../../adapter/db/model/card/EnchantmentDb';
import { EnchantmentDbInsertRepository } from '../../../../../adapter/db/repository/card/EnchantmentDbInsertRepository';
import { GAME_ADAPTER_TYPES } from '../../../../../adapter/config/types';
import { GAME_DOMAIN_TYPES } from '../../../../../domain/config/types';
import { InsertRepository } from '../../../../../../layer-modules/db/domain';
import { configAdapter } from '../../../../../../layer-modules/config/adapter';
import { dbTest } from '../../../../../../layer-modules/db/test';
import { enchantmentCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/fixtures';
import { enchantmentDbSchema } from '../../../../../adapter/db/model/card/EnchantmentDb';
import { enchantmentFixtureFactory } from '../../../../fixtures/domain/model/fixtures';

const container: Container = configAdapter.container;

const mongooseIntegrationDescribe: jest.Describe =
  dbTest.integration.utils.mongooseIntegrationDescribe;

async function clearCollection<T extends Document>(
  model: Model<T>,
): Promise<void> {
  await model.deleteMany({});
}

function createEnchantmentMongooseModelMock(
  alias: string,
): Model<EnchantmentDb> {
  return mongoose.model<EnchantmentDb>(alias, enchantmentDbSchema, alias);
}

function injectEnchantmentMongooseModelMock(
  container: Container,
  model: Model<EnchantmentDb>,
): void {
  container
    .bind(GAME_ADAPTER_TYPES.db.model.card.ENCHANTMENT_DB_MODEL)
    .toConstantValue(model);
}

mongooseIntegrationDescribe(EnchantmentDbInsertRepository.name, () => {
  describe('.insert()', () => {
    describe('when called', () => {
      let enchantmentModelMock: Model<EnchantmentDb>;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string = 'EnchantmentDbInsertRepositoryModel';

        enchantmentModelMock = createEnchantmentMongooseModelMock(
          collectionName,
        );

        await clearCollection(enchantmentModelMock);

        const childContainer: Container = container.createChild();
        injectEnchantmentMongooseModelMock(
          childContainer,
          enchantmentModelMock,
        );

        const enchantmentDbInsertRepository: InsertRepository<
          Enchantment,
          EnchantmentCreationQuery
        > = childContainer.get(
          GAME_DOMAIN_TYPES.repository.card.ENCHANTMENT_INSERT_REPOSITORY,
        );

        result = await enchantmentDbInsertRepository.insert(
          enchantmentCreationQueryFixtureFactory.get(),
        );
      });

      afterAll(async () => {
        await clearCollection(enchantmentModelMock);
      });

      it('must return the enchantment created', () => {
        expect(result).toHaveProperty('length');
        expect((result as unknown[]).length).toBe(1);

        const [innerResult]: unknown[] = result as unknown[];

        expect((innerResult as Enchantment).cost).toStrictEqual(
          enchantmentFixtureFactory.get().cost,
        );
        expect((innerResult as Enchantment).type).toStrictEqual(
          enchantmentFixtureFactory.get().type,
        );
      });
    });
  });
});
