import { MongooseConector, dbAdapter } from '../../../adapter';
import { Container } from 'inversify';
import { commonTest } from '../../../../../common/test';
import { configAdapter } from '../../../../config';

const container: Container = configAdapter.container;

export const mongooseIntegrationDescribe: jest.Describe = commonTest.integration.utils.customDescribe(
  describe,
  (): void => {
    let mongooseConnector: MongooseConector;

    beforeAll(
      async (): Promise<void> => {
        mongooseConnector = container.get(
          dbAdapter.config.types.db.MONGOOSE_CONNECTOR,
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
