/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import mongodb from 'mongodb';

import { Capsule, Converter } from '../../../../../common/domain';
import { dbTest } from '../../../../../layer-modules/db/test';
import { Document } from '../../../adapter/model/Document';
import { MongoDbConnector } from '../../../adapter/MongoDbConnector';
import { MongoDbInsertRepository } from '../../../adapter/MongoDbInsertRepository';

class ModelMock {
  constructor(public foo: string) {}
}

class InsertQueryMock {
  constructor(public foo: string) {}
}

type ModelMockDb = ModelMock & Document;

class MongoDbInsertRepositoryMock extends MongoDbInsertRepository<
  ModelMock,
  ModelMockDb,
  InsertQueryMock
> {}

const collectionName: string = 'MongoDbInsertRepositoryIntegrationTests';

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

mongodbIntegrationDescribeGenerator(outputParam)(
  MongoDbInsertRepository.name,
  () => {
    let modelDbToModelConverter: Converter<
      ModelMockDb,
      ModelMock | Promise<ModelMock>
    >;
    let mongoDbConnector: MongoDbConnector;

    let queryToInputModelDbs: Converter<
      InsertQueryMock,
      | mongodb.OptionalId<ModelMockDb>[]
      | Promise<mongodb.OptionalId<ModelMockDb>[]>
    >;

    let mongoDbInsertRepository: MongoDbInsertRepositoryMock;

    beforeAll(() => {
      modelDbToModelConverter = {
        transform: jest.fn(),
      };

      mongoDbConnector = outputParam.elem as MongoDbConnector;

      queryToInputModelDbs = {
        transform: jest.fn(),
      };

      mongoDbInsertRepository = new MongoDbInsertRepositoryMock(
        collectionName,
        modelDbToModelConverter,
        mongoDbConnector,
        queryToInputModelDbs,
      );
    });

    describe('.insert()', () => {
      let result: unknown;

      let insertQueryMock: InsertQueryMock;
      let modelMockFixture: ModelMock;

      beforeAll(async () => {
        modelMockFixture = {
          foo: 'bar',
        };

        insertQueryMock = {
          foo: modelMockFixture.foo,
        };

        (modelDbToModelConverter.transform as jest.Mock).mockResolvedValueOnce(
          modelMockFixture,
        );

        (queryToInputModelDbs.transform as jest.Mock).mockResolvedValueOnce([
          {
            foo: modelMockFixture.foo,
          },
        ]);

        result = await mongoDbInsertRepository.insert(insertQueryMock);
      });

      it('must call modelDbToModelConverter.transform with the db entity received', () => {
        expect(modelDbToModelConverter.transform).toHaveBeenCalledTimes(1);
        expect(modelDbToModelConverter.transform).toHaveBeenCalledWith({
          _id: expect.any(mongodb.ObjectID) as mongodb.ObjectID,
          foo: modelMockFixture.foo,
        });
      });

      it('must return domain entities tranformed from db entities', () => {
        expect(result).toStrictEqual([modelMockFixture]);
      });
    });
  },
);
