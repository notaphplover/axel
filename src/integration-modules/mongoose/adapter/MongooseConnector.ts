import {
  DbDotEnvVariables,
  dbAdapter,
} from '../../../layer-modules/db/adapter';
import { inject, injectable } from 'inversify';
import { DbConnector } from '../../../layer-modules/db/domain';
import { EnvLoader } from '../../../layer-modules/env/domain';
import mongoose from 'mongoose';
import { waitMs } from '../../../common/domain/utils/waitMs';

const MAX_ATTEMPTS: number = 10;
const ATTEMPT_WAIT_MS: number = 1000;

@injectable()
export class MongooseConnector implements DbConnector {
  constructor(
    @inject(dbAdapter.config.types.env.DB_ENV_LOADER)
    private readonly dbEnvLoader: EnvLoader<DbDotEnvVariables>,
  ) {}

  public async close(): Promise<void> {
    await mongoose.disconnect();
  }

  public async connect(): Promise<void> {
    let attempt: number = 0;
    let error: boolean;

    do {
      error = false;
      try {
        await mongoose.connect(
          `${this.dbEnvLoader.index.MONGO_CONNECTION_PROTOCOL}${this.dbEnvLoader.index.MONGO_CONNECTION_URL}/${this.dbEnvLoader.index.MONGO_CONNECTION_DB}`,
          {
            authSource: this.dbEnvLoader.index.MONGO_CONNECTION_AUTH_SOURCE,
            auth: {
              user: this.dbEnvLoader.index.MONGO_CONNECTION_USER,
              password: this.dbEnvLoader.index.MONGO_CONNECTION_PASSWORD,
            },
          },
        );
      } catch (err) {
        error = true;
        ++attempt;

        if (attempt >= MAX_ATTEMPTS) {
          throw err;
        } else {
          await waitMs(ATTEMPT_WAIT_MS);
        }
      }
    } while (error === true);
  }
}
