import { MongooseConector, dbAdapter } from '../../../adapter';
import { commonTest } from '../../../../../common/test';
import { container } from '../../../../../common/adapter/config/container';

export const mongooseIntegrationDescribe: jest.Describe = commonTest.integration.utils.customDescribe(
  describe,
  () => {
    let mongooseConnector: MongooseConector;

    beforeAll(async () => {
      const mongooseConnector: MongooseConector = container.get(
        dbAdapter.config.types.db.MONGOOSE_CONNECTOR,
      );
      await mongooseConnector.connect();
    });

    afterAll(async () => {
      await mongooseConnector.close();
    });
  },
);
