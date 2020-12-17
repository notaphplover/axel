/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Capsule, Converter } from '../../../../../../../common/domain';
import { Land } from '../../../../../domain/model/card/Land';
import { LandCreationQuery } from '../../../../../domain/query/card/LandCreationQuery';
import { LandDb } from '../../../../../adapter/db/model/card/LandDb';
import { LandDbInsertRepository } from '../../../../../adapter/db/repository/card/LandDbInsertRepository';
import { MongoDbConnector } from '../../../../../../../integration-modules/mongodb/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { landCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/card';
import { landFixtureFactory } from '../../../../fixtures/domain/model/card';
import mongodb from 'mongodb';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  LandDbInsertRepository.name,
  () => {
    let collectionName: string;
    let landDbToLandConverter: Converter<LandDb, Land>;
    let mongoDbConnector: MongoDbConnector;
    let landCreationQueryToLandDbsConverter: Converter<
      LandCreationQuery,
      mongodb.OptionalId<LandDb>[]
    >;

    let landDbInsertRepository: LandDbInsertRepository;

    beforeAll(() => {
      collectionName = 'LandDbInsertRepositoryIntegrationTests';

      landDbToLandConverter = {
        transform: jest.fn(),
      };

      mongoDbConnector = outputParam.elem as MongoDbConnector;

      landCreationQueryToLandDbsConverter = {
        transform: jest.fn(),
      };

      landDbInsertRepository = new LandDbInsertRepository(
        collectionName,
        landDbToLandConverter,
        mongoDbConnector,
        landCreationQueryToLandDbsConverter,
      );
    });

    describe('.insert()', () => {
      describe('when called', () => {
        let landFixture: Land;

        let result: unknown;

        beforeAll(async () => {
          landFixture = landFixtureFactory.get();

          (landDbToLandConverter.transform as jest.Mock).mockReturnValueOnce(
            landFixture,
          );

          const landDbFixture: mongodb.OptionalId<LandDb> = {
            cost: landFixture.cost,
            detail: landFixture.detail,
            type: landFixture.type,
          };

          (landCreationQueryToLandDbsConverter.transform as jest.Mock).mockReturnValueOnce(
            [landDbFixture],
          );

          result = await landDbInsertRepository.insert(
            landCreationQueryFixtureFactory.get(),
          );
        });

        afterAll(() => {
          (landDbToLandConverter.transform as jest.Mock).mockClear();
          (landCreationQueryToLandDbsConverter.transform as jest.Mock).mockClear();
        });

        it('must call landDbToLandConverter.transform with the db entities found', () => {
          const expectedLandDb: LandDb = {
            _id: expect.any(mongodb.ObjectID) as mongodb.ObjectID,
            cost: landFixture.cost,
            detail: landFixture.detail,
            type: landFixture.type,
          };

          expect(landDbToLandConverter.transform).toBeCalledTimes(1);
          expect(landDbToLandConverter.transform).toBeCalledWith(
            expectedLandDb,
          );
        });

        it('must return the land created', () => {
          expect(result).toStrictEqual([landFixture]);
        });
      });
    });
  },
);
