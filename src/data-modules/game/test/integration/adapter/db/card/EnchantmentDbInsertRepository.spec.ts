import 'reflect-metadata';
import mongodb from 'mongodb';

import { Capsule, Converter } from '../../../../../../../common/domain';
import { MongoDbConnector } from '../../../../../../../integration-modules/mongodb/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { EnchantmentDb } from '../../../../../adapter/db/model/card/EnchantmentDb';
import { EnchantmentDbInsertRepository } from '../../../../../adapter/db/repository/card/EnchantmentDbInsertRepository';
import { Enchantment } from '../../../../../domain/model/card/Enchantment';
import { EnchantmentCreationQuery } from '../../../../../domain/query/card/EnchantmentCreationQuery';
import { enchantmentFixtureFactory } from '../../../../fixtures/domain/model/card';
import { enchantmentCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/card';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  EnchantmentDbInsertRepository.name,
  () => {
    let collectionName: string;
    let enchantmentDbToEnchantmentConverter: Converter<
      EnchantmentDb,
      Enchantment
    >;
    let mongoDbConnector: MongoDbConnector;
    let enchantmentCreationQueryToEnchantmentDbsConverter: Converter<
      EnchantmentCreationQuery,
      mongodb.OptionalId<EnchantmentDb>[]
    >;

    let enchantmentDbInsertRepository: EnchantmentDbInsertRepository;

    beforeAll(() => {
      collectionName = 'EnchantmentDbInsertRepositoryIntegrationTests';

      enchantmentDbToEnchantmentConverter = {
        transform: jest.fn(),
      };

      mongoDbConnector = outputParam.elem as MongoDbConnector;

      enchantmentCreationQueryToEnchantmentDbsConverter = {
        transform: jest.fn(),
      };

      enchantmentDbInsertRepository = new EnchantmentDbInsertRepository(
        collectionName,
        enchantmentDbToEnchantmentConverter,
        mongoDbConnector,
        enchantmentCreationQueryToEnchantmentDbsConverter,
      );
    });

    describe('.insert()', () => {
      describe('when called', () => {
        let enchantmentFixture: Enchantment;

        let result: unknown;

        beforeAll(async () => {
          enchantmentFixture = enchantmentFixtureFactory.get();

          (enchantmentDbToEnchantmentConverter.transform as jest.Mock).mockReturnValueOnce(
            enchantmentFixture,
          );

          const enchantmentDbFixture: mongodb.OptionalId<EnchantmentDb> = {
            cost: enchantmentFixture.cost,
            detail: enchantmentFixture.detail,
            type: enchantmentFixture.type,
          };

          (enchantmentCreationQueryToEnchantmentDbsConverter.transform as jest.Mock).mockReturnValueOnce(
            [enchantmentDbFixture],
          );

          result = await enchantmentDbInsertRepository.insert(
            enchantmentCreationQueryFixtureFactory.get(),
          );
        });

        afterAll(() => {
          (enchantmentDbToEnchantmentConverter.transform as jest.Mock).mockClear();
          (enchantmentCreationQueryToEnchantmentDbsConverter.transform as jest.Mock).mockClear();
        });

        it('must call enchantmentDbToEnchantmentConverter.transform with the db entities found', () => {
          const expectedEnchantmentDb: EnchantmentDb = {
            _id: expect.any(mongodb.ObjectID) as mongodb.ObjectID,
            cost: enchantmentFixture.cost,
            detail: enchantmentFixture.detail,
            type: enchantmentFixture.type,
          };

          expect(
            enchantmentDbToEnchantmentConverter.transform,
          ).toHaveBeenCalledTimes(1);
          expect(
            enchantmentDbToEnchantmentConverter.transform,
          ).toHaveBeenCalledWith(expectedEnchantmentDb);
        });

        it('must return the enchantment created', () => {
          expect(result).toStrictEqual([enchantmentFixture]);
        });
      });
    });
  },
);
