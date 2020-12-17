/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Capsule, Converter } from '../../../../../../../common/domain';
import {
  artifactFixtureFactory,
  creatureFixtureFactory,
  enchantmentFixtureFactory,
  landFixtureFactory,
} from '../../../../fixtures/domain/model/card';
import { Artifact } from '../../../../../domain/model/card/Artifact';
import { ArtifactDb } from '../../../../../adapter/db/model/card/ArtifactDb';
import { Card } from '../../../../../domain/model/card/Card';
import { CardDb } from '../../../../../adapter/db/model/card/CardDb';
import { CardDbSearchRepository } from '../../../../../adapter/db/repository/card/CardDbSearchRepository';
import { CardFindQuery } from '../../../../../domain/query/card/CardFindQuery';
import { Creature } from '../../../../../domain/model/card/Creature';
import { CreatureDb } from '../../../../../adapter/db/model/card/CreatureDb';
import { Enchantment } from '../../../../../domain/model/card/Enchantment';
import { EnchantmentDb } from '../../../../../adapter/db/model/card/EnchantmentDb';
import { Land } from '../../../../../domain/model/card/Land';
import { LandDb } from '../../../../../adapter/db/model/card/LandDb';
import { MongoDbConnector } from '../../../../../../../integration-modules/mongodb/adapter';
import { SearchRepository } from '../../../../../../../layer-modules/db/domain';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import mongodb from 'mongodb';

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
        describe('when the cards are artifacts', () => {
          let artifactDbInserted: ArtifactDb;

          let artifactResult: unknown;

          beforeAll(async () => {
            const artifactFixture: Artifact = artifactFixtureFactory.get();

            const cardDbCollection: mongodb.Collection<ArtifactDb> = mongoDbConnector.db.collection(
              collectionName,
            );

            // eslint-disable-next-line @typescript-eslint/typedef
            [artifactDbInserted] = (
              await cardDbCollection.insertMany([
                {
                  cost: artifactFixture.cost,
                  detail: artifactFixture.detail,
                  type: artifactFixture.type,
                },
              ])
            ).ops;

            const artifactCardFindQueryFixture: CardFindQuery = {
              id: artifactDbInserted._id.toHexString(),
            };

            (cardDbToCardConverter.transform as jest.Mock).mockReturnValueOnce(
              artifactFixture,
            );

            const cardDbFilterQuery: mongodb.FilterQuery<CardDb> = {
              _id: new mongodb.ObjectID(artifactCardFindQueryFixture.id),
            };

            (cardFindQueryToCardDbFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
              cardDbFilterQuery,
            );

            artifactResult = await cardDbSearchRepository.find(
              artifactCardFindQueryFixture,
            );
          });

          afterAll(() => {
            (cardDbToCardConverter.transform as jest.Mock).mockClear();
            (cardFindQueryToCardDbFilterQueryConverter.transform as jest.Mock).mockClear();
          });

          it('must call cardDbToCardConverter.transform with the db entities found', () => {
            expect(cardDbToCardConverter.transform).toHaveBeenCalledTimes(1);
            expect(cardDbToCardConverter.transform).toHaveBeenCalledWith(
              artifactDbInserted,
            );
          });

          it('must return the artifact cards', () => {
            expect(artifactResult).toStrictEqual([
              artifactFixtureFactory.get(),
            ]);
          });
        });

        describe('when the cards are creatures', () => {
          let creatureDbInserted: CreatureDb;

          let creatureResult: unknown;

          beforeAll(async () => {
            const creatureFixture: Creature = creatureFixtureFactory.get();

            const cardDbCollection: mongodb.Collection<CreatureDb> = mongoDbConnector.db.collection(
              collectionName,
            );

            // eslint-disable-next-line @typescript-eslint/typedef
            [creatureDbInserted] = (
              await cardDbCollection.insertMany([
                {
                  cost: creatureFixture.cost,
                  detail: creatureFixture.detail,
                  power: creatureFixture.power,
                  toughness: creatureFixture.toughness,
                  type: creatureFixture.type,
                },
              ])
            ).ops;

            const creatureCardFindQueryFixture: CardFindQuery = {
              id: creatureDbInserted._id.toHexString(),
            };

            (cardDbToCardConverter.transform as jest.Mock).mockReturnValueOnce(
              creatureFixture,
            );

            const cardDbFilterQuery: mongodb.FilterQuery<CardDb> = {
              _id: new mongodb.ObjectID(creatureCardFindQueryFixture.id),
            };

            (cardFindQueryToCardDbFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
              cardDbFilterQuery,
            );

            creatureResult = await cardDbSearchRepository.find(
              creatureCardFindQueryFixture,
            );
          });

          afterAll(() => {
            (cardDbToCardConverter.transform as jest.Mock).mockClear();
            (cardFindQueryToCardDbFilterQueryConverter.transform as jest.Mock).mockClear();
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

        describe('when the cards are enchantments', () => {
          let enchantmentDbInserted: EnchantmentDb;

          let enchantmentResult: unknown;

          beforeAll(async () => {
            const enchantmentFixture: Enchantment = enchantmentFixtureFactory.get();

            const cardDbCollection: mongodb.Collection<EnchantmentDb> = mongoDbConnector.db.collection(
              collectionName,
            );

            // eslint-disable-next-line @typescript-eslint/typedef
            [enchantmentDbInserted] = (
              await cardDbCollection.insertMany([
                {
                  cost: enchantmentFixture.cost,
                  detail: enchantmentFixture.detail,
                  type: enchantmentFixture.type,
                },
              ])
            ).ops;

            const enchantmentCardFindQueryFixture: CardFindQuery = {
              id: enchantmentDbInserted._id.toHexString(),
            };

            (cardDbToCardConverter.transform as jest.Mock).mockReturnValueOnce(
              enchantmentFixture,
            );

            const cardDbFilterQuery: mongodb.FilterQuery<CardDb> = {
              _id: new mongodb.ObjectID(enchantmentCardFindQueryFixture.id),
            };

            (cardFindQueryToCardDbFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
              cardDbFilterQuery,
            );

            enchantmentResult = await cardDbSearchRepository.find(
              enchantmentCardFindQueryFixture,
            );
          });

          afterAll(() => {
            (cardDbToCardConverter.transform as jest.Mock).mockClear();
            (cardFindQueryToCardDbFilterQueryConverter.transform as jest.Mock).mockClear();
          });

          it('must call cardDbToCardConverter.transform with the db entities found', () => {
            expect(cardDbToCardConverter.transform).toHaveBeenCalledTimes(1);
            expect(cardDbToCardConverter.transform).toHaveBeenCalledWith(
              enchantmentDbInserted,
            );
          });

          it('must return the enchantment cards', () => {
            expect(enchantmentResult).toStrictEqual([
              enchantmentFixtureFactory.get(),
            ]);
          });
        });

        describe('when the cards are lands', () => {
          let landDbInserted: LandDb;

          let landResult: unknown;

          beforeAll(async () => {
            const landFixture: Land = landFixtureFactory.get();

            const cardDbCollection: mongodb.Collection<LandDb> = mongoDbConnector.db.collection(
              collectionName,
            );

            // eslint-disable-next-line @typescript-eslint/typedef
            [landDbInserted] = (
              await cardDbCollection.insertMany([
                {
                  cost: landFixture.cost,
                  detail: landFixture.detail,
                  type: landFixture.type,
                },
              ])
            ).ops;

            const landCardFindQueryFixture: CardFindQuery = {
              id: landDbInserted._id.toHexString(),
            };

            (cardDbToCardConverter.transform as jest.Mock).mockReturnValueOnce(
              landFixture,
            );

            const cardDbFilterQuery: mongodb.FilterQuery<CardDb> = {
              _id: new mongodb.ObjectID(landCardFindQueryFixture.id),
            };

            (cardFindQueryToCardDbFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
              cardDbFilterQuery,
            );

            landResult = await cardDbSearchRepository.find(
              landCardFindQueryFixture,
            );
          });

          afterAll(() => {
            (cardDbToCardConverter.transform as jest.Mock).mockClear();
            (cardFindQueryToCardDbFilterQueryConverter.transform as jest.Mock).mockClear();
          });

          it('must call cardDbToCardConverter.transform with the db entities found', () => {
            expect(cardDbToCardConverter.transform).toHaveBeenCalledTimes(1);
            expect(cardDbToCardConverter.transform).toHaveBeenCalledWith(
              landDbInserted,
            );
          });

          it('must return the land cards', () => {
            expect(landResult).toStrictEqual([landFixtureFactory.get()]);
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

          (cardFindQueryToCardDbFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            cardDbFilterQuery,
          );

          result = await cardDbSearchRepository.find(cardFindQueryFixture);
        });

        afterAll(() => {
          (cardDbToCardConverter.transform as jest.Mock).mockClear();
          (cardFindQueryToCardDbFilterQueryConverter.transform as jest.Mock).mockClear();
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
          const artifactFixture: Artifact = artifactFixtureFactory.get();

          const cardDbCollection: mongodb.Collection<ArtifactDb> = mongoDbConnector.db.collection(
            collectionName,
          );

          await cardDbCollection.insertMany([
            {
              cost: artifactFixture.cost,
              detail: artifactFixture.detail,
              type: artifactFixture.type,
            },
          ]);

          const cardFindQueryFixture: CardFindQuery = {
            limit: 1,
            offset: 0,
          };

          (cardDbToCardConverter.transform as jest.Mock).mockReturnValueOnce(
            artifactFixtureFactory.get(),
          );

          const cardDbFilterQuery: mongodb.FilterQuery<CardDb> = {};

          (cardFindQueryToCardDbFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            cardDbFilterQuery,
          );

          result = await cardDbSearchRepository.find(cardFindQueryFixture);
        });

        afterAll(() => {
          (cardDbToCardConverter.transform as jest.Mock).mockClear();
          (cardFindQueryToCardDbFilterQueryConverter.transform as jest.Mock).mockClear();
        });

        it('must call cardDbToCardConverter.transform with the db entities found', () => {
          expect(cardDbToCardConverter.transform).toHaveBeenCalledTimes(1);
          expect(cardDbToCardConverter.transform).toHaveBeenCalledWith(
            expect.any(Object),
          );
        });

        it('must return the artifact cards', () => {
          expect(result).toStrictEqual([artifactFixtureFactory.get()]);
        });
      });
    });
  },
);
