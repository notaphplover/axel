import { join } from 'path';
import { env } from 'process';

import { inject, injectable } from 'inversify';

import {
  AppEnvVariables,
  appAdapter,
} from '../../../../data-modules/app/adapter';
import { DotEnvLoader } from '../../../../integration-modules/dotenv/adapter';
import { EnvLoader, Index } from '../../../env/domain';
import { RedisDotEnvVariables } from './RedisDotEnvVariables';

const CONFIG_DIR: string = join(__dirname, '..', '..', 'env');

@injectable()
export class RedisDotEnvLoader extends DotEnvLoader<RedisDotEnvVariables> {
  constructor(
    @inject(appAdapter.config.types.env.APP_ENV_LOADER)
    appEnvLoader: EnvLoader<AppEnvVariables>,
  ) {
    super(join(CONFIG_DIR, `${appEnvLoader.index.APP_ENV}.env`));
  }

  protected parseIndex(): Index<RedisDotEnvVariables> {
    return {
      REDIS_CONNECTION_DB: parseFloat(env.REDIS_CONNECTION_DB as string),
      REDIS_CONNECTION_HOST: env.REDIS_CONNECTION_HOST as string,
      REDIS_CONNECTION_PORT: parseFloat(env.REDIS_CONNECTION_PORT as string),
    };
  }
}
