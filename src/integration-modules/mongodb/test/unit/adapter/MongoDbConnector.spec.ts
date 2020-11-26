/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';

let mongoClient: MongoClient;

jest.mock('mongodb', () => {
  const mongoClientMock: MongoClient = ((): MongoClient => {
    const mongoClient: MongoClient = {} as MongoClient;

    mongoClient.close = jest.fn().mockResolvedValue(undefined);
    mongoClient.connect = jest.fn().mockResolvedValue(mongoClient);

    return mongoClient;
  })();

  mongoClient = mongoClientMock;

  return {
    MongoClient: mongoClientMock,
  };
});

import { DbDotEnvVariables } from '../../../../../layer-modules/db/adapter';
import { EnvLoader } from '../../../../../layer-modules/env/domain';
import { MongoClient } from 'mongodb';
import { MongoDbConnector } from '../../../adapter/MongoDbConnector';
import { dbDotEnvVariablesFixtureFactory } from '../../../../../layer-modules/db/test/fixtures/adapter/env/fixtures';

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
