/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';

import {
  Document,
  DocumentQuery,
  FilterQuery,
  Model,
  UpdateQuery,
} from 'mongoose';

import { Converter } from '../../../../../common/domain';
import { MongooseUpdateRepository } from '../../../adapter/MongooseUpdateRepository';

class ModelMock {
  constructor(public foo: string) {}
}

class QueryMock {
  constructor(public foo: string) {}
}

type ModelMockDb = ModelMock & Document;

class MongooseUpdateRepositoryMock extends MongooseUpdateRepository<
  ModelMock,
  QueryMock,
  ModelMockDb
> {}

const FOO_VALUE: string = 'bar';

const modelMockFixture: ModelMock = { foo: FOO_VALUE + '1' };
const modelMockDbFixture: ModelMockDb = {
  _id: '5f5cb76c73fd1130685e00ec',
  foo: FOO_VALUE + '2',
} as ModelMockDb;
const queryMockFixture: QueryMock = { foo: FOO_VALUE + '3' };
const queryMockDbFixture: FilterQuery<ModelMockDb> = { foo: FOO_VALUE + '4' };

describe(MongooseUpdateRepository.name, () => {
  let findDocumentQueryMock: DocumentQuery<ModelMockDb[], ModelMockDb>;
  let findOneDocumentQueryMock: DocumentQuery<ModelMockDb | null, ModelMockDb>;

  let modelMock: Model<ModelMockDb>;

  let modelDbToModelConverter: Converter<
    ModelMock,
    ModelMockDb | Promise<ModelMockDb>
  >;
  let queryToFilterQueryConverter: Converter<
    QueryMock,
    FilterQuery<ModelMockDb> | Promise<FilterQuery<ModelMockDb>>
  >;
  let queryToUpdateQueryConverter: Converter<
    QueryMock,
    UpdateQuery<ModelMockDb> | Promise<UpdateQuery<ModelMockDb>>
  >;

  let mongooseUpdateRepository: MongooseUpdateRepositoryMock;

  beforeAll(() => {
    findDocumentQueryMock = ({
      select: jest.fn().mockReturnThis(),
      then: jest.fn(),
    } as Partial<DocumentQuery<ModelMockDb[], ModelMockDb>>) as DocumentQuery<
      ModelMockDb[],
      ModelMockDb
    >;
    findOneDocumentQueryMock = ({
      select: jest.fn().mockReturnThis(),
      then: jest.fn(),
    } as Partial<
      DocumentQuery<ModelMockDb | null, ModelMockDb>
    >) as DocumentQuery<ModelMockDb | null, ModelMockDb>;

    modelMock = ({
      find: jest.fn().mockReturnValue(findDocumentQueryMock),
      findOneAndUpdate: jest.fn().mockReturnValue(findOneDocumentQueryMock),
      updateOne: jest.fn().mockResolvedValue(undefined),
      updateMany: jest.fn().mockResolvedValue(undefined),
    } as Partial<Model<ModelMockDb>>) as Model<ModelMockDb>;

    modelDbToModelConverter = {
      transform: jest.fn(),
    };
    queryToFilterQueryConverter = { transform: jest.fn() };
    queryToUpdateQueryConverter = { transform: jest.fn() };

    mongooseUpdateRepository = new MongooseUpdateRepositoryMock(
      modelMock,
      modelDbToModelConverter,
      queryToFilterQueryConverter,
      queryToUpdateQueryConverter,
    );
  });

  describe('.update()', () => {
    describe('when called', () => {
      beforeAll(async () => {
        (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );

        (queryToUpdateQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );

        (findDocumentQueryMock.then as jest.Mock).mockImplementation(
          (onFullfiled: (value: ModelMockDb[]) => void) => {
            onFullfiled([modelMockDbFixture]);
          },
        );

        (modelDbToModelConverter.transform as jest.Mock).mockResolvedValueOnce(
          modelMockFixture,
        );

        await mongooseUpdateRepository.update(queryMockFixture);
      });

      afterAll(() => {
        (findOneDocumentQueryMock.select as jest.Mock).mockClear();

        (modelMock.updateMany as jest.Mock).mockClear();

        (modelDbToModelConverter.transform as jest.Mock).mockClear();

        (queryToFilterQueryConverter.transform as jest.Mock).mockClear();

        (queryToUpdateQueryConverter.transform as jest.Mock).mockClear();
      });

      it('must call queryToFilterQueryConverter.transform with the query provided', () => {
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledTimes(1);
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledWith(
          queryMockFixture,
        );
      });

      it('must call queryToUpdateQueryConverter.transform with the query provided', () => {
        expect(queryToUpdateQueryConverter.transform).toHaveBeenCalledTimes(1);
        expect(queryToUpdateQueryConverter.transform).toHaveBeenCalledWith(
          queryMockFixture,
        );
      });

      it('it must call model.updateMany with the queries obtained', () => {
        expect(modelMock.updateMany).toHaveBeenCalledTimes(1);
        expect(modelMock.updateMany).toHaveBeenCalledWith(
          queryMockDbFixture,
          queryMockDbFixture,
          {},
        );
      });
    });
  });

  describe('.updateAndSelect()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );

        (queryToUpdateQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );

        (findDocumentQueryMock.then as jest.Mock).mockImplementation(
          (onFullfiled: (value: ModelMockDb[]) => void) => {
            onFullfiled([modelMockDbFixture]);
          },
        );

        (modelDbToModelConverter.transform as jest.Mock).mockResolvedValueOnce(
          modelMockFixture,
        );

        result = await mongooseUpdateRepository.updateAndSelect(
          queryMockFixture,
        );
      });

      afterAll(() => {
        (findDocumentQueryMock.select as jest.Mock).mockClear();

        (modelMock.find as jest.Mock).mockClear();
        (modelMock.updateMany as jest.Mock).mockClear();

        (modelDbToModelConverter.transform as jest.Mock).mockClear();

        (queryToFilterQueryConverter.transform as jest.Mock).mockClear();

        (queryToUpdateQueryConverter.transform as jest.Mock).mockClear();
      });

      it('must call queryToFilterQueryConverter.transform with the query provided', () => {
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledTimes(1);
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledWith(
          queryMockFixture,
        );
      });

      it('must call queryToUpdateQueryConverter.transform with the query provided', () => {
        expect(queryToUpdateQueryConverter.transform).toHaveBeenCalledTimes(1);
        expect(queryToUpdateQueryConverter.transform).toHaveBeenCalledWith(
          queryMockFixture,
        );
      });

      it('must call model.find twice', () => {
        expect(modelMock.find).toHaveBeenCalledTimes(2);
      });

      it('must call model.find with the filter query obtained', () => {
        expect(modelMock.find).toHaveBeenNthCalledWith(1, queryMockDbFixture);
      });

      it('it must call model.updateMany with the queries obtained', () => {
        expect(modelMock.updateMany).toHaveBeenCalledTimes(1);
        expect(modelMock.updateMany).toHaveBeenCalledWith(
          {
            _id: {
              $in: [modelMockDbFixture._id],
            },
          },
          queryMockDbFixture,
        );
      });

      it('must call model.find with the entity ids obtained', () => {
        expect(modelMock.find).toHaveBeenNthCalledWith(2, {
          _id: {
            $in: [modelMockDbFixture._id],
          },
        });
      });

      it('must call modelDbToModelConverter.transform with the entities updated', () => {
        expect(modelDbToModelConverter.transform).toHaveBeenCalledTimes(1);
        expect(modelDbToModelConverter.transform).toHaveBeenCalledWith(
          modelMockDbFixture,
        );
      });

      it('must return the model transformed', () => {
        expect(result).toStrictEqual([modelMockFixture]);
      });
    });
  });

  describe('.updateOne()', () => {
    describe('when called', () => {
      beforeAll(async () => {
        (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );

        (queryToUpdateQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );

        (findDocumentQueryMock.then as jest.Mock).mockImplementation(
          (onFullfiled: (value: ModelMockDb[]) => void) => {
            onFullfiled([modelMockDbFixture]);
          },
        );

        (modelDbToModelConverter.transform as jest.Mock).mockResolvedValueOnce(
          modelMockFixture,
        );

        await mongooseUpdateRepository.updateOne(queryMockFixture);
      });

      afterAll(() => {
        (findOneDocumentQueryMock.select as jest.Mock).mockClear();

        (modelMock.updateOne as jest.Mock).mockClear();

        (modelDbToModelConverter.transform as jest.Mock).mockClear();

        (queryToFilterQueryConverter.transform as jest.Mock).mockClear();

        (queryToUpdateQueryConverter.transform as jest.Mock).mockClear();
      });

      it('must call queryToFilterQueryConverter.transform with the query provided', () => {
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledTimes(1);
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledWith(
          queryMockFixture,
        );
      });

      it('must call queryToUpdateQueryConverter.transform with the query provided', () => {
        expect(queryToUpdateQueryConverter.transform).toHaveBeenCalledTimes(1);
        expect(queryToUpdateQueryConverter.transform).toHaveBeenCalledWith(
          queryMockFixture,
        );
      });

      it('it must call model.updateOne with the queries obtained', () => {
        expect(modelMock.updateOne).toHaveBeenCalledTimes(1);
        expect(modelMock.updateOne).toHaveBeenCalledWith(
          queryMockDbFixture,
          queryMockDbFixture,
          {},
        );
      });
    });
  });

  describe('.updateOneAndSelect()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );

        (queryToUpdateQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );

        (findOneDocumentQueryMock.then as jest.Mock).mockImplementation(
          (onFullfiled: (value: ModelMockDb) => void) => {
            onFullfiled(modelMockDbFixture);
          },
        );

        (modelDbToModelConverter.transform as jest.Mock).mockResolvedValueOnce(
          modelMockFixture,
        );

        result = await mongooseUpdateRepository.updateOneAndSelect(
          queryMockFixture,
        );
      });

      afterAll(() => {
        (findOneDocumentQueryMock.select as jest.Mock).mockClear();

        (modelMock.findOneAndUpdate as jest.Mock).mockClear();

        (modelDbToModelConverter.transform as jest.Mock).mockClear();

        (queryToFilterQueryConverter.transform as jest.Mock).mockClear();

        (queryToUpdateQueryConverter.transform as jest.Mock).mockClear();
      });

      it('must call queryToFilterQueryConverter.transform with the query provided', () => {
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledTimes(1);
        expect(queryToFilterQueryConverter.transform).toHaveBeenCalledWith(
          queryMockFixture,
        );
      });

      it('must call queryToUpdateQueryConverter.transform with the query provided', () => {
        expect(queryToUpdateQueryConverter.transform).toHaveBeenCalledTimes(1);
        expect(queryToUpdateQueryConverter.transform).toHaveBeenCalledWith(
          queryMockFixture,
        );
      });

      it('it must call model.findOneAndUpdate with the queries obtained', () => {
        expect(modelMock.findOneAndUpdate).toHaveBeenCalledTimes(1);
        expect(modelMock.findOneAndUpdate).toHaveBeenCalledWith(
          queryMockDbFixture,
          queryMockDbFixture,
          {
            new: true,
          },
        );
      });

      it('must call modelDbToModelConverter.transform with the entities updated', () => {
        expect(modelDbToModelConverter.transform).toHaveBeenCalledTimes(1);
        expect(modelDbToModelConverter.transform).toHaveBeenCalledWith(
          modelMockDbFixture,
        );
      });

      it('must return the model transformed', () => {
        expect(result).toStrictEqual(modelMockFixture);
      });
    });
  });
});
