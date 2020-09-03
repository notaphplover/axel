import { inject, injectable } from 'inversify';
import { COMMON_DOMAIN_TYPES } from '../../domain/config/types';
import { CommonDotEnvVariables } from '../env/CommonDotEnvVariables';
import { EnvLoader } from '../../domain/env/EnvLoader';
import { connect } from 'mongoose';

@injectable()
export class MongooseConector {
  constructor(
    @inject(COMMON_DOMAIN_TYPES.COMMON_ENV_LOADER)
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