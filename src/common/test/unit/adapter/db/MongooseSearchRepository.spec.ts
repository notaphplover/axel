/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Document, FilterQuery, Model } from 'mongoose';
import { Converter } from '../../../../domain';
import { MongooseSearchRepository } from '../../../../adapter';

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
  let modelDbToModelPort: Converter<ModelMock, ModelMockDb>;
  let queryToFilterQueryPort: Converter<QueryMock, FilterQuery<ModelMockDb>>;
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
    modelDbToModelPort = {
      transform: jest.fn(),
    };
    queryToFilterQueryPort = { transform: jest.fn() };

    mongooseSearchRepository = new MongooseSearchRepositoryMock(
      model,
      modelDbToModelPort,
      queryToFilterQueryPort,
    );
  });

  describe(`.${MongooseSearchRepository.prototype.find.name}`, () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (model.find as jest.Mock).mockResolvedValueOnce([modelMockDbFixture]);
        (modelDbToModelPort.transform as jest.Mock).mockReturnValueOnce(
          modelMockFixture,
        );
        (queryToFilterQueryPort.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );

        result = await mongooseSearchRepository.find(queryMockFixture);
      });

      it('must call queryToFilterQueryPort.transform()', () => {
        expect(queryToFilterQueryPort.transform).toHaveBeenCalledTimes(1);
        expect(queryToFilterQueryPort.transform).toHaveBeenCalledWith(
          queryMockFixture,
        );
      });

      it(`must call model.${Model.find.name}()`, () => {
        expect(model.find).toHaveBeenCalledTimes(1);
        expect(model.find).toHaveBeenCalledWith(queryMockDbFixture);
      });

      it('must call modelDbToModelPort.transform()', () => {
        expect(modelDbToModelPort.transform).toHaveBeenCalledTimes(1);
        expect(modelDbToModelPort.transform).toHaveBeenCalledWith(
          modelMockDbFixture,
        );
      });

      it('must return a model', () => {
        expect(result).toStrictEqual([modelMockFixture]);
      });
    });
  });
});
