/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Document, FilterQuery, Model } from 'mongoose';
import { Converter } from '../../../../../common/domain';
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
  let mongooseSearchRepository: MongooseSearchRepository<
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

    mongooseSearchRepository = new MongooseSearchRepositoryMock(
      model,
      modelDbToModelConverter,
      queryToFilterQueryConverter,
    );
  });

  describe(`.${MongooseSearchRepository.prototype.find.name}`, () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (model.find as jest.Mock).mockResolvedValueOnce([modelMockDbFixture]);
        (modelDbToModelConverter.transform as jest.Mock).mockReturnValueOnce(
          modelMockFixture,
        );
        (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );

        result = await mongooseSearchRepository.find(queryMockFixture);
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
  });
});
