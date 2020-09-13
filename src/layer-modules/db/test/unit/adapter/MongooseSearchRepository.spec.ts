/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Converter, Filter } from '../../../../../common/domain';
import { Document, FilterQuery, Model } from 'mongoose';
import { MongooseSearchRepository } from '../../../adapter/MongooseSearchRepository';

class ModelMock {
  constructor(public foo: string) {}
}

class QueryMock {
  constructor(public foo: string) {}
}

type ModelMockDb = ModelMock & Document;

class MongooseSearchRepositoryMock extends MongooseSearchRepository<
  ModelMock,
  ModelMockDb,
  QueryMock
> {}

const FOO_VALUE: string = 'bar';

const modelMockFixture: ModelMock = { foo: FOO_VALUE };
const modelMockDbFixture: ModelMockDb = { foo: FOO_VALUE } as ModelMockDb;
const queryMockFixture: QueryMock = { foo: FOO_VALUE };
const queryMockDbFixture: FilterQuery<ModelMockDb> = { foo: FOO_VALUE };

describe(MongooseSearchRepository.name, () => {
  let model: Model<ModelMockDb>;
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

  let noPostSearchMongooseSearchRepository: MongooseSearchRepository<
    ModelMock,
    ModelMockDb,
    QueryMock
  >;

  let postSearchMongooseSearchRepository: MongooseSearchRepository<
    ModelMock,
    ModelMockDb,
    QueryMock
  >;

  beforeAll(() => {
    model = ({
      find: jest.fn(),
      findOne: jest.fn(),
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

    noPostSearchMongooseSearchRepository = new MongooseSearchRepositoryMock(
      model,
      modelDbToModelConverter,
      queryToFilterQueryConverter,
      nullPostSearchFilter,
    );

    postSearchMongooseSearchRepository = new MongooseSearchRepositoryMock(
      model,
      modelDbToModelConverter,
      queryToFilterQueryConverter,
      nonNullPostSearchFilter,
    );
  });

  describe(`.${MongooseSearchRepository.prototype.find.name}`, () => {
    describe('when called, and no post search filter is established', () => {
      let result: unknown;

      beforeAll(async () => {
        (model.find as jest.Mock).mockResolvedValueOnce([modelMockDbFixture]);
        (modelDbToModelConverter.transform as jest.Mock).mockReturnValueOnce(
          modelMockFixture,
        );
        (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );

        result = await noPostSearchMongooseSearchRepository.find(
          queryMockFixture,
        );
      });

      afterAll(() => {
        (model.find as jest.Mock).mockClear();
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
        expect(model.find).toHaveBeenCalledTimes(1);
        expect(model.find).toHaveBeenCalledWith(queryMockDbFixture);
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
        (model.find as jest.Mock).mockResolvedValueOnce([modelMockDbFixture]);
        (modelDbToModelConverter.transform as jest.Mock).mockReturnValueOnce(
          modelMockFixture,
        );
        (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );
        (nonNullPostSearchFilter.filter as jest.Mock).mockResolvedValueOnce([
          modelMockDbFixture,
        ]);

        result = await postSearchMongooseSearchRepository.find(
          queryMockFixture,
        );
      });

      afterAll(() => {
        (model.find as jest.Mock).mockClear();
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
  });

  describe(`.${MongooseSearchRepository.prototype.findOne.name}`, () => {
    describe('when called, and no post search filter is established', () => {
      let result: unknown;

      beforeAll(async () => {
        (model.findOne as jest.Mock).mockResolvedValueOnce(modelMockDbFixture);
        (modelDbToModelConverter.transform as jest.Mock).mockReturnValueOnce(
          modelMockFixture,
        );
        (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );

        result = await noPostSearchMongooseSearchRepository.findOne(
          queryMockFixture,
        );
      });

      afterAll(() => {
        (model.findOne as jest.Mock).mockClear();
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
        expect(model.findOne).toHaveBeenCalledTimes(1);
        expect(model.findOne).toHaveBeenCalledWith(queryMockDbFixture);
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
        (model.findOne as jest.Mock).mockResolvedValueOnce(modelMockDbFixture);
        (modelDbToModelConverter.transform as jest.Mock).mockReturnValueOnce(
          modelMockFixture,
        );
        (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );
        (nonNullPostSearchFilter.filterOne as jest.Mock).mockResolvedValueOnce(
          modelMockDbFixture,
        );

        result = await postSearchMongooseSearchRepository.findOne(
          queryMockFixture,
        );
      });

      afterAll(() => {
        (model.findOne as jest.Mock).mockClear();
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
  });
});
