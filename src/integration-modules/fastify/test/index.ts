import {
  FastifyServerTestOutputParam,
  fastifyIntegrationDescribeGenerator,
} from './integration/utils/fastifyIntegrationDescribeGenerator';
import { FastifyServerTest } from './integration/FastifyServerTest';

export { FastifyServerTest, FastifyServerTestOutputParam };

// eslint-disable-next-line @typescript-eslint/typedef
export const serverTest = {
  integration: { utils: { fastifyIntegrationDescribeGenerator } },
};
