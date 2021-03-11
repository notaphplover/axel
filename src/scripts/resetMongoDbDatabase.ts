import 'reflect-metadata';
import { Container } from 'inversify';

import {
  MongoDbConnector,
  mongodbAdapter,
} from '../integration-modules/mongodb/adapter';
import { configAdapter } from '../layer-modules/config/adapter';

const container: Container = configAdapter.container;

const mongoDbConnector: MongoDbConnector = container.get(
  mongodbAdapter.config.types.db.MONGODB_CONNECTOR,
);

void (async () => {
  await mongoDbConnector.connect();
  await mongoDbConnector.db.dropDatabase();
  await mongoDbConnector.close();
})();
