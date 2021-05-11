import 'reflect-metadata';
import mongodb from 'mongodb';

import { Capsule, Converter } from '../../../../../common/domain';
import { dbTest } from '../../../../../layer-modules/db/test';
import {
  Document,
  MongoDbConnector,
  MongoDbDeleteRepository,
} from '../../../adapter';

class ModelMock {
  constructor(public foo: string) {}
}

class DeleteQueryMock {
  constructor(public foo: string) {}
}

type ModelMockDb = ModelMock & Document;

class MongoDbDeleteRepositoryMock extends MongoDbDeleteRepository<
  DeleteQueryMock,
  ModelMockDb
> {}

const collectionName: string = 'MongoDbDeleteRepositoryIntegrationTests';

const FOO_VALUE: string = 'bar';

const creationQueryMockDbFixture: Pick<ModelMockDb, 'foo'> = {
  foo: FOO_VALUE,
};

const deleteQueryMockFixture: DeleteQueryMock = { foo: FOO_VALUE };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

mongodbIntegrationDescribeGenerator(outputParam)(
  MongoDbDeleteRepository.name,
  () => {
    let mongoDbConnector: MongoDbConnector;

    let queryToFilterQueryConverter: jest.Mocked<
      Converter<
        DeleteQueryMock,
        | mongodb.FilterQuery<ModelMockDb>
        | Promise<mongodb.FilterQuery<ModelMockDb>>
      >
    >;

    let mongoDbDeleteRepository: MongoDbDeleteRepositoryMock;

    beforeAll(() => {
      mongoDbConnector = outputParam.elem as MongoDbConnector;

      queryToFilterQueryConverter = { transform: jest.fn() };

      mongoDbDeleteRepository = new MongoDbDeleteRepositoryMock(
        collectionName,
        mongoDbConnector,
        queryToFilterQueryConverter,
      );
    });

    describe('.delete()', () => {
      describe('when called', () => {
        let findQueryMockDbFixture: mongodb.FilterQuery<ModelMockDb>;

        let modelDbInserted: ModelMockDb;

        let modelDbFoundAfterDeletion: ModelMockDb | null;

        beforeAll(async () => {
          const collection: mongodb.Collection<ModelMockDb> =
            mongoDbConnector.db.collection(collectionName);

          const insertionResult: mongodb.InsertOneWriteOpResult<
            mongodb.WithId<ModelMockDb>
          > = await collection.insertOne({ ...creationQueryMockDbFixture });

          modelDbInserted = { ...(insertionResult.ops[0] as ModelMockDb) };

          findQueryMockDbFixture = { _id: modelDbInserted._id };

          queryToFilterQueryConverter.transform.mockReturnValueOnce(
            findQueryMockDbFixture,
          );

          await mongoDbDeleteRepository.delete(deleteQueryMockFixture);

          modelDbFoundAfterDeletion = await collection.findOne(
            findQueryMockDbFixture,
          );
        });

        afterAll(() => {
          queryToFilterQueryConverter.transform.mockClear();
        });

        it('should delete the entity', () => {
          expect(modelDbFoundAfterDeletion).toBeNull();
        });
      });
    });
  },
);
