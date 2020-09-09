import * as path from 'path';
import { CommonDotEnvVariables } from './CommonDotEnvVariables';
import { DotEnvLoader } from './DotEnvLoader';
import { Index } from '../../../layer-modules/env/domain';
import { common } from '../../domain';
import { env } from 'process';
import { injectable } from 'inversify';

const rootDir: string = common.io.rootDir;

const CONFIG_DIR: string = `${rootDir}${path.sep}src${path.sep}common${path.sep}env${path.sep}`;

@injectable()
export class CommonDotEnvLoader extends DotEnvLoader<CommonDotEnvVariables> {
  constructor() {
    super(`${CONFIG_DIR}local.env`);
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
