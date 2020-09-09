/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Document, Model } from 'mongoose';
import { Converter } from '../../../../../common/domain';
import { MongooseInsertRepository } from '../../../adapter/MongooseInsertRepository';

class ModelMock {
  constructor(public foo: string) {}
}

type ModelMockDb = ModelMock & Document;

class MongooseInsertRepositoryMock extends MongooseInsertRepository<
  ModelMock,
  ModelMockDb
> {}

const FOO_VALUE: string = 'bar';

const modelMockFixture: ModelMock = { foo: FOO_VALUE };
const modelMockDbFixture: ModelMockDb = { foo: FOO_VALUE } as ModelMockDb;

describe(MongooseInsertRepository.name, () => {
  let model: Model<ModelMockDb>;
  let modelDbToModelConverter: Converter<ModelMockDb, ModelMock>;
  let modelToModelDbConverter: Converter<ModelMock, ModelMockDb>;
  let mongooseInsertRepository: MongooseInsertRepository<
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

    modelToModelDbConverter = {
      transform: jest.fn(),
    };

    mongooseInsertRepository = new MongooseInsertRepositoryMock(
      model,
      modelDbToModelConverter,
      modelToModelDbConverter,
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
        (modelToModelDbConverter.transform as jest.Mock).mockReturnValueOnce(
          modelMockDbFixture,
        );

        result = await mongooseInsertRepository.insert([modelMockFixture]);
      });

      it('must call modelToModelDbPort.transform()', () => {
        expect(modelToModelDbConverter.transform).toHaveBeenCalledTimes(1);
        expect(modelToModelDbConverter.transform).toHaveBeenCalledWith(
          modelMockFixture,
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
  });
});
