/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Converter } from '../../../../../common/domain';
import { Document } from '../../../domain/model/Document';
import { MongoDbConnector } from '../../../adapter/MongoDbConnector';
import { MongoDbInsertRepository } from '../../../adapter/MongoDbInsertRepository';
import mongodb from 'mongodb';

class ModelMock {
  constructor(public foo: string) {}
}

class InsertQueryMock {
  constructor(public foo: string) {}
}

type ModelMockDb = ModelMock & Document;

class MongoDbInsertRepositoryMock extends MongoDbInsertRepository<
  ModelMock,
  ModelMockDb,
  InsertQueryMock
> {}

const collectionName: string = 'MongoDbInsertRepositoryUnitTests';

describe(MongoDbInsertRepository.name, () => {
  let collectionMock: mongodb.Collection<ModelMockDb>;
  let modelDbToModelConverter: Converter<
    ModelMockDb,
    ModelMock | Promise<ModelMock>
  >;
  let mongoDbConnector: MongoDbConnector;

  let queryToInputModelDbs: Converter<
    InsertQueryMock,
    | mongodb.OptionalId<ModelMockDb>[]
    | Promise<mongodb.OptionalId<ModelMockDb>[]>
  >;

  let mongoDbInsertRepository: MongoDbInsertRepositoryMock;

  beforeAll(() => {
    collectionMock = ({
      insertMany: jest.fn(),
    } as Partial<
      mongodb.Collection<ModelMockDb>
    >) as mongodb.Collection<ModelMockDb>;

    modelDbToModelConverter = {
      transform: jest.fn(),
    };

    mongoDbConnector = {
      db: ({
        collection: jest.fn().mockReturnValue(collectionMock),
      } as Partial<mongodb.Db>) as mongodb.Db,
    } as MongoDbConnector;

    queryToInputModelDbs = {
      transform: jest.fn(),
    };

    mongoDbInsertRepository = new MongoDbInsertRepositoryMock(
      collectionName,
      modelDbToModelConverter,
      mongoDbConnector,
      queryToInputModelDbs,
    );
  });

  describe('.insert()', () => {
    let result: unknown;

    let insertQueryMock: InsertQueryMock;
    let insertResultMock: mongodb.InsertWriteOpResult<
      mongodb.WithId<ModelMockDb>
    >;
    let modelMockDbFixture: ModelMockDb;
    let modelMockFixture: ModelMock;

    describe('when called', () => {
      beforeAll(async () => {
        modelMockDbFixture = {
          _id: new mongodb.ObjectID(),
          foo: 'bar',
        };

        modelMockFixture = {
          foo: modelMockDbFixture.foo,
        };

        insertQueryMock = {
          foo: modelMockFixture.foo,
        };

        (modelDbToModelConverter.transform as jest.Mock).mockResolvedValueOnce(
          modelMockFixture,
        );

        insertResultMock = ({
          insertedCount: 1,
          ops: [modelMockDbFixture],
        } as Partial<
          mongodb.InsertWriteOpResult<mongodb.WithId<ModelMockDb>>
        >) as mongodb.InsertWriteOpResult<mongodb.WithId<ModelMockDb>>;

        (collectionMock.insertMany as jest.Mock).mockResolvedValueOnce(
          insertResultMock,
        );

        (queryToInputModelDbs.transform as jest.Mock).mockResolvedValueOnce([
          {
            foo: modelMockFixture.foo,
          },
        ]);

        result = await mongoDbInsertRepository.insert(insertQueryMock);
      });

      afterAll(() => {
        (modelDbToModelConverter.transform as jest.Mock).mockClear();
        (collectionMock.insertMany as jest.Mock).mockClear();
        (queryToInputModelDbs.transform as jest.Mock).mockClear();
      });

      it('must call queryToInputModelDbs.transform with the input received', () => {
        expect(queryToInputModelDbs.transform).toHaveBeenCalledTimes(1);
        expect(queryToInputModelDbs.transform).toHaveBeenCalledWith(
          insertQueryMock,
        );
      });

      it('must call modelDbToModelConverter.transform with the db entity received', () => {
        expect(modelDbToModelConverter.transform).toHaveBeenCalledTimes(1);
        expect(modelDbToModelConverter.transform).toHaveBeenCalledWith(
          modelMockDbFixture,
        );
      });

      it('must return domain entities tranformed from db entities', () => {
        expect(result).toStrictEqual([modelMockFixture]);
      });
    });
  });
});
