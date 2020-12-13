/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Capsule, Converter } from '../../../../../common/domain';
import { Document } from '../../../domain/model/Document';
import { MongoDbConnector } from '../../../adapter';
import { MongoDbSearchRepository } from '../../../adapter/MongoDbSearchRepository';
import { dbTest } from '../../../../../layer-modules/db/test';
import mongodb from 'mongodb';

class ModelMock {
  constructor(public foo: string) {}
}

class SearchQueryMock {
  constructor(public id: string) {}
}

type ModelMockDb = ModelMock & Document;

class MongoDbSearchRepositoryMock extends MongoDbSearchRepository<
  ModelMock,
  ModelMockDb,
  ModelMockDb,
  SearchQueryMock
> {}

const FOO_VALUE: string = 'bar';

const creationQueryMockDbFixture: Pick<ModelMockDb, 'foo'> = {
  foo: FOO_VALUE,
};

const collectionName: string = 'MongoDbSearchRepositoryIntegrationTest';

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  MongoDbSearchRepository.name,
  () => {
    let mongoDbConnector: MongoDbConnector;

    let modelDbToModelConverter: Converter<
      ModelMockDb,
      ModelMock | Promise<ModelMock>
    >;
    let queryToFilterQueryConverter: Converter<
      SearchQueryMock,
      | mongodb.FilterQuery<ModelMockDb>
      | Promise<mongodb.FilterQuery<ModelMockDb>>
    >;

    let mongoDbSearchRepository: MongoDbSearchRepositoryMock;

    beforeAll(() => {
      mongoDbConnector = outputParam.elem as MongoDbConnector;
      modelDbToModelConverter = {
        transform: jest.fn(),
      };
      queryToFilterQueryConverter = {
        transform: jest.fn(),
      };

      mongoDbSearchRepository = new MongoDbSearchRepositoryMock(
        collectionName,
        modelDbToModelConverter,
        mongoDbConnector,
        queryToFilterQueryConverter,
      );
    });

    describe('.find()', () => {
      let modelDbInserted: ModelMockDb;

      let expectedModel: ModelMock;

      let queryToFindInsertedModel: SearchQueryMock;
      let queryDbToFindInsertedModel: mongodb.FilterQuery<ModelMockDb>;

      beforeAll(async () => {
        const collection: mongodb.Collection<ModelMockDb> = mongoDbConnector.db.collection(
          collectionName,
        );

        const insertionResult: mongodb.InsertOneWriteOpResult<
          mongodb.WithId<ModelMockDb>
        > = await collection.insertOne({ ...creationQueryMockDbFixture });

        modelDbInserted = { ...insertionResult.ops[0] };

        expectedModel = {
          foo: modelDbInserted.foo,
        };

        queryToFindInsertedModel = {
          id: modelDbInserted._id.toHexString(),
        };

        queryDbToFindInsertedModel = {
          _id: modelDbInserted._id,
        };
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          (modelDbToModelConverter.transform as jest.Mock).mockReturnValueOnce(
            expectedModel,
          );
          (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            queryDbToFindInsertedModel,
          );

          result = await mongoDbSearchRepository.find(queryToFindInsertedModel);
        });

        afterAll(() => {
          (modelDbToModelConverter.transform as jest.Mock).mockClear();
          (queryToFilterQueryConverter.transform as jest.Mock).mockClear();
        });

        it('must call modelDbToModelConverter with the expected modelDb', () => {
          expect(modelDbToModelConverter.transform).toHaveBeenCalledTimes(1);
          expect(modelDbToModelConverter.transform).toHaveBeenCalledWith(
            modelDbInserted,
          );
        });

        it('must return the expected model', () => {
          expect(result).toStrictEqual([expectedModel]);
        });
      });
    });

    describe('.findOne()', () => {
      let modelDbInserted: ModelMockDb;

      let expectedModel: ModelMock;

      let queryToFindInsertedModel: SearchQueryMock;
      let queryDbToFindInsertedModel: mongodb.FilterQuery<ModelMockDb>;

      beforeAll(async () => {
        const collection: mongodb.Collection<ModelMockDb> = mongoDbConnector.db.collection(
          collectionName,
        );

        const insertionResult: mongodb.InsertOneWriteOpResult<
          mongodb.WithId<ModelMockDb>
        > = await collection.insertOne({ ...creationQueryMockDbFixture });

        modelDbInserted = { ...insertionResult.ops[0] };

        expectedModel = {
          foo: modelDbInserted.foo,
        };

        queryToFindInsertedModel = {
          id: modelDbInserted._id.toHexString(),
        };

        queryDbToFindInsertedModel = {
          _id: modelDbInserted._id,
        };
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          (modelDbToModelConverter.transform as jest.Mock).mockReturnValueOnce(
            expectedModel,
          );
          (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            queryDbToFindInsertedModel,
          );

          result = await mongoDbSearchRepository.findOne(
            queryToFindInsertedModel,
          );
        });

        afterAll(() => {
          (modelDbToModelConverter.transform as jest.Mock).mockClear();
          (queryToFilterQueryConverter.transform as jest.Mock).mockClear();
        });

        it('must call modelDbToModelConverter with the expected modelDb', () => {
          expect(modelDbToModelConverter.transform).toHaveBeenCalledTimes(1);
          expect(modelDbToModelConverter.transform).toHaveBeenCalledWith(
            modelDbInserted,
          );
        });

        it('must return the expected model', () => {
          expect(result).toStrictEqual(expectedModel);
        });
      });
    });
  },
);
