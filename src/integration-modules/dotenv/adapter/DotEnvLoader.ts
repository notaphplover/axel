import { EnvLoader, Index } from '../../../layer-modules/env/domain';
import { injectable, unmanaged } from 'inversify';
import dotenv from 'dotenv';

@injectable()
export abstract class DotEnvLoader<T> implements EnvLoader<T> {
  protected innerIndex: Index<T> | undefined;

  constructor(@unmanaged() protected readonly path: string) {
    this.innerIndex = undefined;
  }

  public get index(): Index<T> {
    if (undefined === this.innerIndex) {
      this.load();
    }

    return this.innerIndex as Index<T>;
  }

  public load(): void {
    dotenv.config({
      path: this.path,
    });

    this.innerIndex = this.parseIndex();
  }

  protected abstract parseIndex(): Index<T>;
}
