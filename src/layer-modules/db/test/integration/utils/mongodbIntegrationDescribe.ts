import { Container } from 'inversify';

import { Capsule } from '../../../../../common/domain';
import { commonTest } from '../../../../../common/test';
import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../integration-modules/mongodb/adapter';
import { configAdapter } from '../../../../config/adapter';

const container: Container = configAdapter.container;

export const mongoDbIntegrationDescribeGenerator: (
  output: Capsule<MongoDbConnector | undefined>,
) => jest.Describe = (output: Capsule<MongoDbConnector | undefined>) =>
  commonTest.integration.utils.customDescribe(
    describe,
    'when mongodb connection is established',
    (): void => {
      let mongodbConnector: MongoDbConnector;

      beforeAll(
        async (): Promise<void> => {
          mongodbConnector = container.get(
            mongodbAdapter.config.types.db.MONGODB_CONNECTOR,
          );

          await mongodbConnector.connect();

          output.elem = mongodbConnector;
        },
      );

      afterAll(
        async (): Promise<void> => {
          await mongodbConnector.close();
        },
      );
    },
  );
