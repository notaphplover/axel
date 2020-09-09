import { CommonDotEnvVariables } from './DbDotEnvVariables';
import { DotEnvLoader } from '../../../env/adapter';
import { Index } from '../../../env/domain';
import { env } from 'process';
import { injectable } from 'inversify';
import { join } from 'path';

const CONFIG_DIR: string = join(__dirname, '..', '..', 'env');

@injectable()
export class DbDotEnvLoader extends DotEnvLoader<CommonDotEnvVariables> {
  constructor() {
    super(join(CONFIG_DIR, 'local.env'));
  }

  protected parseIndex(): Index<CommonDotEnvVariables> {
    return {
      MONGO_CONNECTION_AUTH_SOURCE: env.MONGO_CONNECTION_AUTH_SOURCE as string,
      MONGO_CONNECTION_PASSWORD: env.MONGO_CONNECTION_PASSWORD as string,
      MONGO_CONNECTION_URL: env.MONGO_CONNECTION_URL as string,
      MONGO_CONNECTION_USER: env.MONGO_CONNECTION_USER as string,
    };
  }
}
