import { MongooseConector, dbAdapter } from '../../../adapter';
import { commonTest } from '../../../../../common/test';
import { container } from '../../../../../common/adapter/config/container';

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
