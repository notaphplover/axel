/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Document, Model } from 'mongoose';
import { Converter } from '../../../../../common/domain';
import { EntitiesNotCreatedError } from '../../../../../layer-modules/db/domain/exception/EntitiesNotCreatedError';
import { MongoError } from 'mongodb';
import { MongooseInsertRepository } from '../../../adapter/MongooseInsertRepository';

class ModelMock {
  constructor(public foo: string) {}
}

type ModelMockDb = ModelMock & Document;

type QueryMock = ModelMock;

class MongooseInsertRepositoryMock extends MongooseInsertRepository<
  ModelMock,
  QueryMock,
  ModelMockDb
> {}

const FOO_VALUE: string = 'bar';

const modelMockFixture: ModelMock = { foo: FOO_VALUE };
const modelMockDbFixture: ModelMockDb = { foo: FOO_VALUE } as ModelMockDb;
const queryMockFixture: QueryMock = { foo: FOO_VALUE };

describe(MongooseInsertRepository.name, () => {
  let model: Model<ModelMockDb>;
  let modelDbToModelConverter: Converter<
    ModelMockDb,
    ModelMock | Promise<ModelMock>
  >;
  let queryToInputModelDbs: Converter<
    QueryMock,
    ModelMockDb[] | Promise<ModelMockDb[]>
  >;

  let mongooseInsertRepository: MongooseInsertRepository<
    ModelMock,
    ModelMock,
    ModelMockDb
  >;

  beforeAll(() => {
    model = ({
      insertMany: jest.fn(),
    } as Partial<Model<ModelMockDb>>) as Model<ModelMockDb>;
    modelDbToModelConverter = {
      transform: jest.fn(),
    };

    queryToInputModelDbs = {
      transform: jest.fn(),
    };

    mongooseInsertRepository = new MongooseInsertRepositoryMock(
      model,
      modelDbToModelConverter,
      queryToInputModelDbs,
    );
  });

  describe(`.${MongooseInsertRepository.prototype.insert.name}`, () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (model.insertMany as jest.Mock).mockResolvedValueOnce([
          modelMockDbFixture,
        ]);
        (modelDbToModelConverter.transform as jest.Mock).mockReturnValueOnce(
          modelMockFixture,
        );
        (queryToInputModelDbs.transform as jest.Mock).mockReturnValueOnce([
          modelMockDbFixture,
        ]);

        result = await mongooseInsertRepository.insert(queryMockFixture);
      });

      it('must call modelToModelDbPort.transform()', () => {
        expect(queryToInputModelDbs.transform).toHaveBeenCalledTimes(1);
        expect(queryToInputModelDbs.transform).toHaveBeenCalledWith(
          queryMockFixture,
        );
      });

      it(`must call model.${Model.insertMany.name}()`, () => {
        expect(model.insertMany).toHaveBeenCalledTimes(1);
        expect(model.insertMany).toHaveBeenCalledWith([modelMockDbFixture]);
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

    describe('when called, and a duplicated key error is thrown', () => {
      let result: unknown;

      beforeAll(async () => {
        const errorFixture: MongoError = new MongoError(
          'Test when a duplicate key error is throown',
        );
        errorFixture.code = 11000;

        (model.insertMany as jest.Mock).mockRejectedValueOnce(errorFixture);

        (queryToInputModelDbs.transform as jest.Mock).mockReturnValueOnce([
          modelMockDbFixture,
        ]);

        try {
          result = await mongooseInsertRepository.insert(queryMockFixture);
        } catch (err) {
          result = err;
        }
      });

      it('must throw a EntitiesNotCreatedError', () => {
        expect(result).toBeInstanceOf(EntitiesNotCreatedError);
      });
    });
  });
});