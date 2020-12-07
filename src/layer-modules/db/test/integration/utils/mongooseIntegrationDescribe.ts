import { Container } from 'inversify';
import { DbConnector } from '../../../domain';
import { commonTest } from '../../../../../common/test';
import { configAdapter } from '../../../../config/adapter';
import { mongooseAdapter } from '../../../../../integration-modules/mongoose/adapter';

const container: Container = configAdapter.container;

export const mongooseIntegrationDescribe: jest.Describe = commonTest.integration.utils.customDescribe(
  describe,
  'when mongodb connection is established',
  (): void => {
    let mongooseConnector: DbConnector;

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
