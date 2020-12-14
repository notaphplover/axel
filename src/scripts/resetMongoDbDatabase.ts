import 'reflect-metadata';
import {
  MongoDbConnector,
  mongodbAdapter,
} from '../integration-modules/mongodb/adapter';
import { container } from '../layer-modules/config/adapter/container';

const mongoDbConnector: MongoDbConnector = container.get(
  mongodbAdapter.config.types.db.MONGODB_CONNECTOR,
);

void (async () => {
  await mongoDbConnector.connect();
  await mongoDbConnector.db.dropDatabase();
  await mongoDbConnector.close();
})();
