import 'reflect-metadata';
import {
  CardDeckDb,
  cardDeckDbSchema,
} from '../../../../../adapter/db/model/deck/CardDeckDb';
import mongoose, { Document, Model } from 'mongoose';
import { CardDeck } from '../../../../../domain/model/deck/CardDeck';
import { CardDeckCreationQuery } from '../../../../../domain/query/deck/CardDeckCreationQuery';
import { CardDeckDbInsertRepository } from '../../../../../adapter/db/repository/deck/CardDeckDbInsertRepository';
import { Container } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../../../../adapter/config/types';
import { GAME_DOMAIN_TYPES } from '../../../../../domain/config/types';
import { InsertRepository } from '../../../../../../../layer-modules/db/domain';
import { cardDeckCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/deck';
import { cardDeckFixtureFactory } from '../../../../fixtures/domain/model/deck';
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

function createCardDeckMongooseModelMock(alias: string): Model<CardDeckDb> {
  return mongoose.model<CardDeckDb>(alias, cardDeckDbSchema, alias);
}

function injectCardDeckMongooseModelMock(
  container: Container,
  model: Model<CardDeckDb>,
): void {
  container
    .bind(GAME_ADAPTER_TYPES.db.model.card.CARD_DECK_DB_MODEL)
    .toConstantValue(model);
}

mongooseIntegrationDescribe(CardDeckDbInsertRepository.name, () => {
  describe('.insert()', () => {
    describe('when called', () => {
      let cardDeckModelMock: Model<CardDeckDb>;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string = 'CardDeckDbInsertRepositoryModel';

        cardDeckModelMock = createCardDeckMongooseModelMock(collectionName);

        await clearCollection(cardDeckModelMock);

        const childContainer: Container = container.createChild();
        injectCardDeckMongooseModelMock(childContainer, cardDeckModelMock);

        const cardDeckDbInsertRepository: InsertRepository<
          CardDeck,
          CardDeckCreationQuery
        > = childContainer.get(
          GAME_DOMAIN_TYPES.repository.deck.CARD_DECK_INSERT_REPOSITORY,
        );

        result = await cardDeckDbInsertRepository.insert(
          cardDeckCreationQueryFixtureFactory.get(),
        );
      });

      afterAll(async () => {
        await clearCollection(cardDeckModelMock);
      });

      it('must return the card deck created', () => {
        expect(result).toHaveProperty('length');
        expect((result as unknown[]).length).toBe(1);

        const [innerResult]: unknown[] = result as unknown[];

        expect((innerResult as CardDeck).description).toStrictEqual(
          cardDeckFixtureFactory.get().description,
        );
        expect((innerResult as CardDeck).format).toStrictEqual(
          cardDeckFixtureFactory.get().format,
        );
        expect((innerResult as CardDeck).name).toStrictEqual(
          cardDeckFixtureFactory.get().name,
        );
      });
    });
  });
});
