import 'reflect-metadata';
import mongodb from 'mongodb';

import { Capsule, Converter } from '../../../../../../../common/domain';
import { MongoDbConnector } from '../../../../../../../integration-modules/mongodb/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { CardDb } from '../../../../../adapter/db/model/card/CardDb';
import { CardDbInsertRepository } from '../../../../../adapter/db/repository/card/CardDbInsertRepository';
import { Card } from '../../../../../domain/model/card/Card';
import { CardCreationQuery } from '../../../../../domain/query/card/CardCreationQuery';
import { creatureFixtureFactory } from '../../../../fixtures/domain/model/card';
import { cardCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/card';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  CardDbInsertRepository.name,
  () => {
    let collectionName: string;
    let cardDbToCardConverter: Converter<CardDb, Card>;
    let mongoDbConnector: MongoDbConnector;
    let cardCreationQueryToCardDbsConverter: Converter<
      CardCreationQuery,
      mongodb.OptionalId<CardDb>[]
    >;

    let creatureDbInsertRepository: CardDbInsertRepository;

    beforeAll(() => {
      collectionName = 'CreatureDbInsertRepositoryIntegrationTests';

      cardDbToCardConverter = {
        transform: jest.fn(),
      };

      mongoDbConnector = outputParam.elem as MongoDbConnector;

      cardCreationQueryToCardDbsConverter = {
        transform: jest.fn(),
      };

      creatureDbInsertRepository = new CardDbInsertRepository(
        collectionName,
        cardDbToCardConverter,
        mongoDbConnector,
        cardCreationQueryToCardDbsConverter,
      );
    });

    describe('.insert()', () => {
      describe('when called', () => {
        let cardFixture: Card;

        let result: unknown;

        beforeAll(async () => {
          cardFixture = creatureFixtureFactory.get();

          (cardDbToCardConverter.transform as jest.Mock).mockReturnValueOnce(
            cardFixture,
          );

          const cardDbFixture: mongodb.OptionalId<CardDb> = {
            cost: cardFixture.cost,
            detail: cardFixture.detail,
            power: cardFixture.power,
            toughness: cardFixture.toughness,
            types: [...cardFixture.types],
            subtypes: [],
            supertypes: [],
          };

          (cardCreationQueryToCardDbsConverter.transform as jest.Mock).mockReturnValueOnce(
            [cardDbFixture],
          );

          result = await creatureDbInsertRepository.insert(
            cardCreationQueryFixtureFactory.get(),
          );
        });

        afterAll(() => {
          (cardDbToCardConverter.transform as jest.Mock).mockClear();
          (cardCreationQueryToCardDbsConverter.transform as jest.Mock).mockClear();
        });

        it('must call cardDbToCardConverter.transform with the db entities found', () => {
          const expectedCreatureDb: CardDb = {
            _id: expect.any(mongodb.ObjectID) as mongodb.ObjectID,
            cost: cardFixture.cost,
            detail: cardFixture.detail,
            power: cardFixture.power,
            toughness: cardFixture.toughness,
            types: cardFixture.types,
            subtypes: [],
            supertypes: [],
          };

          expect(cardDbToCardConverter.transform).toHaveBeenCalledTimes(1);
          expect(cardDbToCardConverter.transform).toHaveBeenCalledWith(
            expectedCreatureDb,
          );
        });

        it('must return the creature created', () => {
          expect(result).toStrictEqual([cardFixture]);
        });
      });
    });
  },
);
