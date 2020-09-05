/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Document, Model } from 'mongoose';
import { Converter } from '../../../../domain';
import { MongooseInsertRepository } from '../../../../adapter';

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
  let modelDbToModelPort: Converter<ModelMockDb, ModelMock>;
  let modelToModelDbPort: Converter<ModelMock, ModelMockDb>;
  let mongooseInsertRepository: MongooseInsertRepository<
    ModelMock,
    ModelMockDb
  >;

  beforeAll(() => {
    model = ({
      insertMany: jest.fn(),
    } as Partial<Model<ModelMockDb>>) as Model<ModelMockDb>;
    modelDbToModelPort = {
      transform: jest.fn(),
    };

    modelToModelDbPort = {
      transform: jest.fn(),
    };

    mongooseInsertRepository = new MongooseInsertRepositoryMock(
      model,
      modelDbToModelPort,
      modelToModelDbPort,
    );
  });

  describe(`.${MongooseInsertRepository.prototype.insert.name}`, () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (model.insertMany as jest.Mock).mockResolvedValueOnce([
          modelMockDbFixture,
        ]);
        (modelDbToModelPort.transform as jest.Mock).mockReturnValueOnce(
          modelMockFixture,
        );
        (modelToModelDbPort.transform as jest.Mock).mockReturnValueOnce(
          modelMockDbFixture,
        );

        result = await mongooseInsertRepository.insert([modelMockFixture]);
      });

      it('must call modelToModelDbPort.transform()', () => {
        expect(modelToModelDbPort.transform).toHaveBeenCalledTimes(1);
        expect(modelToModelDbPort.transform).toHaveBeenCalledWith(
          modelMockFixture,
        );
      });

      it(`must call model.${Model.insertMany.name}()`, () => {
        expect(model.insertMany).toHaveBeenCalledTimes(1);
        expect(model.insertMany).toHaveBeenCalledWith([modelMockDbFixture]);
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
