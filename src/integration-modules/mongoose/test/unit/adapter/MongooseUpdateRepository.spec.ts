/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';

import mongoose, {
  ClientSession,
  Document,
  DocumentQuery,
  FilterQuery,
  Model,
  UpdateQuery,
} from 'mongoose';

let mongooseMock: typeof mongoose;

let mongooseStartSessionMock: ClientSession;

jest.mock('mongoose', () => {
  mongooseStartSessionMock = ({
    commitTransaction: jest.fn().mockResolvedValue(undefined),
    endSession: jest.fn(),
    startTransaction: jest.fn(),
  } as Partial<ClientSession>) as ClientSession;

  mongooseMock = ({
    startSession: jest.fn().mockResolvedValue(mongooseStartSessionMock),
  } as Partial<typeof mongoose>) as typeof mongoose;

  return mongooseMock;
});

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
const modelMockDbFixture: ModelMockDb = { foo: FOO_VALUE + '2' } as ModelMockDb;
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
      session: jest.fn().mockReturnThis(),
      then: jest.fn(),
    } as Partial<DocumentQuery<ModelMockDb[], ModelMockDb>>) as DocumentQuery<
      ModelMockDb[],
      ModelMockDb
    >;
    findOneDocumentQueryMock = ({
      select: jest.fn().mockReturnThis(),
      session: jest.fn().mockReturnThis(),
      then: jest.fn(),
    } as Partial<
      DocumentQuery<ModelMockDb | null, ModelMockDb>
    >) as DocumentQuery<ModelMockDb | null, ModelMockDb>;

    modelMock = ({
      find: jest.fn().mockReturnValue(findDocumentQueryMock),
      findOne: jest.fn().mockReturnValue(findOneDocumentQueryMock),
      updateMany: jest.fn().mockResolvedValue(undefined),
      updateOne: jest.fn().mockResolvedValue(undefined),
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

  describe(`.update()`, () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );

        (queryToUpdateQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );

        (findDocumentQueryMock.then as jest.Mock).mockImplementationOnce(
          (onFullfiled: (value: ModelMockDb[]) => void) => {
            onFullfiled([modelMockDbFixture]);
          },
        );

        (modelDbToModelConverter.transform as jest.Mock).mockResolvedValueOnce(
          modelMockFixture,
        );

        result = await mongooseUpdateRepository.update(queryMockFixture);
      });

      it('must start a session', () => {
        expect(mongooseMock.startSession).toHaveBeenCalledTimes(1);
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
          { session: mongooseStartSessionMock },
        );
      });

      it('must commit the transaction', () => {
        expect(
          mongooseStartSessionMock.commitTransaction,
        ).toHaveBeenCalledTimes(1);
      });

      it('must end the session started', () => {
        expect(mongooseStartSessionMock.endSession).toHaveBeenCalledTimes(1);
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
});
