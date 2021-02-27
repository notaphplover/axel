import 'reflect-metadata';
import mongodb from 'mongodb';

import { Capsule, Converter } from '../../../../../../../common/domain';
import { MongoDbConnector } from '../../../../../../../integration-modules/mongodb/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { CardDeckDb } from '../../../../../adapter/db/model/deck/CardDeckDb';
import { CardDeckDbSearchRepository } from '../../../../../adapter/db/repository/deck/CardDeckDbSearchRepository';
import { CardDeck } from '../../../../../domain/model/deck/CardDeck';
import { CardDeckFindQuery } from '../../../../../domain/query/deck/CardDeckFindQuery';
import { cardDeckFixtureFactory } from '../../../../fixtures/domain/model/deck';
import { cardDeckFindQueryFixtureFactory } from '../../../../fixtures/domain/query/deck';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  CardDeckDbSearchRepository.name,
  () => {
    let collectionName: string;
    let cardDeckDbToCardDeckConverter: Converter<CardDeckDb, CardDeck>;
    let mongoDbConnector: MongoDbConnector;
    let cardDeckFindQueryToCardDeckDbFilterQueryConverter: Converter<
      CardDeckFindQuery,
      mongodb.FilterQuery<CardDeckDb>
    >;

    let cardDeckDbSearchRepository: CardDeckDbSearchRepository;

    beforeAll(() => {
      collectionName = 'CardDeckDbSearchRepositoryIntegrationTest';
      cardDeckDbToCardDeckConverter = {
        transform: jest.fn(),
      };
      mongoDbConnector = outputParam.elem as MongoDbConnector;
      cardDeckFindQueryToCardDeckDbFilterQueryConverter = {
        transform: jest.fn(),
      };

      cardDeckDbSearchRepository = new CardDeckDbSearchRepository(
        collectionName,
        cardDeckDbToCardDeckConverter,
        mongoDbConnector,
        cardDeckFindQueryToCardDeckDbFilterQueryConverter,
      );
    });

    describe('.find()', () => {
      describe('when called and some card decks satisfies the query', () => {
        let cardDeckDbInserted: CardDeckDb;

        let result: unknown;

        beforeAll(async () => {
          const cardDeckFixture: CardDeck = cardDeckFixtureFactory.get();

          const cardDeckDbCollection: mongodb.Collection<CardDeckDb> = mongoDbConnector.db.collection(
            collectionName,
          );

          // eslint-disable-next-line @typescript-eslint/typedef
          [cardDeckDbInserted] = (
            await cardDeckDbCollection.insertMany([
              {
                description: cardDeckFixture.description,
                format: cardDeckFixture.format,
                name: cardDeckFixture.name,
                sections: cardDeckFixture.sections,
              },
            ])
          ).ops;

          const cardDeckFindQueryFixture: CardDeckFindQuery = cardDeckFindQueryFixtureFactory.get();

          const cardDeckDbInsertedId: string = cardDeckDbInserted._id.toHexString();

          cardDeckFindQueryFixture.id = cardDeckDbInsertedId;
          cardDeckFindQueryFixture.ids = [cardDeckDbInsertedId];

          (cardDeckDbToCardDeckConverter.transform as jest.Mock).mockReturnValueOnce(
            cardDeckFixture,
          );

          const cardDeckDbFilterQuery: mongodb.FilterQuery<CardDeckDb> = {
            _id: cardDeckDbInserted._id,
          };

          (cardDeckFindQueryToCardDeckDbFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            cardDeckDbFilterQuery,
          );

          result = await cardDeckDbSearchRepository.find(
            cardDeckFindQueryFixture,
          );
        });

        afterAll(() => {
          (cardDeckDbToCardDeckConverter.transform as jest.Mock).mockClear();
          (cardDeckFindQueryToCardDeckDbFilterQueryConverter.transform as jest.Mock).mockClear();
        });

        it('must call cardDeckDbToCardDeckConverter.transform with the db entities found', () => {
          expect(cardDeckDbToCardDeckConverter.transform).toHaveBeenCalledTimes(
            1,
          );
          expect(cardDeckDbToCardDeckConverter.transform).toHaveBeenCalledWith(
            cardDeckDbInserted,
          );
        });

        it('must return the card decks', () => {
          expect(result).toStrictEqual([cardDeckFixtureFactory.get()]);
        });
      });

      describe('when called and no card deck satisfies the query', () => {
        let result: unknown;

        beforeAll(async () => {
          const cardDeckId: mongodb.ObjectID = new mongodb.ObjectID();

          const cardDeckFindQuery: CardDeckFindQuery = {
            id: cardDeckId.toHexString(),
          };

          const cardDeckDbFilterQuery: mongodb.FilterQuery<CardDeckDb> = {
            _id: cardDeckId,
          };

          (cardDeckFindQueryToCardDeckDbFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            cardDeckDbFilterQuery,
          );

          result = await cardDeckDbSearchRepository.find(cardDeckFindQuery);
        });

        afterAll(() => {
          (cardDeckDbToCardDeckConverter.transform as jest.Mock).mockClear();
          (cardDeckFindQueryToCardDeckDbFilterQueryConverter.transform as jest.Mock).mockClear();
        });

        it('must not call cardDeckDbToCardDeckConverter.transform with the db entities found', () => {
          expect(cardDeckDbToCardDeckConverter.transform).toHaveBeenCalledTimes(
            0,
          );
        });

        it('must return no game', () => {
          expect(result).toStrictEqual([]);
        });
      });
    });
  },
);
