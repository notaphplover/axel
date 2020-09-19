import { AppEnvVariables, appAdapter } from '../../../../app/adapter';
import { EnvLoader, Index } from '../../../env/domain';
import { inject, injectable } from 'inversify';
import { DotEnvLoader } from '../../../env/adapter';
import { ServerDotEnvVariables } from './ServerDotEnvVariables';
import { env } from 'process';
import { join } from 'path';

const CONFIG_DIR: string = join(__dirname, '..', '..', 'env');

@injectable()
export class ServerDotEnvLoader extends DotEnvLoader<ServerDotEnvVariables> {
  constructor(
    @inject(appAdapter.config.types.env.APP_ENV_LOADER)
    appEnvLoader: EnvLoader<AppEnvVariables>,
  ) {
    super(join(CONFIG_DIR, `${appEnvLoader.index.APP_ENV}.env`));
  }

  protected parseIndex(): Index<ServerDotEnvVariables> {
    return {
      SERVER_PORT: parseFloat(env.SERVER_PORT as string),
    };
  }
}
