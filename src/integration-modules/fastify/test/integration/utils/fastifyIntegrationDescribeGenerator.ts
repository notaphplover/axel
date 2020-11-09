import { Container } from 'inversify';
import { DbConnector } from '../../../../../layer-modules/db/domain';
import { FastifyRouter } from '../../../adapter';
import { FastifyServerTest } from '../FastifyServerTest';
import { configAdapter } from '../../../../../layer-modules/config/adapter';
import { customDescribe } from '../../../../../common/test/integration/utills/customDescribe';
import { mongooseAdapter } from '../../../../mongoose/adapter';

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
    let mongooseConnector: DbConnector;

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
