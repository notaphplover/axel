import 'reflect-metadata';
import mongoose, { Document, Model } from 'mongoose';
import { Container } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../../../../adapter/config/types';
import { GAME_DOMAIN_TYPES } from '../../../../../domain/config/types';
import { InsertRepository } from '../../../../../../../layer-modules/db/domain';
import { Land } from '../../../../../domain/model/card/Land';
import { LandCreationQuery } from '../../../../../domain/query/card/LandCreationQuery';
import { LandDb } from '../../../../../adapter/db/model/card/LandDb';
import { LandDbInsertRepository } from '../../../../../adapter/db/repository/card/LandDbInsertRepository';
import { configAdapter } from '../../../../../../../layer-modules/config/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { landCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/fixtures';
import { landDbSchema } from '../../../../../adapter/db/model/card/LandDb';
import { landFixtureFactory } from '../../../../fixtures/domain/model/fixtures';

const container: Container = configAdapter.container;

const mongooseIntegrationDescribe: jest.Describe =
  dbTest.integration.utils.mongooseIntegrationDescribe;

async function clearCollection<T extends Document>(
  model: Model<T>,
): Promise<void> {
  await model.deleteMany({});
}

function createLandMongooseModelMock(alias: string): Model<LandDb> {
  return mongoose.model<LandDb>(alias, landDbSchema, alias);
}

function injectLandMongooseModelMock(
  container: Container,
  model: Model<LandDb>,
): void {
  container
    .bind(GAME_ADAPTER_TYPES.db.model.card.LAND_DB_MODEL)
    .toConstantValue(model);
}

mongooseIntegrationDescribe(LandDbInsertRepository.name, () => {
  describe('.insert()', () => {
    describe('when called', () => {
      let landModelMock: Model<LandDb>;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string = 'LandDbInsertRepositoryModel';

        landModelMock = createLandMongooseModelMock(collectionName);

        await clearCollection(landModelMock);

        const childContainer: Container = container.createChild();
        injectLandMongooseModelMock(childContainer, landModelMock);

        const landDbInsertRepository: InsertRepository<
          Land,
          LandCreationQuery
        > = childContainer.get(
          GAME_DOMAIN_TYPES.repository.card.LAND_INSERT_REPOSITORY,
        );

        result = await landDbInsertRepository.insert(
          landCreationQueryFixtureFactory.get(),
        );
      });

      afterAll(async () => {
        await clearCollection(landModelMock);
      });

      it('must return the land created', () => {
        expect(result).toHaveProperty('length');
        expect((result as unknown[]).length).toBe(1);

        const [innerResult]: unknown[] = result as unknown[];

        expect((innerResult as Land).cost).toStrictEqual(
          landFixtureFactory.get().cost,
        );
        expect((innerResult as Land).detail).toStrictEqual(
          landFixtureFactory.get().detail,
        );
        expect((innerResult as Land).type).toStrictEqual(
          landFixtureFactory.get().type,
        );
      });
    });
  });
});
