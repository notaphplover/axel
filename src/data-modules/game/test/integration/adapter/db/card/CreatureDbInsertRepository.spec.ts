/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import mongodb from 'mongodb';

import { Capsule, Converter } from '../../../../../../../common/domain';
import { MongoDbConnector } from '../../../../../../../integration-modules/mongodb/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { CreatureDb } from '../../../../../adapter/db/model/card/CreatureDb';
import { CreatureDbInsertRepository } from '../../../../../adapter/db/repository/card/CreatureDbInsertRepository';
import { Creature } from '../../../../../domain/model/card/Creature';
import { CreatureCreationQuery } from '../../../../../domain/query/card/CreatureCreationQuery';
import { creatureFixtureFactory } from '../../../../fixtures/domain/model/card';
import { creatureCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/card';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  CreatureDbInsertRepository.name,
  () => {
    let collectionName: string;
    let creatureDbToCreatureConverter: Converter<CreatureDb, Creature>;
    let mongoDbConnector: MongoDbConnector;
    let creatureCreationQueryToCreatureDbsConverter: Converter<
      CreatureCreationQuery,
      mongodb.OptionalId<CreatureDb>[]
    >;

    let creatureDbInsertRepository: CreatureDbInsertRepository;

    beforeAll(() => {
      collectionName = 'CreatureDbInsertRepositoryIntegrationTests';

      creatureDbToCreatureConverter = {
        transform: jest.fn(),
      };

      mongoDbConnector = outputParam.elem as MongoDbConnector;

      creatureCreationQueryToCreatureDbsConverter = {
        transform: jest.fn(),
      };

      creatureDbInsertRepository = new CreatureDbInsertRepository(
        collectionName,
        creatureDbToCreatureConverter,
        mongoDbConnector,
        creatureCreationQueryToCreatureDbsConverter,
      );
    });

    describe('.insert()', () => {
      describe('when called', () => {
        let creatureFixture: Creature;

        let result: unknown;

        beforeAll(async () => {
          creatureFixture = creatureFixtureFactory.get();

          (creatureDbToCreatureConverter.transform as jest.Mock).mockReturnValueOnce(
            creatureFixture,
          );

          const creatureDbFixture: mongodb.OptionalId<CreatureDb> = {
            cost: creatureFixture.cost,
            detail: creatureFixture.detail,
            power: creatureFixture.power,
            toughness: creatureFixture.toughness,
            type: creatureFixture.type,
          };

          (creatureCreationQueryToCreatureDbsConverter.transform as jest.Mock).mockReturnValueOnce(
            [creatureDbFixture],
          );

          result = await creatureDbInsertRepository.insert(
            creatureCreationQueryFixtureFactory.get(),
          );
        });

        afterAll(() => {
          (creatureDbToCreatureConverter.transform as jest.Mock).mockClear();
          (creatureCreationQueryToCreatureDbsConverter.transform as jest.Mock).mockClear();
        });

        it('must call creatureDbToCreatureConverter.transform with the db entities found', () => {
          const expectedCreatureDb: CreatureDb = {
            _id: expect.any(mongodb.ObjectID) as mongodb.ObjectID,
            cost: creatureFixture.cost,
            detail: creatureFixture.detail,
            power: creatureFixture.power,
            toughness: creatureFixture.toughness,
            type: creatureFixture.type,
          };

          expect(creatureDbToCreatureConverter.transform).toHaveBeenCalledTimes(
            1,
          );
          expect(creatureDbToCreatureConverter.transform).toHaveBeenCalledWith(
            expectedCreatureDb,
          );
        });

        it('must return the creature created', () => {
          expect(result).toStrictEqual([creatureFixture]);
        });
      });
    });
  },
);
