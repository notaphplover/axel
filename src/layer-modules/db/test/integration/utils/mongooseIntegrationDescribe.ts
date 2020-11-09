import {
  MongooseConector,
  mongooseAdapter,
} from '../../../../../integration-modules/mongoose/adapter';
import { Container } from 'inversify';
import { commonTest } from '../../../../../common/test';
import { configAdapter } from '../../../../config/adapter';

const container: Container = configAdapter.container;

export const mongooseIntegrationDescribe: jest.Describe = commonTest.integration.utils.customDescribe(
  describe,
  (): void => {
    let mongooseConnector: MongooseConector;

    beforeAll(
      async (): Promise<void> => {
        mongooseConnector = container.get(
          mongooseAdapter.config.types.db.MONGOOSE_CONNECTOR,
        );
        await mongooseConnector.connect();
      },
    );

    afterAll(
      async (): Promise<void> => {
        await mongooseConnector.close();
      },
    );
  },
);
