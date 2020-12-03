import { injectable, unmanaged } from 'inversify';
import { DbDotEnvVariables } from '../../../layer-modules/db/adapter';
import { EnvLoader } from '../../../layer-modules/env/domain';
import { MongoDbIndex } from './MongoDbIndex';
import { MongoDbInitializer } from './MongoDbInitializer';
import mongodb from 'mongodb';

@injectable()
export abstract class MongoDbCollectionInitializer
  implements MongoDbInitializer {
  constructor(
    @unmanaged() private readonly collectionName: string,
    @unmanaged()
    private readonly dbEnvLoader: EnvLoader<DbDotEnvVariables>,
  ) {}

  public async initialize(mongoClient: mongodb.MongoClient): Promise<void> {
    const collection: mongodb.Collection = await this.initializeCollection(
      mongoClient,
    );

    for (const index of this.getIndexes()) {
      const indexExists: boolean = await collection.indexExists(index.name);

      if (!indexExists) {
        await collection.createIndex(index.spec, {
          background: true,
          name: index.name,
        });
      }
    }
  }

  private async initializeCollection(
    mongoClient: mongodb.MongoClient,
  ): Promise<mongodb.Collection> {
    const db: mongodb.Db = mongoClient.db(
      this.dbEnvLoader.index.MONGO_CONNECTION_DB,
    );
    const collectionsMatchingName: unknown[] = await db
      .listCollections({
        name: this.collectionName,
      })
      .toArray();

    if (collectionsMatchingName.length === 0) {
      await db.createCollection(
        this.collectionName,
        this.getCollectionCreationOptions(),
      );
    }

    return db.collection(this.collectionName);
  }

  protected abstract getCollectionCreationOptions(): mongodb.CollectionCreateOptions;

  protected abstract getIndexes(): MongoDbIndex[];
}
