import { AppEnvVariables, appAdapter } from '../../../app/adapter';
import { EnvLoader, Index } from '../../../layer-modules/env/domain';
import { inject, injectable } from 'inversify';
import { DotEnvLoader } from '../../../layer-modules/env/adapter';
import { JwtDotEnvVariables } from './JwtDotEnvVariables';
import { env } from 'process';
import { join } from 'path';

const CONFIG_DIR: string = join(__dirname, '..', '..', 'env');

@injectable()
export class JwtDotEnvLoader extends DotEnvLoader<JwtDotEnvVariables> {
  constructor(
    @inject(appAdapter.config.types.env.APP_ENV_LOADER)
    appEnvLoader: EnvLoader<AppEnvVariables>,
  ) {
    super(join(CONFIG_DIR, `${appEnvLoader.index.APP_ENV}.env`));
  }

  protected parseIndex(): Index<JwtDotEnvVariables> {
    return {
      JWT_AUDIENCE: env.JWT_AUDIENCE as string,
      JWT_EXPIRATION_MS: parseInt(env.JWT_EXPIRATION_MS as string),
      JWT_ISSUER: env.JWT_ISSUER as string,
      JWT_RSA_PRIVATE_KEY: env.JWT_RSA_PRIVATE_KEY as string,
      JWT_RSA_PUBLIC_KEY: env.JWT_RSA_PUBLIC_KEY as string,
    };
  }
}
