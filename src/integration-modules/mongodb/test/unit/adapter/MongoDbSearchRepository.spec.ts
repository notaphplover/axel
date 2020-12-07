/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Converter, Filter } from '../../../../../common/domain';
import { Document } from '../../../domain/model/Document';
import { MongoDbConnector } from '../../../adapter';
import { MongoDbSearchRepository } from '../../../adapter/MongoDbSearchRepository';
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

const collectionName: string = 'MongoDbUpdateRepositoryTest';

describe(MongoDbSearchRepository.name, () => {
  let collectionMock: mongodb.Collection<ModelMockDb>;
  let mongoDbConnector: MongoDbConnector;

  let modelDbToModelConverter: Converter<
    ModelMockDb,
    ModelMock | Promise<ModelMock>
  >;
  let queryToFilterQueryConverter: Converter<
    SearchQueryMock,
    mongodb.FilterQuery<ModelMockDb> | Promise<mongodb.FilterQuery<ModelMockDb>>
  >;

  let postSearchFilter: Filter<ModelMockDb, SearchQueryMock>;

  let mongoDbSearchRepository: MongoDbSearchRepositoryMock;
  let noPostSearchFilterMongoDbSearchRepository: MongoDbSearchRepositoryMock;

  beforeAll(() => {
    collectionMock = ({
      find: jest.fn(),
      findOne: jest.fn(),
    } as Partial<
      mongodb.Collection<ModelMockDb>
    >) as mongodb.Collection<ModelMockDb>;

    mongoDbConnector = {
      db: ({
        collection: jest.fn().mockReturnValue(collectionMock),
      } as Partial<mongodb.Db>) as mongodb.Db,
    } as MongoDbConnector;

    modelDbToModelConverter = {
      transform: jest.fn(),
    };
    queryToFilterQueryConverter = {
      transform: jest.fn(),
    };

    postSearchFilter = {
      filter: jest.fn(),
      filterOne: jest.fn(),
    };

    mongoDbSearchRepository = new MongoDbSearchRepositoryMock(
      collectionName,
      modelDbToModelConverter,
      mongoDbConnector,
      queryToFilterQueryConverter,
      postSearchFilter,
    );

    noPostSearchFilterMongoDbSearchRepository = new MongoDbSearchRepositoryMock(
      collectionName,
      modelDbToModelConverter,
      mongoDbConnector,
      queryToFilterQueryConverter,
    );
  });

  describe('.find()', () => {
    describe('when called', () => {
      let expectedModelDb: ModelMockDb;
      let expectedModel: ModelMock;
      let expectedQuery: SearchQueryMock;
      let expectedDbQuery: mongodb.FilterQuery<ModelMockDb>;

      let result: unknown;

      beforeAll(async () => {
        expectedModel = {
          foo: FOO_VALUE,
        };
        expectedModelDb = {
          _id: new mongodb.ObjectID(),
          foo: FOO_VALUE,
        };
        expectedQuery = {
          id: expectedModelDb._id.toHexString(),
        };
        expectedDbQuery = {
          _id: expectedModelDb._id,
        };

        const findCursorMock: mongodb.Cursor<ModelMockDb> = ({
          toArray: jest.fn().mockResolvedValueOnce([expectedModelDb]),
        } as Partial<
          mongodb.Cursor<ModelMockDb>
        >) as mongodb.Cursor<ModelMockDb>;

        (collectionMock.find as jest.Mock).mockReturnValueOnce(findCursorMock);

        (mongoDbConnector.db.collection as jest.Mock).mockReturnValueOnce(
          collectionMock,
        );

        (modelDbToModelConverter.transform as jest.Mock).mockResolvedValueOnce(
          expectedModel,
        );

        (queryToFilterQueryConverter.transform as jest.Mock).mockResolvedValueOnce(
          expectedDbQuery,
        );

        (postSearchFilter.filter as jest.Mock).mockResolvedValueOnce([
          expectedModelDb,
        ]);

        result = await mongoDbSearchRepository.find(expectedQuery);
      });

      afterAll(() => {
        (collectionMock.find as jest.Mock).mockClear();
        (mongoDbConnector.db.collection as jest.Mock).mockClear();
        (modelDbToModelConverter.transform as jest.Mock).mockClear();
        (queryToFilterQueryConverter.transform as jest.Mock).mockClear();
        (postSearchFilter.filter as jest.Mock).mockClear();
      });

      it('must call queryToFilterQueryConverter.transform with the query received', () => {
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledTimes(1);
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledWith(
          expectedQuery,
        );
      });

      it('must call queryToFilterQueryConverter.transform with the query received', () => {
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledTimes(1);
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledWith(
          expectedQuery,
        );
      });

      it('must call collection.find with the querydb generated', () => {
        expect(collectionMock.find).toHaveBeenCalledTimes(1);
        expect(collectionMock.find).toHaveBeenCalledWith(expectedDbQuery, {});
      });

      it('must call postSearchFilter.filter with the query received and the entities found', () => {
        expect(postSearchFilter.filter).toHaveBeenCalledTimes(1);
        expect(postSearchFilter.filter).toHaveBeenCalledWith(
          [expectedModelDb],
          expectedQuery,
        );
      });

      it('must call modelDbToModelConverter.transform with the entities found', () => {
        expect(modelDbToModelConverter.transform).toHaveBeenCalledTimes(1);
        expect(modelDbToModelConverter.transform).toHaveBeenCalledWith(
          expectedModelDb,
        );
      });

      it('must return domain entities found', () => {
        expect(result).toStrictEqual([expectedModel]);
      });
    });

    describe('when called, having no postSearchFilter', () => {
      let expectedModelDb: ModelMockDb;
      let expectedModel: ModelMock;
      let expectedQuery: SearchQueryMock;
      let expectedDbQuery: mongodb.FilterQuery<ModelMockDb>;

      let result: unknown;

      beforeAll(async () => {
        expectedModel = {
          foo: FOO_VALUE,
        };
        expectedModelDb = {
          _id: new mongodb.ObjectID(),
          foo: FOO_VALUE,
        };
        expectedQuery = {
          id: expectedModelDb._id.toHexString(),
        };
        expectedDbQuery = {
          _id: expectedModelDb._id,
        };

        const findCursorMock: mongodb.Cursor<ModelMockDb> = ({
          toArray: jest.fn().mockResolvedValueOnce([expectedModelDb]),
        } as Partial<
          mongodb.Cursor<ModelMockDb>
        >) as mongodb.Cursor<ModelMockDb>;

        (collectionMock.find as jest.Mock).mockReturnValueOnce(findCursorMock);

        (mongoDbConnector.db.collection as jest.Mock).mockReturnValueOnce(
          collectionMock,
        );

        (modelDbToModelConverter.transform as jest.Mock).mockResolvedValueOnce(
          expectedModel,
        );

        (queryToFilterQueryConverter.transform as jest.Mock).mockResolvedValueOnce(
          expectedDbQuery,
        );

        result = await noPostSearchFilterMongoDbSearchRepository.find(
          expectedQuery,
        );
      });

      afterAll(() => {
        (collectionMock.find as jest.Mock).mockClear();
        (mongoDbConnector.db.collection as jest.Mock).mockClear();
        (modelDbToModelConverter.transform as jest.Mock).mockClear();
        (queryToFilterQueryConverter.transform as jest.Mock).mockClear();
      });

      it('must call queryToFilterQueryConverter.transform with the query received', () => {
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledTimes(1);
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledWith(
          expectedQuery,
        );
      });

      it('must call queryToFilterQueryConverter.transform with the query received', () => {
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledTimes(1);
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledWith(
          expectedQuery,
        );
      });

      it('must call collection.find with the querydb generated', () => {
        expect(collectionMock.find).toHaveBeenCalledTimes(1);
        expect(collectionMock.find).toHaveBeenCalledWith(expectedDbQuery, {});
      });

      it('must call modelDbToModelConverter.transform with the entities found', () => {
        expect(modelDbToModelConverter.transform).toHaveBeenCalledTimes(1);
        expect(modelDbToModelConverter.transform).toHaveBeenCalledWith(
          expectedModelDb,
        );
      });

      it('must return domain entities found', () => {
        expect(result).toStrictEqual([expectedModel]);
      });
    });
  });

  describe('.findOne()', () => {
    describe('when called', () => {
      let expectedModelDb: ModelMockDb;
      let expectedModel: ModelMock;
      let expectedQuery: SearchQueryMock;
      let expectedDbQuery: mongodb.FilterQuery<ModelMockDb>;

      let result: unknown;

      beforeAll(async () => {
        expectedModel = {
          foo: FOO_VALUE,
        };
        expectedModelDb = {
          _id: new mongodb.ObjectID(),
          foo: FOO_VALUE,
        };
        expectedQuery = {
          id: expectedModelDb._id.toHexString(),
        };
        expectedDbQuery = {
          _id: expectedModelDb._id,
        };

        (collectionMock.findOne as jest.Mock).mockResolvedValueOnce(
          expectedModelDb,
        );

        (mongoDbConnector.db.collection as jest.Mock).mockReturnValueOnce(
          collectionMock,
        );

        (modelDbToModelConverter.transform as jest.Mock).mockResolvedValueOnce(
          expectedModel,
        );

        (queryToFilterQueryConverter.transform as jest.Mock).mockResolvedValueOnce(
          expectedDbQuery,
        );

        (postSearchFilter.filterOne as jest.Mock).mockResolvedValueOnce(
          expectedModelDb,
        );

        result = await mongoDbSearchRepository.findOne(expectedQuery);
      });

      afterAll(() => {
        (collectionMock.findOne as jest.Mock).mockClear();
        (mongoDbConnector.db.collection as jest.Mock).mockClear();
        (modelDbToModelConverter.transform as jest.Mock).mockClear();
        (queryToFilterQueryConverter.transform as jest.Mock).mockClear();
        (postSearchFilter.filterOne as jest.Mock).mockClear();
      });

      it('must call queryToFilterQueryConverter.transform with the query received', () => {
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledTimes(1);
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledWith(
          expectedQuery,
        );
      });

      it('must call queryToFilterQueryConverter.transform with the query received', () => {
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledTimes(1);
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledWith(
          expectedQuery,
        );
      });

      it('must call collection.findOne with the querydb generated', () => {
        expect(collectionMock.findOne).toHaveBeenCalledTimes(1);
        expect(collectionMock.findOne).toHaveBeenCalledWith(
          expectedDbQuery,
          {},
        );
      });

      it('must call postSearchFilter.filterOne with the query received and the entities found', () => {
        expect(postSearchFilter.filterOne).toHaveBeenCalledTimes(1);
        expect(postSearchFilter.filterOne).toHaveBeenCalledWith(
          expectedModelDb,
          expectedQuery,
        );
      });

      it('must call modelDbToModelConverter.transform with the entities found', () => {
        expect(modelDbToModelConverter.transform).toHaveBeenCalledTimes(1);
        expect(modelDbToModelConverter.transform).toHaveBeenCalledWith(
          expectedModelDb,
        );
      });

      it('must return domain entities found', () => {
        expect(result).toStrictEqual(expectedModel);
      });
    });

    describe('when called, having no postSearchFilter', () => {
      let expectedModelDb: ModelMockDb;
      let expectedModel: ModelMock;
      let expectedQuery: SearchQueryMock;
      let expectedDbQuery: mongodb.FilterQuery<ModelMockDb>;

      let result: unknown;

      beforeAll(async () => {
        expectedModel = {
          foo: FOO_VALUE,
        };
        expectedModelDb = {
          _id: new mongodb.ObjectID(),
          foo: FOO_VALUE,
        };
        expectedQuery = {
          id: expectedModelDb._id.toHexString(),
        };
        expectedDbQuery = {
          _id: expectedModelDb._id,
        };

        (collectionMock.findOne as jest.Mock).mockResolvedValueOnce(
          expectedModelDb,
        );

        (mongoDbConnector.db.collection as jest.Mock).mockReturnValueOnce(
          collectionMock,
        );

        (modelDbToModelConverter.transform as jest.Mock).mockResolvedValueOnce(
          expectedModel,
        );

        (queryToFilterQueryConverter.transform as jest.Mock).mockResolvedValueOnce(
          expectedDbQuery,
        );

        result = await noPostSearchFilterMongoDbSearchRepository.findOne(
          expectedQuery,
        );
      });

      afterAll(() => {
        (collectionMock.findOne as jest.Mock).mockClear();
        (mongoDbConnector.db.collection as jest.Mock).mockClear();
        (modelDbToModelConverter.transform as jest.Mock).mockClear();
        (queryToFilterQueryConverter.transform as jest.Mock).mockClear();
      });

      it('must call queryToFilterQueryConverter.transform with the query received', () => {
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledTimes(1);
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledWith(
          expectedQuery,
        );
      });

      it('must call queryToFilterQueryConverter.transform with the query received', () => {
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledTimes(1);
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledWith(
          expectedQuery,
        );
      });

      it('must call collection.findOne with the querydb generated', () => {
        expect(collectionMock.findOne).toHaveBeenCalledTimes(1);
        expect(collectionMock.findOne).toHaveBeenCalledWith(
          expectedDbQuery,
          {},
        );
      });

      it('must call modelDbToModelConverter.transform with the entities found', () => {
        expect(modelDbToModelConverter.transform).toHaveBeenCalledTimes(1);
        expect(modelDbToModelConverter.transform).toHaveBeenCalledWith(
          expectedModelDb,
        );
      });

      it('must return domain entities found', () => {
        expect(result).toStrictEqual(expectedModel);
      });
    });
  });
});
