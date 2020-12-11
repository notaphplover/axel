/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Converter, Filter } from '../../../../../common/domain';
import { Document, FilterQuery, Model, Query } from 'mongoose';
import { MongooseProjectionSearchRepository } from '../../../../../integration-modules/mongoose/adapter/MongooseProjectionSearchRepository';

class ModelMock {
  constructor(public foo: string) {}
}

class QueryMock {
  constructor(public foo: string) {}
}

type ModelMockDb = ModelMock & Document;

class MongooseProjectionSearchRepositoryMock extends MongooseProjectionSearchRepository<
  ModelMock,
  ModelMockDb,
  ModelMockDb,
  QueryMock
> {}

const FOO_VALUE: string = 'bar';

const modelMockFixture: ModelMock = { foo: FOO_VALUE };
const modelMockDbFixture: ModelMockDb = { foo: FOO_VALUE } as ModelMockDb;
const queryMockFixture: QueryMock = { foo: FOO_VALUE };
const queryMockDbFixture: FilterQuery<ModelMockDb> = { foo: FOO_VALUE };

describe(MongooseProjectionSearchRepository.name, () => {
  let findDocumentQueryMock: Query<ModelMockDb[], ModelMockDb>;
  let findOneDocumentQueryMock: Query<ModelMockDb | null, ModelMockDb>;
  let modelMock: Model<ModelMockDb>;
  let modelDbToModelConverter: Converter<
    ModelMock,
    ModelMockDb | Promise<ModelMockDb>
  >;
  let queryToFilterQueryConverter: Converter<
    QueryMock,
    FilterQuery<ModelMockDb> | Promise<FilterQuery<ModelMockDb>>
  >;
  let nullPostSearchFilter: null;
  let nonNullPostSearchFilter: Filter<ModelMockDb, QueryMock>;

  let nullProjectionFixture: null;
  let nonNullProjectionFixture: unknown;

  let noPostSearchMongooseProjectionSearchRepository: MongooseProjectionSearchRepository<
    ModelMock,
    ModelMockDb,
    ModelMockDb,
    QueryMock
  >;

  let postSearchMongooseProjectionSearchRepository: MongooseProjectionSearchRepository<
    ModelMock,
    ModelMockDb,
    ModelMockDb,
    QueryMock
  >;

  let projectionMongooseProjectionSearchRepository: MongooseProjectionSearchRepository<
    ModelMock,
    ModelMockDb,
    ModelMockDb,
    QueryMock
  >;

  beforeAll(() => {
    findDocumentQueryMock = ({
      select: jest.fn().mockReturnThis(),
      then: jest.fn(),
    } as Partial<Query<ModelMockDb[], ModelMockDb>>) as Query<
      ModelMockDb[],
      ModelMockDb
    >;
    findOneDocumentQueryMock = ({
      select: jest.fn().mockReturnThis(),
      then: jest.fn(),
    } as Partial<Query<ModelMockDb | null, ModelMockDb>>) as Query<
      ModelMockDb | null,
      ModelMockDb
    >;
    modelMock = ({
      find: jest.fn().mockReturnValue(findDocumentQueryMock),
      findOne: jest.fn().mockReturnValue(findOneDocumentQueryMock),
    } as Partial<Model<ModelMockDb>>) as Model<ModelMockDb>;
    modelDbToModelConverter = {
      transform: jest.fn(),
    };
    queryToFilterQueryConverter = { transform: jest.fn() };
    nullPostSearchFilter = null;
    nonNullPostSearchFilter = {
      filter: jest.fn(),
      filterOne: jest.fn(),
    };

    nullProjectionFixture = null;
    nonNullProjectionFixture = 'test-mongoose-projection-fixture';

    noPostSearchMongooseProjectionSearchRepository = new MongooseProjectionSearchRepositoryMock(
      modelMock,
      modelDbToModelConverter,
      queryToFilterQueryConverter,
      nullProjectionFixture,
      nullPostSearchFilter,
    );

    postSearchMongooseProjectionSearchRepository = new MongooseProjectionSearchRepositoryMock(
      modelMock,
      modelDbToModelConverter,
      queryToFilterQueryConverter,
      nullProjectionFixture,
      nonNullPostSearchFilter,
    );

    projectionMongooseProjectionSearchRepository = new MongooseProjectionSearchRepositoryMock(
      modelMock,
      modelDbToModelConverter,
      queryToFilterQueryConverter,
      nonNullProjectionFixture,
      nullPostSearchFilter,
    );
  });

  describe(`.${MongooseProjectionSearchRepository.prototype.find.name}`, () => {
    describe('when called, and no post search filter is established', () => {
      let result: unknown;

      beforeAll(async () => {
        (findDocumentQueryMock.then as jest.Mock).mockImplementationOnce(
          (onFullfiled: (value: ModelMockDb[]) => void) => {
            onFullfiled([modelMockDbFixture]);
          },
        );
        (modelDbToModelConverter.transform as jest.Mock).mockReturnValueOnce(
          modelMockFixture,
        );
        (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );

        result = await noPostSearchMongooseProjectionSearchRepository.find(
          queryMockFixture,
        );
      });

      afterAll(() => {
        (findDocumentQueryMock.then as jest.Mock).mockClear();
        (modelDbToModelConverter.transform as jest.Mock).mockClear();
        (queryToFilterQueryConverter.transform as jest.Mock).mockClear();
      });

      it('must call queryToFilterQueryPort.transform()', () => {
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledTimes(1);
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledWith(
          queryMockFixture,
        );
      });

      it(`must call model.${Model.find.name}()`, () => {
        expect(modelMock.find).toHaveBeenCalledTimes(1);
        expect(modelMock.find).toHaveBeenCalledWith(queryMockDbFixture);
      });

      it('must call modelDbToModelPort.transform()', () => {
        expect(modelDbToModelConverter.transform).toHaveBeenCalledTimes(1);
        expect(modelDbToModelConverter.transform).toHaveBeenCalledWith(
          modelMockDbFixture,
        );
      });

      it('must return a model', () => {
        expect(result).toStrictEqual([modelMockFixture]);
      });
    });

    describe('when called, and a post search filter is established', () => {
      let result: unknown;

      beforeAll(async () => {
        (findDocumentQueryMock.then as jest.Mock).mockImplementationOnce(
          (onFullfiled: (value: ModelMockDb[]) => void) => {
            onFullfiled([modelMockDbFixture]);
          },
        );
        (modelDbToModelConverter.transform as jest.Mock).mockReturnValueOnce(
          modelMockFixture,
        );
        (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );
        (nonNullPostSearchFilter.filter as jest.Mock).mockResolvedValueOnce([
          modelMockDbFixture,
        ]);

        result = await postSearchMongooseProjectionSearchRepository.find(
          queryMockFixture,
        );
      });

      afterAll(() => {
        (findDocumentQueryMock.then as jest.Mock).mockClear();
        (modelDbToModelConverter.transform as jest.Mock).mockClear();
        (queryToFilterQueryConverter.transform as jest.Mock).mockClear();
        (nonNullPostSearchFilter.filter as jest.Mock).mockClear();
      });

      it('must call postSearchFilter.filter() with the models found', () => {
        expect(nonNullPostSearchFilter.filter).toHaveBeenCalledTimes(1);
        expect(nonNullPostSearchFilter.filter).toHaveBeenCalledWith(
          [modelMockDbFixture],
          queryMockFixture,
        );
      });

      it('must return a model', () => {
        expect(result).toStrictEqual([modelMockFixture]);
      });
    });

    describe('when called, and a projection is established', () => {
      let result: unknown;

      beforeAll(async () => {
        (findDocumentQueryMock.then as jest.Mock).mockImplementationOnce(
          (onFullfiled: (value: ModelMockDb[]) => void) => {
            onFullfiled([modelMockDbFixture]);
          },
        );
        (modelDbToModelConverter.transform as jest.Mock).mockReturnValueOnce(
          modelMockFixture,
        );
        (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );
        (nonNullPostSearchFilter.filter as jest.Mock).mockResolvedValueOnce([
          modelMockDbFixture,
        ]);

        result = await projectionMongooseProjectionSearchRepository.find(
          queryMockFixture,
        );
      });

      afterAll(() => {
        (findDocumentQueryMock.then as jest.Mock).mockClear();
        (modelDbToModelConverter.transform as jest.Mock).mockClear();
        (queryToFilterQueryConverter.transform as jest.Mock).mockClear();
        (nonNullPostSearchFilter.filter as jest.Mock).mockClear();
      });

      it('must call query.select() with the projection', () => {
        expect(findDocumentQueryMock.select).toHaveBeenCalledTimes(1);
        expect(findDocumentQueryMock.select).toHaveBeenCalledWith(
          nonNullProjectionFixture,
        );
      });

      it('must return a model', () => {
        expect(result).toStrictEqual([modelMockFixture]);
      });
    });
  });

  describe(`.${MongooseProjectionSearchRepository.prototype.findOne.name}`, () => {
    describe('when called, and no post search filter is established', () => {
      let result: unknown;

      beforeAll(async () => {
        (findOneDocumentQueryMock.then as jest.Mock).mockImplementationOnce(
          (onFullfiled: (value: ModelMockDb | null) => void) => {
            onFullfiled(modelMockDbFixture);
          },
        );
        (modelDbToModelConverter.transform as jest.Mock).mockReturnValueOnce(
          modelMockFixture,
        );
        (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );

        result = await noPostSearchMongooseProjectionSearchRepository.findOne(
          queryMockFixture,
        );
      });

      afterAll(() => {
        (findOneDocumentQueryMock.then as jest.Mock).mockClear();
        (modelDbToModelConverter.transform as jest.Mock).mockClear();
        (queryToFilterQueryConverter.transform as jest.Mock).mockClear();
      });

      it('must call queryToFilterQueryPort.transform()', () => {
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledTimes(1);
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledWith(
          queryMockFixture,
        );
      });

      it(`must call model.${Model.findOne.name}()`, () => {
        expect(modelMock.findOne).toHaveBeenCalledTimes(1);
        expect(modelMock.findOne).toHaveBeenCalledWith(queryMockDbFixture);
      });

      it('must call modelDbToModelPort.transform()', () => {
        expect(modelDbToModelConverter.transform).toHaveBeenCalledTimes(1);
        expect(modelDbToModelConverter.transform).toHaveBeenCalledWith(
          modelMockDbFixture,
        );
      });

      it('must return a model', () => {
        expect(result).toStrictEqual(modelMockFixture);
      });
    });

    describe('when called, and a post search filter is established', () => {
      let result: unknown;

      beforeAll(async () => {
        (findOneDocumentQueryMock.then as jest.Mock).mockImplementationOnce(
          (onFullfiled: (value: ModelMockDb | null) => void) => {
            onFullfiled(modelMockDbFixture);
          },
        );
        (modelDbToModelConverter.transform as jest.Mock).mockReturnValueOnce(
          modelMockFixture,
        );
        (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );
        (nonNullPostSearchFilter.filterOne as jest.Mock).mockResolvedValueOnce(
          modelMockDbFixture,
        );

        result = await postSearchMongooseProjectionSearchRepository.findOne(
          queryMockFixture,
        );
      });

      afterAll(() => {
        (findOneDocumentQueryMock.then as jest.Mock).mockClear();
        (modelDbToModelConverter.transform as jest.Mock).mockClear();
        (queryToFilterQueryConverter.transform as jest.Mock).mockClear();
        (nonNullPostSearchFilter.filterOne as jest.Mock).mockClear();
      });

      it('must call postSearchFilter.filterOne() with the models found', () => {
        expect(nonNullPostSearchFilter.filterOne).toHaveBeenCalledTimes(1);
        expect(nonNullPostSearchFilter.filterOne).toHaveBeenCalledWith(
          modelMockDbFixture,
          queryMockFixture,
        );
      });

      it('must return a model', () => {
        expect(result).toStrictEqual(modelMockFixture);
      });
    });

    describe('when called, and a projection is established', () => {
      let result: unknown;

      beforeAll(async () => {
        (findOneDocumentQueryMock.then as jest.Mock).mockImplementationOnce(
          (onFullfiled: (value: ModelMockDb | null) => void) => {
            onFullfiled(modelMockDbFixture);
          },
        );
        (modelDbToModelConverter.transform as jest.Mock).mockReturnValueOnce(
          modelMockFixture,
        );
        (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );
        (nonNullPostSearchFilter.filter as jest.Mock).mockResolvedValueOnce([
          modelMockDbFixture,
        ]);

        result = await projectionMongooseProjectionSearchRepository.findOne(
          queryMockFixture,
        );
      });

      afterAll(() => {
        (findOneDocumentQueryMock.then as jest.Mock).mockClear();
        (modelDbToModelConverter.transform as jest.Mock).mockClear();
        (queryToFilterQueryConverter.transform as jest.Mock).mockClear();
        (nonNullPostSearchFilter.filter as jest.Mock).mockClear();
      });

      it('must call query.select() with the projection', () => {
        expect(findOneDocumentQueryMock.select).toHaveBeenCalledTimes(1);
        expect(findOneDocumentQueryMock.select).toHaveBeenCalledWith(
          nonNullProjectionFixture,
        );
      });

      it('must return a model', () => {
        expect(result).toStrictEqual(modelMockFixture);
      });
    });
  });
});
