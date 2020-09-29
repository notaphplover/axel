import 'reflect-metadata';
import mongoose, { Document, Model } from 'mongoose';
import { Container } from 'inversify';
import { Creature } from '../../../../../domain/model/card/Creature';
import { CreatureCreationQuery } from '../../../../../domain/query/card/CreatureCreationQuery';
import { CreatureDb } from '../../../../../adapter/db/model/card/CreatureDb';
import { CreatureDbInsertRepository } from '../../../../../adapter/db/repository/card/CreatureDbInsertRepository';
import { GAME_ADAPTER_TYPES } from '../../../../../adapter/config/types';
import { GAME_DOMAIN_TYPES } from '../../../../../domain/config/types';
import { InsertRepository } from '../../../../../../layer-modules/db/domain';
import { configAdapter } from '../../../../../../layer-modules/config';
import { creatureCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/fixtures';
import { creatureDbSchema } from '../../../../../adapter/db/model/card/CreatureDb';
import { creatureFixtureFactory } from '../../../../fixtures/domain/model/fixtures';
import { dbTest } from '../../../../../../layer-modules/db/test';

const container: Container = configAdapter.container;

const mongooseIntegrationDescribe: jest.Describe =
  dbTest.integration.utils.mongooseIntegrationDescribe;

async function clearCollection<T extends Document>(
  model: Model<T>,
): Promise<void> {
  await model.deleteMany({});
}

function createCreatureMongooseModelMock(alias: string): Model<CreatureDb> {
  return mongoose.model<CreatureDb>(alias, creatureDbSchema, alias);
}

function injectCreatureMongooseModelMock(
  container: Container,
  model: Model<CreatureDb>,
): void {
  container
    .bind(GAME_ADAPTER_TYPES.db.model.card.CREATURE_DB_MODEL)
    .toConstantValue(model);
}

mongooseIntegrationDescribe(CreatureDbInsertRepository.name, () => {
  describe('.insert()', () => {
    describe('when called', () => {
      let creatureModelMock: Model<CreatureDb>;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string = 'CreatureDbInsertRepositoryModel';

        creatureModelMock = createCreatureMongooseModelMock(collectionName);

        await clearCollection(creatureModelMock);

        const childContainer: Container = container.createChild();
        injectCreatureMongooseModelMock(childContainer, creatureModelMock);

        const creatureDbInsertRepository: InsertRepository<
          Creature,
          CreatureCreationQuery
        > = childContainer.get(
          GAME_DOMAIN_TYPES.repository.card.CREATURE_INSERT_REPOSITORY,
        );

        result = await creatureDbInsertRepository.insert(
          creatureCreationQueryFixtureFactory.get(),
        );
      });

      afterAll(async () => {
        await clearCollection(creatureModelMock);
      });

      it('must return the creature created', () => {
        expect(result).toHaveProperty('length');
        expect((result as unknown[]).length).toBe(1);

        const [innerResult]: unknown[] = result as unknown[];

        expect((innerResult as Creature).cost).toStrictEqual(
          creatureFixtureFactory.get().cost,
        );
        expect((innerResult as Creature).type).toStrictEqual(
          creatureFixtureFactory.get().type,
        );
        expect((innerResult as Creature).power).toStrictEqual(
          creatureFixtureFactory.get().power,
        );
        expect((innerResult as Creature).toughness).toStrictEqual(
          creatureFixtureFactory.get().toughness,
        );
      });
    });
  });
});
