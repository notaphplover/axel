import 'reflect-metadata';
import mongodb from 'mongodb';

import { Capsule, Converter } from '../../../../../../../common/domain';
import { MongoDbConnector } from '../../../../../../../integration-modules/mongodb/adapter';
import { SearchRepository } from '../../../../../../../layer-modules/db/domain';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { CardDb } from '../../../../../adapter/db/model/card/CardDb';
import { CardDbSearchRepository } from '../../../../../adapter/db/repository/card/CardDbSearchRepository';
import { Card } from '../../../../../domain/model/card/Card';
import { CardFindQuery } from '../../../../../domain/query/card/CardFindQuery';
import { creatureFixtureFactory } from '../../../../fixtures/domain/model/card';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  CardDbSearchRepository.name,
  () => {
    let collectionName: string;
    let cardDbToCardConverter: Converter<CardDb, Card>;
    let mongoDbConnector: MongoDbConnector;
    let cardFindQueryToCardDbFilterQueryConverter: Converter<
      CardFindQuery,
      mongodb.FilterQuery<CardDb>
    >;

    let cardDbSearchRepository: SearchRepository<Card, CardFindQuery>;

    beforeAll(() => {
      collectionName = 'CardDbSearchRepositoryIntegrationTests';

      cardDbToCardConverter = {
        transform: jest.fn(),
      };

      mongoDbConnector = outputParam.elem as MongoDbConnector;

      cardFindQueryToCardDbFilterQueryConverter = {
        transform: jest.fn(),
      };

      cardDbSearchRepository = new CardDbSearchRepository(
        collectionName,
        cardDbToCardConverter,
        mongoDbConnector,
        cardFindQueryToCardDbFilterQueryConverter,
      );
    });

    describe('.find()', () => {
      describe('when called and some cards satisfies the query', () => {
        describe('when the cards are creatures', () => {
          let creatureDbInserted: CardDb;

          let creatureResult: unknown;

          beforeAll(async () => {
            const creatureFixture: Card = creatureFixtureFactory.get();

            const cardDbCollection: mongodb.Collection<CardDb> =
              mongoDbConnector.db.collection(collectionName);

            // eslint-disable-next-line @typescript-eslint/typedef
            [creatureDbInserted] = (
              await cardDbCollection.insertMany([
                {
                  cost: creatureFixture.cost,
                  detail: creatureFixture.detail,
                  power: creatureFixture.power,
                  toughness: creatureFixture.toughness,
                  types: [...creatureFixture.types],
                  subtypes: [],
                  supertypes: [],
                },
              ])
            ).ops as CardDb[] & [CardDb];

            const creatureCardFindQueryFixture: CardFindQuery = {
              id: creatureDbInserted._id.toHexString(),
            };

            (cardDbToCardConverter.transform as jest.Mock).mockReturnValueOnce(
              creatureFixture,
            );

            const cardDbFilterQuery: mongodb.FilterQuery<CardDb> = {
              _id: new mongodb.ObjectID(creatureCardFindQueryFixture.id),
            };

            (
              cardFindQueryToCardDbFilterQueryConverter.transform as jest.Mock
            ).mockReturnValueOnce(cardDbFilterQuery);

            creatureResult = await cardDbSearchRepository.find(
              creatureCardFindQueryFixture,
            );
          });

          afterAll(() => {
            (cardDbToCardConverter.transform as jest.Mock).mockClear();
            (
              cardFindQueryToCardDbFilterQueryConverter.transform as jest.Mock
            ).mockClear();
          });

          it('must call cardDbToCardConverter.transform with the db entities found', () => {
            expect(cardDbToCardConverter.transform).toHaveBeenCalledTimes(1);
            expect(cardDbToCardConverter.transform).toHaveBeenCalledWith(
              creatureDbInserted,
            );
          });

          it('must return the creature cards', () => {
            expect(creatureResult).toStrictEqual([
              creatureFixtureFactory.get(),
            ]);
          });
        });
      });

      describe('when caled, and no card satisfies the query', () => {
        let result: unknown;

        beforeAll(async () => {
          const cardDbFilterQuery: mongodb.FilterQuery<CardDb> = {
            _id: new mongodb.ObjectID(),
          };

          const cardFindQueryFixture: CardFindQuery = {
            id: (cardDbFilterQuery._id as mongodb.ObjectID).toHexString(),
          };

          (
            cardFindQueryToCardDbFilterQueryConverter.transform as jest.Mock
          ).mockReturnValueOnce(cardDbFilterQuery);

          result = await cardDbSearchRepository.find(cardFindQueryFixture);
        });

        afterAll(() => {
          (cardDbToCardConverter.transform as jest.Mock).mockClear();
          (
            cardFindQueryToCardDbFilterQueryConverter.transform as jest.Mock
          ).mockClear();
        });

        it('must call cardDbToCardConverter.transform with the db entities found', () => {
          expect(cardDbToCardConverter.transform).toHaveBeenCalledTimes(0);
        });

        it('must return no cards', () => {
          expect(result).toStrictEqual([]);
        });
      });

      describe('when called, by limit and offset', () => {
        let result: unknown;

        beforeAll(async () => {
          const creatureFixture: Card = creatureFixtureFactory.get();

          const cardDbCollection: mongodb.Collection<CardDb> =
            mongoDbConnector.db.collection(collectionName);

          await cardDbCollection.insertMany([
            {
              cost: creatureFixture.cost,
              detail: creatureFixture.detail,
              power: creatureFixture.power,
              subtypes: [],
              supertypes: [],
              toughness: creatureFixture.toughness,
              types: creatureFixture.types,
            },
          ]);

          const cardFindQueryFixture: CardFindQuery = {
            limit: 1,
            offset: 0,
          };

          (cardDbToCardConverter.transform as jest.Mock).mockReturnValueOnce(
            creatureFixtureFactory.get(),
          );

          const cardDbFilterQuery: mongodb.FilterQuery<CardDb> = {};

          (
            cardFindQueryToCardDbFilterQueryConverter.transform as jest.Mock
          ).mockReturnValueOnce(cardDbFilterQuery);

          result = await cardDbSearchRepository.find(cardFindQueryFixture);
        });

        afterAll(() => {
          (cardDbToCardConverter.transform as jest.Mock).mockClear();
          (
            cardFindQueryToCardDbFilterQueryConverter.transform as jest.Mock
          ).mockClear();
        });

        it('must call cardDbToCardConverter.transform with the db entities found', () => {
          expect(cardDbToCardConverter.transform).toHaveBeenCalledTimes(1);
          expect(cardDbToCardConverter.transform).toHaveBeenCalledWith(
            expect.any(Object),
          );
        });

        it('must return the artifact cards', () => {
          expect(result).toStrictEqual([creatureFixtureFactory.get()]);
        });
      });
    });
  },
);
