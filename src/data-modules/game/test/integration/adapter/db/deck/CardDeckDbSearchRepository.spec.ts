import 'reflect-metadata';
import {
  CardDeckDb,
  cardDeckDbSchema,
} from '../../../../../adapter/db/model/deck/CardDeckDb';
import mongoose, { Document, Model } from 'mongoose';
import { CardDeck } from '../../../../../domain/model/deck/CardDeck';
import { CardDeckDbSearchRepository } from '../../../../../adapter/db/repository/deck/CardDeckDbSearchRepository';
import { CardDeckFindQuery } from '../../../../../domain/query/deck/CardDeckFindQuery';
import { Container } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../../../../adapter/config/types';
import { GAME_DOMAIN_TYPES } from '../../../../../domain/config/types';
import { SearchRepository } from '../../../../../../../layer-modules/db/domain';
import { cardDeckFindQueryFixtureFactory } from '../../../../fixtures/domain/query/deck';
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

function injectGameMongooseModelMock(
  container: Container,
  model: Model<CardDeckDb>,
): void {
  container
    .bind(GAME_ADAPTER_TYPES.db.model.deck.CARD_DECK_DB_MODEL)
    .toConstantValue(model);
}

mongooseIntegrationDescribe(CardDeckDbSearchRepository.name, () => {
  describe('.find()', () => {
    describe('when called and some card decks satisfies the query', () => {
      let cardDeckModelMock: Model<CardDeckDb>;
      let cardDeckFindQueryFixture: CardDeckFindQuery;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string = 'CardDeckDbSearchRepositoryModelSuccess';

        cardDeckModelMock = createCardDeckMongooseModelMock(collectionName);

        await clearCollection(cardDeckModelMock);

        const [
          cardDeckDbInserted,
        ]: CardDeckDb[] = await cardDeckModelMock.insertMany([
          new cardDeckModelMock({
            description: cardDeckFixtureFactory.get().description,
            format: cardDeckFixtureFactory.get().format,
            name: cardDeckFixtureFactory.get().name,
            sections: cardDeckFixtureFactory.get().sections,
          }),
        ]);

        const childContainer: Container = container.createChild();
        injectGameMongooseModelMock(childContainer, cardDeckModelMock);

        const cardDeckDbSearchRepository: SearchRepository<
          CardDeck,
          CardDeckFindQuery
        > = childContainer.get(
          GAME_DOMAIN_TYPES.repository.deck.CARD_DECK_SEARCH_REPOSITORY,
        );

        cardDeckFindQueryFixture = cardDeckFindQueryFixtureFactory.get();
        cardDeckFindQueryFixture.id = cardDeckDbInserted._id.toHexString();

        result = await cardDeckDbSearchRepository.find(
          cardDeckFindQueryFixture,
        );
      });

      afterAll(async () => {
        await clearCollection(cardDeckModelMock);
      });

      it('must return the card decks', () => {
        const expectedCardDeckResult: CardDeck = cardDeckFixtureFactory.get();
        expectedCardDeckResult.id = cardDeckFindQueryFixture.id as string;

        expect(result).toHaveProperty('length');
        expect((result as Array<unknown>).length).toBe(1);

        const [gameResult]: unknown[] = result as unknown[];

        expect(gameResult as CardDeck).toStrictEqual(expectedCardDeckResult);
      });
    });

    describe('when called and no card deck satisfies the query', () => {
      let cardDeckModelMock: Model<CardDeckDb>;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string = 'CardDeckDbSearchRepositoryModelFail';

        cardDeckModelMock = createCardDeckMongooseModelMock(collectionName);

        await clearCollection(cardDeckModelMock);

        const childContainer: Container = container.createChild();
        injectGameMongooseModelMock(childContainer, cardDeckModelMock);

        const cardDeckDbSearchRepository: SearchRepository<
          CardDeck,
          CardDeckFindQuery
        > = childContainer.get(
          GAME_DOMAIN_TYPES.repository.deck.CARD_DECK_SEARCH_REPOSITORY,
        );

        result = await cardDeckDbSearchRepository.find(
          cardDeckFindQueryFixtureFactory.get(),
        );
      });

      afterAll(async () => {
        await clearCollection(cardDeckModelMock);
      });

      it('must return no game', () => {
        expect(result).toHaveProperty('length');
        expect((result as Array<unknown>).length).toBe(0);
      });
    });
  });
});
