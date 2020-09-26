import { AppEnvVariables } from './AppEnvVariables';
import { DotEnvLoader } from '../../../layer-modules/env/adapter';
import { Index } from '../../../layer-modules/env/domain';
import { env } from 'process';
import { injectable } from 'inversify';
import { join } from 'path';

export const DEFAULT_APP_ENV: string = 'local';

const CONFIG_DIR: string = join(__dirname, '..', '..', 'env');

@injectable()
export class AppEnvLoader extends DotEnvLoader<AppEnvVariables> {
  private readonly env: string;

  constructor(envArg?: string) {
    const envName: string = envArg ?? env.APP_ENV ?? DEFAULT_APP_ENV;
    super(join(CONFIG_DIR, `${envName}.env`));
    this.env = envName;
  }

  protected parseIndex(): Index<AppEnvVariables> {
    return {
      APP_ENV: this.env,
      APP_SERVER_PORT: parseFloat(env.APP_SERVER_PORT as string),
    };
  }
}
