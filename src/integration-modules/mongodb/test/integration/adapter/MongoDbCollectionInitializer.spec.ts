import 'reflect-metadata';
import { Container } from 'inversify';
import mongodb from 'mongodb';

import { Capsule } from '../../../../../common/domain';
import { configAdapter } from '../../../../../layer-modules/config/adapter';
import { DbDotEnvVariables } from '../../../../../layer-modules/db/adapter';
import { DB_ADAPTER_PUBLIC_TYPES } from '../../../../../layer-modules/db/adapter/config/types';
import { dbTest } from '../../../../../layer-modules/db/test';
import { EnvLoader } from '../../../../../layer-modules/env/domain';
import { MongoDbConnector } from '../../../adapter';
import { MongoDbCollectionInitializer } from '../../../adapter/MongoDbCollectionInitializer';
import { MongoDbIndex } from '../../../adapter/MongoDbIndex';

const container: Container = configAdapter.container;

class MongoDbIndexInitializerMock extends MongoDbCollectionInitializer {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    collectionName: string,
    dbEnvLoader: EnvLoader<DbDotEnvVariables>,
    private readonly indexName: string,
  ) {
    super(collectionName, dbEnvLoader);
  }

  protected getCollectionCreationOptions(): mongodb.CollectionCreateOptions {
    return {};
  }

  protected getIndexes(): MongoDbIndex[] {
    return [{ name: this.indexName, spec: { bar: 1 } }];
  }
}

const outputParam: Capsule<MongoDbConnector | undefined> = { elem: undefined };

const mongodbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe =
  dbTest.integration.utils.mongoDbIntegrationDescribeGenerator;

mongodbIntegrationDescribeGenerator(outputParam)(
  MongoDbCollectionInitializer.name,
  () => {
    let collectionName: string;
    let indexName: string;

    let mongoDbIndexInitializer: MongoDbCollectionInitializer;

    beforeAll(() => {
      collectionName = 'mongoDbIndexInitializerIntegrationTest';
      indexName = 'mongoDbIndexInitializerIntegrationTest.bar';

      const dbEnvLoader: EnvLoader<DbDotEnvVariables> = container.get(
        DB_ADAPTER_PUBLIC_TYPES.env.DB_ENV_LOADER,
      );

      mongoDbIndexInitializer = new MongoDbIndexInitializerMock(
        collectionName,
        dbEnvLoader,
        indexName,
      );
    });

    describe('.initialize()', () => {
      describe('when called', () => {
        let collectionsMatchingName: unknown[];
        let indexExists: unknown;

        beforeAll(async () => {
          const mongoDbConnector: MongoDbConnector = outputParam.elem as MongoDbConnector;

          const collectionsMatchingNameBeforeCall: unknown[] = await mongoDbConnector.db
            .listCollections({
              name: collectionName,
            })
            .toArray();

          if (collectionsMatchingNameBeforeCall.length !== 0) {
            await mongoDbConnector.db.dropCollection(collectionName);
          }

          await mongoDbIndexInitializer.initialize(mongoDbConnector.client);

          collectionsMatchingName = await mongoDbConnector.db
            .listCollections({
              name: collectionName,
            })
            .toArray();

          indexExists = await mongoDbConnector.db
            .collection(collectionName)
            .indexExists(indexName);
        });

        it('must create the collection', () => {
          expect(collectionsMatchingName.length).toBe(1);
        });

        it('must create the index', () => {
          expect(indexExists).toBe(true);
        });
      });
    });
  },
);
