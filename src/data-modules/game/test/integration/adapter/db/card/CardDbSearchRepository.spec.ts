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
import { SearchRepository } from '../../../../../../../layer-modules/db/domain';
import { configAdapter } from '../../../../../../../layer-modules/config/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';

const container: Container = configAdapter.container;

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
          const artifactFixture: Artifact = artifactFixtureFactory.get();
          // eslint-disable-next-line @typescript-eslint/typedef
          [artifactDbInserted] = (await cardModelMock.insertMany([
            new cardModelMock({
              cost: artifactFixture.cost,
              detail: artifactFixture.detail,
              type: artifactFixture.type,
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
          expect((cardResult as Artifact).detail.description).toStrictEqual(
            artifactDbInserted.detail.description,
          );
          expect((cardResult as Artifact).detail.image).toStrictEqual(
            artifactDbInserted.detail.image,
          );
          expect((cardResult as Artifact).detail.title).toStrictEqual(
            artifactDbInserted.detail.title,
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
          const creatureFixture: Creature = creatureFixtureFactory.get();

          // eslint-disable-next-line @typescript-eslint/typedef
          [creatureDbInserted] = (await cardModelMock.insertMany([
            new cardModelMock({
              cost: creatureFixture.cost,
              detail: creatureFixture.detail,
              power: creatureFixture.power,
              toughness: creatureFixture.toughness,
              type: creatureFixture.type,
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
          expect((cardResult as Creature).detail.description).toStrictEqual(
            creatureDbInserted.detail.description,
          );
          expect((cardResult as Creature).detail.image).toStrictEqual(
            creatureDbInserted.detail.image,
          );
          expect((cardResult as Creature).detail.title).toStrictEqual(
            creatureDbInserted.detail.title,
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
          const enchantmentFixture: Enchantment = enchantmentFixtureFactory.get();

          // eslint-disable-next-line @typescript-eslint/typedef
          [enchantmentDbInserted] = (await cardModelMock.insertMany([
            new cardModelMock({
              cost: enchantmentFixture.cost,
              detail: enchantmentFixture.detail,
              type: enchantmentFixture.type,
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
          expect((cardResult as Enchantment).detail.description).toStrictEqual(
            enchantmentDbInserted.detail.description,
          );
          expect((cardResult as Enchantment).detail.image).toStrictEqual(
            enchantmentDbInserted.detail.image,
          );
          expect((cardResult as Enchantment).detail.title).toStrictEqual(
            enchantmentDbInserted.detail.title,
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
          const landFixture: Land = landFixtureFactory.get();

          // eslint-disable-next-line @typescript-eslint/typedef
          [landDbInserted] = (await cardModelMock.insertMany([
            new cardModelMock({
              cost: landFixture.cost,
              detail: landFixture.detail,
              type: landFixture.type,
            }),
          ])) as [LandDb];

          const landCardFindQueryFixture: CardFindQuery = {
            id: landDbInserted._id.toHexString(),
          };

          landResult = await cardDbSearchRepository.find(
            landCardFindQueryFixture,
          );
        });

        it('must return the land cards', () => {
          expect(landResult).toHaveProperty('length');
          expect((landResult as Array<unknown>).length).toBe(1);

          const [cardResult]: unknown[] = landResult as unknown[];

          expect((cardResult as Land).id).toStrictEqual(
            landDbInserted._id.toHexString(),
          );
          expect((cardResult as Land).cost).toStrictEqual(landDbInserted.cost);
          expect((cardResult as Land).detail.description).toStrictEqual(
            landDbInserted.detail.description,
          );
          expect((cardResult as Land).detail.image).toStrictEqual(
            landDbInserted.detail.image,
          );
          expect((cardResult as Land).detail.title).toStrictEqual(
            landDbInserted.detail.title,
          );
          expect((cardResult as Land).type).toBe(landDbInserted.type);
        });
      });
    });
  });
});
