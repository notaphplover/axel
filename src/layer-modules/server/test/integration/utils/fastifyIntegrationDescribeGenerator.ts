import { MongooseConector, dbAdapter } from '../../../../db/adapter';
import { FastifyRouter } from '../../../adapter/FastifyRouter';
import { FastifyServerTest } from '../FastifyServerTest';
import { container } from '../../../../../common/adapter/config/container';
import { customDescribe } from '../../../../../common/test/integration/utills/customDescribe';

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
        dbAdapter.config.types.db.MONGOOSE_CONNECTOR,
      );
      fastifyServerTest = new FastifyServerTest(mongooseConnector, [router]);

      await fastifyServerTest.bootstrap();

      output.value = fastifyServerTest;
    });

    afterAll(async () => {
      await fastifyServerTest.close();
    });
  });
