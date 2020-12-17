/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Capsule, Converter } from '../../../../../common/domain';
import { Document } from '../../../adapter/model/Document';
import { MongoDbConnector } from '../../../adapter';
import { MongoDbUpdateRepository } from '../../../adapter/MongoDbUpdateRepository';
import { dbTest } from '../../../../../layer-modules/db/test';
import mongodb from 'mongodb';

class ModelMock {
  constructor(public foo: string) {}
}

class UpdateQueryMock {
  constructor(public foo: string) {}
}

type ModelMockDb = ModelMock & Document;

class MongoDbUpdateRepositoryMock extends MongoDbUpdateRepository<
  ModelMock,
  UpdateQueryMock,
  ModelMockDb
> {}

const OLD_FOO_VALUE: string = 'bar';
const NEW_FOO_VALUE: string = 'baz';

const collectionName: string = 'MongoDbUpdateRepositoryTest';

const creationQueryMockDbFixture: Pick<ModelMockDb, 'foo'> = {
  foo: OLD_FOO_VALUE,
};

const updateQueryMockFixture: UpdateQueryMock = { foo: NEW_FOO_VALUE };
const updateQueryMockDbFixture: mongodb.UpdateQuery<ModelMockDb> = {
  $set: { foo: NEW_FOO_VALUE },
};

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  MongoDbUpdateRepository.name,
  () => {
    let mongoDbConnector: MongoDbConnector;

    let modelDbToModelConverter: Converter<
      ModelMock,
      ModelMockDb | Promise<ModelMockDb>
    >;
    let queryToFilterQueryConverter: Converter<
      UpdateQueryMock,
      | mongodb.FilterQuery<ModelMockDb>
      | Promise<mongodb.FilterQuery<ModelMockDb>>
    >;
    let queryToUpdateQueryConverter: Converter<
      UpdateQueryMock,
      | mongodb.UpdateQuery<ModelMockDb>
      | Promise<mongodb.UpdateQuery<ModelMockDb>>
    >;

    let mongoDbUpdateRepository: MongoDbUpdateRepositoryMock;

    beforeAll(async () => {
      mongoDbConnector = outputParam.elem as MongoDbConnector;

      modelDbToModelConverter = {
        transform: jest.fn(),
      };
      queryToFilterQueryConverter = { transform: jest.fn() };
      queryToUpdateQueryConverter = { transform: jest.fn() };

      mongoDbUpdateRepository = new MongoDbUpdateRepositoryMock(
        collectionName,
        modelDbToModelConverter,
        mongoDbConnector,
        queryToFilterQueryConverter,
        queryToUpdateQueryConverter,
      );
    });

    describe('.update()', () => {
      describe('when called', () => {
        let result: unknown;

        let expectedModelDbUpdated: ModelMockDb;
        let findQueryMockDbFixture: mongodb.FilterQuery<ModelMockDb>;

        let modelDbInserted: ModelMockDb;
        let modelDbUpdated: ModelMockDb;

        beforeAll(async () => {
          const collection: mongodb.Collection<ModelMockDb> = mongoDbConnector.db.collection(
            collectionName,
          );

          const insertionResult: mongodb.InsertOneWriteOpResult<
            mongodb.WithId<ModelMockDb>
          > = await collection.insertOne({ ...creationQueryMockDbFixture });

          modelDbInserted = { ...insertionResult.ops[0] };

          expectedModelDbUpdated = {
            _id: modelDbInserted._id,
            foo: updateQueryMockFixture.foo,
          };

          findQueryMockDbFixture = { _id: modelDbInserted._id };

          (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            findQueryMockDbFixture,
          );

          (queryToUpdateQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            updateQueryMockDbFixture,
          );

          result = await mongoDbUpdateRepository.update(updateQueryMockFixture);

          modelDbUpdated = (await collection.findOne({
            _id: modelDbInserted._id,
          })) as ModelMockDb;
        });

        afterAll(() => {
          (queryToFilterQueryConverter.transform as jest.Mock).mockClear();

          (queryToUpdateQueryConverter.transform as jest.Mock).mockClear();
        });

        it('must call queryToFilterQueryConverter.transform with the query provided', () => {
          expect(queryToFilterQueryConverter.transform).toHaveBeenCalledTimes(
            1,
          );
          expect(queryToFilterQueryConverter.transform).toHaveBeenCalledWith(
            updateQueryMockFixture,
          );
        });

        it('must call queryToUpdateQueryConverter.transform with the query provided', () => {
          expect(queryToUpdateQueryConverter.transform).toHaveBeenCalledTimes(
            1,
          );
          expect(queryToUpdateQueryConverter.transform).toHaveBeenCalledWith(
            updateQueryMockFixture,
          );
        });

        it('must return undefined', () => {
          expect(result).toBeUndefined();
        });

        it('must have updated the entity', () => {
          expect(modelDbUpdated).toStrictEqual(expectedModelDbUpdated);
        });
      });
    });

    describe('.updateAndSelect()', () => {
      describe('when called', () => {
        let result: unknown;

        let findQueryMockDbFixture: mongodb.FilterQuery<ModelMockDb>;

        let modelDbInserted: ModelMockDb;
        let expectedModelUpdated: ModelMock;
        let expectedModelDbUpdated: ModelMockDb;

        beforeAll(async () => {
          const collection: mongodb.Collection<ModelMockDb> = mongoDbConnector.db.collection(
            collectionName,
          );

          const inertionResult: mongodb.InsertOneWriteOpResult<
            mongodb.WithId<ModelMockDb>
          > = await collection.insertOne({ ...creationQueryMockDbFixture });

          modelDbInserted = { ...inertionResult.ops[0] };
          findQueryMockDbFixture = { _id: modelDbInserted._id };
          expectedModelDbUpdated = {
            _id: modelDbInserted._id,
            foo: updateQueryMockFixture.foo,
          };
          expectedModelUpdated = { ...expectedModelDbUpdated };

          (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            findQueryMockDbFixture,
          );

          (queryToUpdateQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            updateQueryMockDbFixture,
          );

          (modelDbToModelConverter.transform as jest.Mock).mockResolvedValueOnce(
            expectedModelUpdated,
          );

          result = await mongoDbUpdateRepository.updateAndSelect(
            updateQueryMockFixture,
          );
        });

        afterAll(() => {
          (modelDbToModelConverter.transform as jest.Mock).mockClear();

          (queryToFilterQueryConverter.transform as jest.Mock).mockClear();

          (queryToUpdateQueryConverter.transform as jest.Mock).mockClear();
        });

        it('must call queryToFilterQueryConverter.transform with the query provided', () => {
          expect(queryToFilterQueryConverter.transform).toHaveBeenCalledTimes(
            1,
          );
          expect(queryToFilterQueryConverter.transform).toHaveBeenCalledWith(
            updateQueryMockFixture,
          );
        });

        it('must call queryToUpdateQueryConverter.transform with the query provided', () => {
          expect(queryToUpdateQueryConverter.transform).toHaveBeenCalledTimes(
            1,
          );
          expect(queryToUpdateQueryConverter.transform).toHaveBeenCalledWith(
            updateQueryMockFixture,
          );
        });

        it('must call modelDbToModelConverter.transform with the model obtained', () => {
          expect(modelDbToModelConverter.transform).toHaveBeenCalledTimes(1);
          expect(modelDbToModelConverter.transform).toHaveBeenCalledWith(
            expectedModelDbUpdated,
          );
        });

        it('must return the expected model', () => {
          expect(result).toStrictEqual([expectedModelUpdated]);
        });
      });
    });

    describe('.updateOneAndSelect()', () => {
      describe('when called', () => {
        let result: unknown;

        let findQueryMockDbFixture: mongodb.FilterQuery<ModelMockDb>;

        let modelDbInserted: ModelMockDb;
        let expectedModelUpdated: ModelMock;
        let expectedModelDbUpdated: ModelMockDb;

        beforeAll(async () => {
          const collection: mongodb.Collection<ModelMockDb> = mongoDbConnector.db.collection(
            collectionName,
          );

          const inertionResult: mongodb.InsertOneWriteOpResult<
            mongodb.WithId<ModelMockDb>
          > = await collection.insertOne({ ...creationQueryMockDbFixture });

          modelDbInserted = { ...inertionResult.ops[0] };
          findQueryMockDbFixture = { _id: modelDbInserted._id };
          expectedModelDbUpdated = {
            _id: modelDbInserted._id,
            foo: updateQueryMockFixture.foo,
          };
          expectedModelUpdated = { ...expectedModelDbUpdated };

          (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            findQueryMockDbFixture,
          );

          (queryToUpdateQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            updateQueryMockDbFixture,
          );

          (modelDbToModelConverter.transform as jest.Mock).mockResolvedValueOnce(
            expectedModelUpdated,
          );

          result = await mongoDbUpdateRepository.updateOneAndSelect(
            updateQueryMockFixture,
          );
        });

        afterAll(() => {
          (modelDbToModelConverter.transform as jest.Mock).mockClear();

          (queryToFilterQueryConverter.transform as jest.Mock).mockClear();

          (queryToUpdateQueryConverter.transform as jest.Mock).mockClear();
        });

        it('must call queryToFilterQueryConverter.transform with the query provided', () => {
          expect(queryToFilterQueryConverter.transform).toHaveBeenCalledTimes(
            1,
          );
          expect(queryToFilterQueryConverter.transform).toHaveBeenCalledWith(
            updateQueryMockFixture,
          );
        });

        it('must call queryToUpdateQueryConverter.transform with the query provided', () => {
          expect(queryToUpdateQueryConverter.transform).toHaveBeenCalledTimes(
            1,
          );
          expect(queryToUpdateQueryConverter.transform).toHaveBeenCalledWith(
            updateQueryMockFixture,
          );
        });

        it('must call modelDbToModelConverter.transform with the model obtained', () => {
          expect(modelDbToModelConverter.transform).toHaveBeenCalledTimes(1);
          expect(modelDbToModelConverter.transform).toHaveBeenCalledWith(
            expectedModelDbUpdated,
          );
        });

        it('must return the expected model', () => {
          expect(result).toStrictEqual(expectedModelUpdated);
        });
      });
    });

    describe('.updateOne()', () => {
      describe('when called', () => {
        let result: unknown;

        let expectedModelDbUpdated: ModelMockDb;
        let findQueryMockDbFixture: mongodb.FilterQuery<ModelMockDb>;

        let modelDbInserted: ModelMockDb;
        let modelDbUpdated: ModelMockDb;

        beforeAll(async () => {
          const collection: mongodb.Collection<ModelMockDb> = mongoDbConnector.db.collection(
            collectionName,
          );

          const inertionResult: mongodb.InsertOneWriteOpResult<
            mongodb.WithId<ModelMockDb>
          > = await collection.insertOne({ ...creationQueryMockDbFixture });

          modelDbInserted = { ...inertionResult.ops[0] };

          expectedModelDbUpdated = {
            _id: modelDbInserted._id,
            foo: updateQueryMockFixture.foo,
          };

          findQueryMockDbFixture = { _id: modelDbInserted._id };

          (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            findQueryMockDbFixture,
          );

          (queryToUpdateQueryConverter.transform as jest.Mock).mockReturnValueOnce(
            updateQueryMockDbFixture,
          );

          result = await mongoDbUpdateRepository.updateOne(
            updateQueryMockFixture,
          );

          modelDbUpdated = (await collection.findOne({
            _id: modelDbInserted._id,
          })) as ModelMockDb;
        });

        afterAll(() => {
          (queryToFilterQueryConverter.transform as jest.Mock).mockClear();

          (queryToUpdateQueryConverter.transform as jest.Mock).mockClear();
        });

        it('must call queryToFilterQueryConverter.transform with the query provided', () => {
          expect(queryToFilterQueryConverter.transform).toHaveBeenCalledTimes(
            1,
          );
          expect(queryToFilterQueryConverter.transform).toHaveBeenCalledWith(
            updateQueryMockFixture,
          );
        });

        it('must call queryToUpdateQueryConverter.transform with the query provided', () => {
          expect(queryToUpdateQueryConverter.transform).toHaveBeenCalledTimes(
            1,
          );
          expect(queryToUpdateQueryConverter.transform).toHaveBeenCalledWith(
            updateQueryMockFixture,
          );
        });

        it('must return undefined', () => {
          expect(result).toBeUndefined();
        });

        it('must have updated the entity', () => {
          expect(modelDbUpdated).toStrictEqual(expectedModelDbUpdated);
        });
      });
    });
  },
);
