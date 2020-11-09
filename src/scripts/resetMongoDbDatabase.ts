import 'reflect-metadata';
import { DbConnector } from '../layer-modules/db/domain';
import { container } from '../layer-modules/config/adapter/container';
import mongoose from 'mongoose';
import { mongooseAdapter } from '../integration-modules/mongoose/adapter';

const mongooseConnector: DbConnector = container.get(
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
