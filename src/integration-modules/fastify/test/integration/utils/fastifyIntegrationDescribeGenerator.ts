import { Container } from 'inversify';
import { DbConnector } from '../../../../../layer-modules/db/domain';
import { FastifyRouter } from '../../../adapter';
import { FastifyServerTest } from '../FastifyServerTest';
import { configAdapter } from '../../../../../layer-modules/config/adapter';
import { customDescribe } from '../../../../../common/test/integration/utills/customDescribe';
import { mongodbAdapter } from '../../../../mongodb/adapter';

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
  customDescribe(describe, 'when fastify server is ready', () => {
    let mongoDbConnector: DbConnector;

    let fastifyServerTest: FastifyServerTest;

    beforeAll(async () => {
      mongoDbConnector = container.get(
        mongodbAdapter.config.types.db.MONGODB_CONNECTOR,
      );
      fastifyServerTest = new FastifyServerTest([router]);

      await Promise.all([
        mongoDbConnector.connect(),
        fastifyServerTest.bootstrap(),
      ]);

      output.value = fastifyServerTest;
    });

    afterAll(async () => {
      await Promise.all([mongoDbConnector.close(), fastifyServerTest.close()]);
    });
  });
