import 'reflect-metadata';
import mongodb from 'mongodb';

import { Capsule, Converter } from '../../../../../../../common/domain';
import { MongoDbConnector } from '../../../../../../../integration-modules/mongodb/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { CardDeckDb } from '../../../../../adapter/db/model/deck/CardDeckDb';
import { CardDeckDbInsertRepository } from '../../../../../adapter/db/repository/deck/CardDeckDbInsertRepository';
import { CardDeck } from '../../../../../domain/model/deck/CardDeck';
import { CardDeckCreationQuery } from '../../../../../domain/query/deck/CardDeckCreationQuery';
import { cardDeckFixtureFactory } from '../../../../fixtures/domain/model/deck';
import { cardDeckCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/deck';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  CardDeckDbInsertRepository.name,
  () => {
    let collectionName: string;
    let cardDeckDbToCardDeckConverter: Converter<CardDeckDb, CardDeck>;
    let mongoDbConnector: MongoDbConnector;
    let cardDeckCreationQueryToCardDeckDbsConverter: Converter<
      CardDeckCreationQuery,
      mongodb.OptionalId<CardDeckDb>[]
    >;

    let cardDeckDbInsertRepository: CardDeckDbInsertRepository;

    beforeAll(() => {
      collectionName = 'CardDeckDbInsertRepositoryIntegrationTest';
      cardDeckDbToCardDeckConverter = {
        transform: jest.fn(),
      };
      mongoDbConnector = outputParam.elem as MongoDbConnector;
      cardDeckCreationQueryToCardDeckDbsConverter = {
        transform: jest.fn(),
      };

      cardDeckDbInsertRepository = new CardDeckDbInsertRepository(
        collectionName,
        cardDeckDbToCardDeckConverter,
        mongoDbConnector,
        cardDeckCreationQueryToCardDeckDbsConverter,
      );
    });

    describe('.insert()', () => {
      describe('when called', () => {
        let cardDeckFixture: CardDeck;
        let cardDeckDbFixture: mongodb.OptionalId<CardDeckDb>;

        let result: unknown;

        beforeAll(async () => {
          cardDeckFixture = cardDeckFixtureFactory.get();

          (
            cardDeckDbToCardDeckConverter.transform as jest.Mock
          ).mockReturnValueOnce(cardDeckFixture);

          cardDeckDbFixture = {
            description: cardDeckFixture.description,
            format: cardDeckFixture.format,
            name: cardDeckFixture.name,
            sections: cardDeckFixture.sections,
          };

          (
            cardDeckCreationQueryToCardDeckDbsConverter.transform as jest.Mock
          ).mockReturnValueOnce([cardDeckDbFixture]);

          result = await cardDeckDbInsertRepository.insert(
            cardDeckCreationQueryFixtureFactory.get(),
          );
        });

        it('must call cardDeckDbToCardDeckConverter.transform with the db entities found', () => {
          expect(cardDeckDbToCardDeckConverter.transform).toHaveBeenCalledTimes(
            1,
          );
          expect(cardDeckDbToCardDeckConverter.transform).toHaveBeenCalledWith({
            ...cardDeckDbFixture,
            _id: expect.any(mongodb.ObjectID) as mongodb.ObjectID,
          });
        });

        it('must return the card deck created', () => {
          expect(result).toStrictEqual([cardDeckFixture]);
        });
      });
    });
  },
);
