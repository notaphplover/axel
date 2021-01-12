import 'reflect-metadata';
import {
  DbDotEnvVariables,
  dbAdapter,
} from '../../../../../layer-modules/db/adapter';
import { Container } from 'inversify';
import { EnvLoader } from '../../../../../layer-modules/env/domain';
import { MongoDbConnector } from '../../../adapter/MongoDbConnector';
import { configAdapter } from '../../../../../layer-modules/config/adapter';

describe(MongoDbConnector.name, () => {
  let mongoDbConnector: MongoDbConnector;

  beforeAll(() => {
    const container: Container = configAdapter.container;
    const dbEnvLoader: EnvLoader<DbDotEnvVariables> = container.get(
      dbAdapter.config.types.env.DB_ENV_LOADER,
    );

    mongoDbConnector = new MongoDbConnector(dbEnvLoader);
  });

  describe('.connect()', () => {
    describe('when called', () => {
      let testCommand: unknown;
      beforeAll(async () => {
        await mongoDbConnector.connect();

        testCommand = await mongoDbConnector.client
          .db('admin')
          .command({ ping: 1 });
      });

      afterAll(async () => {
        await mongoDbConnector.close();
      });

      it('must establish a connection', () => {
        expect(testCommand).not.toBeUndefined();
      });
    });
  });
});
