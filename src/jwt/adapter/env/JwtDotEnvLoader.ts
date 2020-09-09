import { DotEnvLoader } from '../../../layer-modules/env/adapter';
import { Index } from '../../../layer-modules/env/domain';
import { JwtDotEnvVariables } from './JwtDotEnvVariables';
import { env } from 'process';
import { injectable } from 'inversify';
import { join } from 'path';

const CONFIG_DIR: string = join(__dirname, '..', '..', 'env');

@injectable()
export class JwtDotEnvLoader extends DotEnvLoader<JwtDotEnvVariables> {
  constructor() {
    super(join(CONFIG_DIR, 'local.env'));
  }

  protected parseIndex(): Index<JwtDotEnvVariables> {
    return {
      JWT_RSA_PRIVATE_KEY: env.JWT_RSA_PRIVATE_KEY as string,
      JWT_RSA_PUBLIC_KEY: env.JWT_RSA_PUBLIC_KEY as string,
    };
  }
}
