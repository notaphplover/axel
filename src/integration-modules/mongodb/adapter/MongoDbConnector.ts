import {
  DbDotEnvVariables,
  dbAdapter,
} from '../../../layer-modules/db/adapter';
import { inject, injectable } from 'inversify';
import { DbConnector } from '../../../layer-modules/db/domain';
import { EnvLoader } from '../../../layer-modules/env/domain';
import { MongoClient } from 'mongodb';

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

  public async close(): Promise<void> {
    await this.mongoClient?.close();
  }

  public async connect(): Promise<void> {
    const mongoDbConnectionUri: string = this.buildMongoDbConnectionUri();

    this.mongoClient = await MongoClient.connect(mongoDbConnectionUri);
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
