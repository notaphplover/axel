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
  const localMongooseStartSessionMock: ClientSession = ({
    commitTransaction: jest.fn().mockResolvedValue(undefined),
    endSession: jest.fn(),
    startTransaction: jest.fn(),
  } as Partial<ClientSession>) as ClientSession;

  const localMongooseMock: typeof mongoose = ({
    startSession: jest.fn().mockResolvedValue(localMongooseStartSessionMock),
  } as Partial<typeof mongoose>) as typeof mongoose;

  /*
   * https://github.com/facebook/jest/issues/2567
   *
   * The argument is not good enough, a general rule to solve an specific use case... disgusting.
   */
  mongooseStartSessionMock = localMongooseStartSessionMock;
  mongooseMock = localMongooseMock;

  return localMongooseMock;
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

      afterAll(() => {
        (mongooseMock.startSession as jest.Mock).mockClear();

        (mongooseStartSessionMock.commitTransaction as jest.Mock).mockClear();
        (mongooseStartSessionMock.startTransaction as jest.Mock).mockClear();
        (mongooseStartSessionMock.endSession as jest.Mock).mockClear();

        (findDocumentQueryMock.select as jest.Mock).mockClear();
        (findDocumentQueryMock.session as jest.Mock).mockClear();

        (modelMock.find as jest.Mock).mockClear();
        (modelMock.updateMany as jest.Mock).mockClear();

        (modelDbToModelConverter.transform as jest.Mock).mockClear();

        (queryToFilterQueryConverter.transform as jest.Mock).mockClear();

        (queryToUpdateQueryConverter.transform as jest.Mock).mockClear();
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

  describe(`.updateOne()`, () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (mongooseMock.startSession as jest.Mock).mockClear();

        (mongooseStartSessionMock.commitTransaction as jest.Mock).mockClear();
        (mongooseStartSessionMock.startTransaction as jest.Mock).mockClear();
        (mongooseStartSessionMock.endSession as jest.Mock).mockClear();

        (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );

        (queryToUpdateQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );

        (findOneDocumentQueryMock.then as jest.Mock).mockImplementationOnce(
          (onFullfiled: (value: ModelMockDb) => void) => {
            onFullfiled(modelMockDbFixture);
          },
        );

        (modelDbToModelConverter.transform as jest.Mock).mockResolvedValueOnce(
          modelMockFixture,
        );

        result = await mongooseUpdateRepository.updateOne(queryMockFixture);
      });

      afterAll(() => {
        (findOneDocumentQueryMock.select as jest.Mock).mockClear();
        (findOneDocumentQueryMock.session as jest.Mock).mockClear();

        (modelMock.findOne as jest.Mock).mockClear();
        (modelMock.updateOne as jest.Mock).mockClear();

        (modelDbToModelConverter.transform as jest.Mock).mockClear();

        (queryToFilterQueryConverter.transform as jest.Mock).mockClear();

        (queryToUpdateQueryConverter.transform as jest.Mock).mockClear();
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

      it('it must call model.updateOne with the queries obtained', () => {
        expect(modelMock.updateOne).toHaveBeenCalledTimes(1);
        expect(modelMock.updateOne).toHaveBeenCalledWith(
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
        expect(result).toStrictEqual(modelMockFixture);
      });
    });
  });
});
