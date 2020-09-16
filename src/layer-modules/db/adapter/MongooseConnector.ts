import { inject, injectable } from 'inversify';
import { DB_ADAPTER_TYPES } from './config/types';
import { DbDotEnvVariables } from './env/DbDotEnvVariables';
import { EnvLoader } from '../../env/domain';
import mongoose from 'mongoose';

@injectable()
export class MongooseConector {
  constructor(
    @inject(DB_ADAPTER_TYPES.env.DB_ENV_LOADER)
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
