import { inject, injectable } from 'inversify';
import { CommonDotEnvVariables } from './env/DbDotEnvVariables';
import { DB_ADAPTER_TYPES } from './config/types';
import { EnvLoader } from '../../env/domain';
import { connect } from 'mongoose';

@injectable()
export class MongooseConector {
  constructor(
    @inject(DB_ADAPTER_TYPES.env.DB_ENV_LOADER)
    private readonly commonEnvLoader: EnvLoader<CommonDotEnvVariables>,
  ) {}

  public async connect(): Promise<void> {
    await connect(this.commonEnvLoader.index.MONGO_CONNECTION_URL, {
      authSource: this.commonEnvLoader.index.MONGO_CONNECTION_AUTH_SOURCE,
      auth: {
        user: this.commonEnvLoader.index.MONGO_CONNECTION_USER,
        password: this.commonEnvLoader.index.MONGO_CONNECTION_PASSWORD,
      },
    });
  }
}
