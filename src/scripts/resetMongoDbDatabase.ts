import 'reflect-metadata';
import {
  MongooseConector,
  mongooseAdapter,
} from '../integration-modules/mongoose/adapter';
import { container } from '../layer-modules/config/adapter/container';
import mongoose from 'mongoose';

const mongooseConnector: MongooseConector = container.get(
  mongooseAdapter.config.types.db.MONGOOSE_CONNECTOR,
);

const mongoDbConnectionIsOpenedPromise: Promise<void> = new Promise(
  (resolve: () => void) => {
    mongoose.connection.once('open', () => {
      resolve();
    });
  },
);

void (async () => {
  await mongooseConnector.connect();
  await mongoDbConnectionIsOpenedPromise;
  await mongoose.connection.db.dropDatabase();
  await mongooseConnector.close();
})();
