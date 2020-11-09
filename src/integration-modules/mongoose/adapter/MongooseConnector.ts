import {
  DbDotEnvVariables,
  dbAdapter,
} from '../../../layer-modules/db/adapter';
import { inject, injectable } from 'inversify';
import { DbConnector } from '../../../layer-modules/db/domain';
import { EnvLoader } from '../../../layer-modules/env/domain';
import mongoose from 'mongoose';

@injectable()
export class MongooseConnector implements DbConnector {
  constructor(
    @inject(dbAdapter.config.types.env.DB_ENV_LOADER)
    private readonly dbEnvLoader: EnvLoader<DbDotEnvVariables>,
  ) {}

  public async close(): Promise<void> {
    await mongoose.disconnect();
  }

  public async connect(): Promise<void> {
    await mongoose.connect(this.dbEnvLoader.index.MONGO_CONNECTION_URL, {
      authSource: this.dbEnvLoader.index.MONGO_CONNECTION_AUTH_SOURCE,
      auth: {
        user: this.dbEnvLoader.index.MONGO_CONNECTION_USER,
        password: this.dbEnvLoader.index.MONGO_CONNECTION_PASSWORD,
      },
    });
  }
}
