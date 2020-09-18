import 'reflect-metadata';
import {
  CardDb,
  cardDbSchema,
} from '../../../../../adapter/db/model/card/CardDb';
import {
  artifactFixtureFactory,
  creatureFixtureFactory,
  enchantmentFixtureFactory,
  landFixtureFactory,
} from '../../../../fixtures/domain/model/fixtures';
import mongoose, { Document, Model } from 'mongoose';
import { Artifact } from '../../../../../domain/model/card/Artifact';
import { ArtifactDb } from '../../../../../adapter/db/model/card/ArtifactDb';
import { Card } from '../../../../../domain/model/card/Card';
import { CardDbSearchRepository } from '../../../../../adapter/db/repository/card/CardDbSearchRepository';
import { CardFindQuery } from '../../../../../domain/query/card/CardFindQuery';
import { Container } from 'inversify';
import { Creature } from '../../../../../domain/model/card/Creature';
import { CreatureDb } from '../../../../../adapter/db/model/card/CreatureDb';
import { Enchantment } from '../../../../../domain/model/card/Enchantment';
import { EnchantmentDb } from '../../../../../adapter/db/model/card/EnchantmentDb';
import { GAME_ADAPTER_TYPES } from '../../../../../adapter/config/types';
import { GAME_DOMAIN_TYPES } from '../../../../../domain/config/types';
import { Land } from '../../../../../domain/model/card/Land';
import { LandDb } from '../../../../../adapter/db/model/card/LandDb';
import { SearchRepository } from '../../../../../../layer-modules/db/domain';
import { container } from '../../../../../../common/adapter/config/container';
import { dbTest } from '../../../../../../layer-modules/db/test';

const mongooseIntegrationDescribe: jest.Describe =
  dbTest.integration.utils.mongooseIntegrationDescribe;

async function clearCollection<T extends Document>(
  model: Model<T>,
): Promise<void> {
  await model.deleteMany({});
}

function createCardMongooseModelMock(alias: string): Model<CardDb> {
  return mongoose.model<CardDb>(alias, cardDbSchema, alias);
}

function injectCardMongooseModelMock(
  container: Container,
  model: Model<CardDb>,
): void {
  container
    .bind(GAME_ADAPTER_TYPES.db.model.card.CARD_DB_MODEL)
    .toConstantValue(model);
}

mongooseIntegrationDescribe(CardDbSearchRepository.name, () => {
  describe('.find()', () => {
    describe('when called and some cards satisfies the query', () => {
      let cardModelMock: Model<CardDb>;

      let cardDbSearchRepository: SearchRepository<Card, CardFindQuery>;

      beforeAll(async () => {
        const collectionName: string = 'CardDbSearchRepositoryModel';

        cardModelMock = createCardMongooseModelMock(collectionName);

        await clearCollection(cardModelMock);

        const childContainer: Container = container.createChild();
        injectCardMongooseModelMock(childContainer, cardModelMock);

        cardDbSearchRepository = childContainer.get(
          GAME_DOMAIN_TYPES.repository.card.CARD_SEARCH_REPOSITORY,
        );
      });

      afterAll(async () => {
        await clearCollection(cardModelMock);
      });

      describe('when the cards are artifacts', () => {
        let artifactDbInserted: ArtifactDb;

        let artifactResult: unknown;

        beforeAll(async () => {
          // eslint-disable-next-line @typescript-eslint/typedef
          [artifactDbInserted] = (await cardModelMock.insertMany([
            new cardModelMock({
              cost: artifactFixtureFactory.get().cost,
              type: artifactFixtureFactory.get().type,
            }),
          ])) as [ArtifactDb];

          const artifactCardFindQueryFixture: CardFindQuery = {
            id: artifactDbInserted._id.toHexString(),
          };

          artifactResult = await cardDbSearchRepository.find(
            artifactCardFindQueryFixture,
          );
        });

        it('must return the artifact cards', () => {
          expect(artifactResult).toHaveProperty('length');
          expect((artifactResult as Array<unknown>).length).toBe(1);

          const [cardResult]: unknown[] = artifactResult as unknown[];

          expect((cardResult as Artifact).id).toStrictEqual(
            artifactDbInserted._id.toHexString(),
          );
          expect((cardResult as Artifact).cost).toStrictEqual(
            artifactDbInserted.cost,
          );
          expect((cardResult as Artifact).type).toBe(artifactDbInserted.type);
        });
      });

      describe('when the cards are creatures', () => {
        let creatureDbInserted: CreatureDb;

        let creatureResult: unknown;

        beforeAll(async () => {
          // eslint-disable-next-line @typescript-eslint/typedef
          [creatureDbInserted] = (await cardModelMock.insertMany([
            new cardModelMock({
              cost: creatureFixtureFactory.get().cost,
              power: creatureFixtureFactory.get().power,
              toughness: creatureFixtureFactory.get().toughness,
              type: creatureFixtureFactory.get().type,
            }),
          ])) as [CreatureDb];

          const creatureCardFindQueryFixture: CardFindQuery = {
            id: creatureDbInserted._id.toHexString(),
          };

          creatureResult = await cardDbSearchRepository.find(
            creatureCardFindQueryFixture,
          );
        });

        it('must return the creature cards', () => {
          expect(creatureResult).toHaveProperty('length');
          expect((creatureResult as Array<unknown>).length).toBe(1);

          const [cardResult]: unknown[] = creatureResult as unknown[];

          expect((cardResult as Creature).id).toStrictEqual(
            creatureDbInserted._id.toHexString(),
          );
          expect((cardResult as Creature).cost).toStrictEqual(
            creatureDbInserted.cost,
          );
          expect((cardResult as Creature).power).toStrictEqual(
            creatureDbInserted.power,
          );
          expect((cardResult as Creature).toughness).toStrictEqual(
            creatureDbInserted.toughness,
          );
          expect((cardResult as Creature).type).toBe(creatureDbInserted.type);
        });
      });

      describe('when the cards are enchantments', () => {
        let enchantmentDbInserted: EnchantmentDb;

        let enchantmentResult: unknown;

        beforeAll(async () => {
          // eslint-disable-next-line @typescript-eslint/typedef
          [enchantmentDbInserted] = (await cardModelMock.insertMany([
            new cardModelMock({
              cost: enchantmentFixtureFactory.get().cost,
              type: enchantmentFixtureFactory.get().type,
            }),
          ])) as [EnchantmentDb];

          const enchantmentCardFindQueryFixture: CardFindQuery = {
            id: enchantmentDbInserted._id.toHexString(),
          };

          enchantmentResult = await cardDbSearchRepository.find(
            enchantmentCardFindQueryFixture,
          );
        });

        it('must return the enchantment cards', () => {
          expect(enchantmentResult).toHaveProperty('length');
          expect((enchantmentResult as Array<unknown>).length).toBe(1);

          const [cardResult]: unknown[] = enchantmentResult as unknown[];

          expect((cardResult as Enchantment).id).toStrictEqual(
            enchantmentDbInserted._id.toHexString(),
          );
          expect((cardResult as Enchantment).cost).toStrictEqual(
            enchantmentDbInserted.cost,
          );
          expect((cardResult as Enchantment).type).toBe(
            enchantmentDbInserted.type,
          );
        });
      });

      describe('when the cards are lands', () => {
        let landDbInserted: LandDb;

        let landResult: unknown;

        beforeAll(async () => {
          // eslint-disable-next-line @typescript-eslint/typedef
          [landDbInserted] = (await cardModelMock.insertMany([
            new cardModelMock({
              cost: landFixtureFactory.get().cost,
              type: landFixtureFactory.get().type,
            }),
          ])) as [LandDb];

          const landCardFindQueryFixture: CardFindQuery = {
            id: landDbInserted._id.toHexString(),
          };

          landResult = await cardDbSearchRepository.find(
            landCardFindQueryFixture,
          );
        });

        it('must return the artifact cards', () => {
          expect(landResult).toHaveProperty('length');
          expect((landResult as Array<unknown>).length).toBe(1);

          const [cardResult]: unknown[] = landResult as unknown[];

          expect((cardResult as Land).id).toStrictEqual(
            landDbInserted._id.toHexString(),
          );
          expect((cardResult as Land).cost).toStrictEqual(landDbInserted.cost);
          expect((cardResult as Land).type).toBe(landDbInserted.type);
        });
      });
    });
  });
});
