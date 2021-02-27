import 'reflect-metadata';

let mongoClientDb: Db;
let mongoClient: MongoClient;

jest.mock('mongodb', () => {
  const mongoClientMock: MongoClient = ((): MongoClient => {
    const mongoClientDbMock: Db = ({} as Partial<Db>) as Db;
    const mongoClient: MongoClient = {} as MongoClient;

    mongoClient.close = jest.fn().mockResolvedValue(undefined);
    mongoClient.connect = jest.fn().mockResolvedValue(mongoClient);
    mongoClient.db = jest.fn().mockReturnValue(mongoClientDbMock);

    mongoClientDb = mongoClientDbMock;

    return mongoClient;
  })();

  mongoClient = mongoClientMock;

  return {
    MongoClient: mongoClientMock,
  };
});

import { Db, MongoClient } from 'mongodb';

import { DbDotEnvVariables } from '../../../../../layer-modules/db/adapter';
import { dbDotEnvVariablesFixtureFactory } from '../../../../../layer-modules/db/test/fixtures/adapter/env/fixtures';
import { EnvLoader } from '../../../../../layer-modules/env/domain';
import { MongoDbConnector } from '../../../adapter/MongoDbConnector';

describe(MongoDbConnector.name, () => {
  let dbEnvLoader: EnvLoader<DbDotEnvVariables>;

  beforeAll(() => {
    dbEnvLoader = {
      index: dbDotEnvVariablesFixtureFactory.get(),
      load: jest.fn(),
    };
  });

  describe('.client', () => {
    describe('when called, and mongoClient is not instanciated', () => {
      let result: unknown;

      beforeAll(() => {
        try {
          const mongoDbConnector: MongoDbConnector = new MongoDbConnector(
            dbEnvLoader,
          );

          result = mongoDbConnector.client;
        } catch (err) {
          result = err;
        }
      });

      it('must throw an error', () => {
        expect(result).toBeInstanceOf(Error);
      });
    });

    describe('when called, and mongoClient is instanciated', () => {
      let result: unknown;

      beforeAll(async () => {
        const mongoDbConnector: MongoDbConnector = new MongoDbConnector(
          dbEnvLoader,
        );

        await mongoDbConnector.connect();

        result = mongoDbConnector.client;
      });

      afterAll(() => {
        (mongoClient.close as jest.Mock).mockClear();
        (mongoClient.connect as jest.Mock).mockClear();
      });

      it('must call return a client', () => {
        expect(result).toBe(mongoClient);
      });
    });
  });

  describe('.db', () => {
    describe('when called, and mongoClient is not instanciated', () => {
      let result: unknown;

      beforeAll(() => {
        try {
          const mongoDbConnector: MongoDbConnector = new MongoDbConnector(
            dbEnvLoader,
          );

          result = mongoDbConnector.db;
        } catch (err) {
          result = err;
        }
      });

      it('must throw an error', () => {
        expect(result).toBeInstanceOf(Error);
      });
    });

    describe('when called, and mongoClient is instanciated', () => {
      let result: unknown;

      beforeAll(async () => {
        const mongoDbConnector: MongoDbConnector = new MongoDbConnector(
          dbEnvLoader,
        );

        await mongoDbConnector.connect();

        result = mongoDbConnector.db;
      });

      afterAll(() => {
        (mongoClient.close as jest.Mock).mockClear();
        (mongoClient.connect as jest.Mock).mockClear();
        (mongoClient.db as jest.Mock).mockClear();
      });

      it('must call mongoClient.db', () => {
        expect(mongoClient.db).toHaveBeenCalledTimes(1);
        expect(mongoClient.db).toHaveBeenCalledWith(
          dbEnvLoader.index.MONGO_CONNECTION_DB,
        );
      });

      it('must call return a client', () => {
        expect(result).toBe(mongoClientDb);
      });
    });
  });

  describe('.close()', () => {
    describe('when called, and mongoClient is not instanciated', () => {
      beforeAll(async () => {
        const mongoDbConnector: MongoDbConnector = new MongoDbConnector(
          dbEnvLoader,
        );

        await mongoDbConnector.close();
      });

      afterAll(() => {
        (mongoClient.close as jest.Mock).mockClear();
      });

      it('must not call MongoClient.close', () => {
        expect(mongoClient.close).not.toHaveBeenCalled();
      });
    });

    describe('when called, and mongoClient is instanciated', () => {
      beforeAll(async () => {
        const mongoDbConnector: MongoDbConnector = new MongoDbConnector(
          dbEnvLoader,
        );

        await mongoDbConnector.connect();

        (mongoClient.close as jest.Mock).mockClear();

        await mongoDbConnector.close();
      });

      afterAll(() => {
        (mongoClient.close as jest.Mock).mockClear();
        (mongoClient.connect as jest.Mock).mockClear();
      });

      it('must call MongoClient.close', () => {
        expect(mongoClient.close).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('.connect()', () => {
    describe('when called', () => {
      beforeAll(async () => {
        const mongoDbConnector: MongoDbConnector = new MongoDbConnector(
          dbEnvLoader,
        );

        await mongoDbConnector.connect();
      });

      afterAll(() => {
        (mongoClient.close as jest.Mock).mockClear();
        (mongoClient.connect as jest.Mock).mockClear();
      });

      it('must call MongoClient.connect', () => {
        expect(mongoClient.connect).toHaveBeenCalledTimes(1);
      });
    });
  });
});
