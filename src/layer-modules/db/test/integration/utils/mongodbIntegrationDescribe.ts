import { Container } from 'inversify';
import { DbConnector } from '../../../domain';
import { commonTest } from '../../../../../common/test';
import { configAdapter } from '../../../../config/adapter';
import { mongodbAdapter } from '../../../../../integration-modules/mongodb/adapter';
import { mongooseAdapter } from '../../../../../integration-modules/mongoose/adapter';

const container: Container = configAdapter.container;

export const mongodbIntegrationDescribe: jest.Describe = commonTest.integration.utils.customDescribe(
  describe,
  (): void => {
    let mongodbConnector: DbConnector;
    let mongooseConnector: DbConnector;

    beforeAll(
      async (): Promise<void> => {
        mongodbConnector = container.get(
          mongodbAdapter.config.types.db.MONGODB_CONNECTOR,
        );
        mongooseConnector = container.get(
          mongooseAdapter.config.types.db.MONGOOSE_CONNECTOR,
        );

        await mongodbConnector.connect();
        await mongooseConnector.connect();
      },
    );

    afterAll(
      async (): Promise<void> => {
        await mongodbConnector.close();
        await mongooseConnector.close();
      },
    );
  },
);
