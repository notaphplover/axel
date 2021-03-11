import { inject, injectable } from 'inversify';
import { Db, MongoClient } from 'mongodb';

import { commonDomain } from '../../../common/domain';
import {
  DbDotEnvVariables,
  dbAdapter,
} from '../../../layer-modules/db/adapter';
import { DbConnector } from '../../../layer-modules/db/domain';
import { EnvLoader } from '../../../layer-modules/env/domain';

const MAX_ATTEMPTS: number = 10;
const ATTEMPT_WAIT_MS: number = 1000;

@injectable()
export class MongoDbConnector implements DbConnector {
  private mongoClient: MongoClient | undefined;

  constructor(
    @inject(dbAdapter.config.types.env.DB_ENV_LOADER)
    private readonly dbEnvLoader: EnvLoader<DbDotEnvVariables>,
  ) {}

  public get client(): MongoClient {
    if (this.mongoClient === undefined) {
      throw new Error(
        'Expected client to be initialized. Ensure a connection request was accomplished before.',
      );
    } else {
      return this.mongoClient;
    }
  }

  public get db(): Db {
    if (this.mongoClient === undefined) {
      throw new Error(
        'Expected client to be initialized. Ensure a connection request was accomplished before.',
      );
    } else {
      return this.mongoClient.db(this.dbEnvLoader.index.MONGO_CONNECTION_DB);
    }
  }

  public async close(): Promise<void> {
    await this.mongoClient?.close();
  }

  public async connect(): Promise<void> {
    const mongoDbConnectionUri: string = this.buildMongoDbConnectionUri();

    let attempt: number = 0;

    while (this.mongoClient === undefined) {
      try {
        this.mongoClient = await MongoClient.connect(mongoDbConnectionUri);
      } catch (err) {
        ++attempt;

        if (attempt >= MAX_ATTEMPTS) {
          throw err;
        } else {
          await commonDomain.utils.waitMs(ATTEMPT_WAIT_MS);
        }
      }
    }
  }

  private buildMongoDbConnectionUri(): string {
    const username: string = encodeURIComponent(
      this.dbEnvLoader.index.MONGO_CONNECTION_USER,
    );
    const password: string = encodeURIComponent(
      this.dbEnvLoader.index.MONGO_CONNECTION_PASSWORD,
    );

    const mongoDbConnectionUri: string = `${this.dbEnvLoader.index.MONGO_CONNECTION_PROTOCOL}${username}:${password}@${this.dbEnvLoader.index.MONGO_CONNECTION_URL}`;

    return mongoDbConnectionUri;
  }
}
