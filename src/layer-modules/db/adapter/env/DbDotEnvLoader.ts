import {
  AppEnvVariables,
  appAdapter,
} from '../../../../data-modules/app/adapter';
import { EnvLoader, Index } from '../../../env/domain';
import { inject, injectable } from 'inversify';
import { DbDotEnvVariables } from './DbDotEnvVariables';
import { DotEnvLoader } from '../../../../integration-modules/dotenv/adapter';
import { env } from 'process';
import { join } from 'path';

const CONFIG_DIR: string = join(__dirname, '..', '..', 'env');

@injectable()
export class DbDotEnvLoader extends DotEnvLoader<DbDotEnvVariables> {
  constructor(
    @inject(appAdapter.config.types.env.APP_ENV_LOADER)
    appEnvLoader: EnvLoader<AppEnvVariables>,
  ) {
    super(join(CONFIG_DIR, `${appEnvLoader.index.APP_ENV}.env`));
  }

  protected parseIndex(): Index<DbDotEnvVariables> {
    return {
      MONGO_CONNECTION_AUTH_SOURCE: env.MONGO_CONNECTION_AUTH_SOURCE as string,
      MONGO_CONNECTION_PASSWORD: env.MONGO_CONNECTION_PASSWORD as string,
      MONGO_CONNECTION_URL: env.MONGO_CONNECTION_URL as string,
      MONGO_CONNECTION_USER: env.MONGO_CONNECTION_USER as string,
    };
  }
}
