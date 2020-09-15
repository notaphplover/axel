import { EnvLoader, Index } from '../../../layer-modules/env/domain';
import { AppEnvVariables } from './AppEnvVariables';
import { env } from 'process';
import { injectable } from 'inversify';

export const DEFAULT_APP_ENV: string = 'local';

@injectable()
export class AppEnvLoader implements EnvLoader<AppEnvVariables> {
  private innerIndex: Index<AppEnvVariables> | undefined;

  constructor() {
    this.innerIndex = undefined;
  }

  public get index(): Index<AppEnvVariables> {
    if (undefined === this.innerIndex) {
      this.load();
    }

    return this.innerIndex as Index<AppEnvVariables>;
  }

  public load(): void {
    this.innerIndex = this.parseIndex();
  }

  private parseIndex(): Index<AppEnvVariables> {
    return {
      APP_ENV: env.APP_ENV ?? DEFAULT_APP_ENV,
    };
  }
}
