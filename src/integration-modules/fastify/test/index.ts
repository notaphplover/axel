import { FastifyServerTest } from './integration/FastifyServerTest';
import {
  FastifyServerTestOutputParam,
  fastifyIntegrationDescribeGenerator,
} from './integration/utils/fastifyIntegrationDescribeGenerator';

export { FastifyServerTest, FastifyServerTestOutputParam };

// eslint-disable-next-line @typescript-eslint/typedef
export const serverTest = {
  integration: { utils: { fastifyIntegrationDescribeGenerator } },
};
