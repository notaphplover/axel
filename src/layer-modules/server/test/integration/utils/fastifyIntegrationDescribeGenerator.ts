import {
  MongooseConector,
  mongooseAdapter,
} from '../../../../../integration-modules/mongoose/adapter';
import { Container } from 'inversify';
import { FastifyRouter } from '../../../adapter/FastifyRouter';
import { FastifyServerTest } from '../FastifyServerTest';
import { configAdapter } from '../../../../config/adapter';
import { customDescribe } from '../../../../../common/test/integration/utills/customDescribe';

const container: Container = configAdapter.container;

export interface FastifyServerTestOutputParam {
  value?: FastifyServerTest;
}

export const fastifyIntegrationDescribeGenerator: (
  router: FastifyRouter,
  output: FastifyServerTestOutputParam,
) => jest.Describe = (
  router: FastifyRouter,
  output: FastifyServerTestOutputParam,
) =>
  customDescribe(describe, () => {
    let mongooseConnector: MongooseConector;

    let fastifyServerTest: FastifyServerTest;

    beforeAll(async () => {
      mongooseConnector = container.get(
        mongooseAdapter.config.types.db.MONGOOSE_CONNECTOR,
      );
      fastifyServerTest = new FastifyServerTest(mongooseConnector, [router]);

      await fastifyServerTest.bootstrap();

      output.value = fastifyServerTest;
    });

    afterAll(async () => {
      await fastifyServerTest.close();
    });
  });
