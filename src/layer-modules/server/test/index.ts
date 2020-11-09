import {
  FastifyServerTestOutputParam,
  fastifyIntegrationDescribeGenerator,
} from '../../../integration-modules/fastify/test/integration/utils/fastifyIntegrationDescribeGenerator';
import { FastifyServerTest } from '../../../integration-modules/fastify/test/integration/FastifyServerTest';

export { FastifyServerTest, FastifyServerTestOutputParam };

// eslint-disable-next-line @typescript-eslint/typedef
export const serverTest = {
  integration: { utils: { fastifyIntegrationDescribeGenerator } },
};
