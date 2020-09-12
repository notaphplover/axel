import { FixtureFactory } from './fixtures/domain/fixture/FixtureFactory';
import { PrototypeBasedFixtureFactory } from './fixtures/domain/fixture/PrototypeBasedFixtureFactory';
import { fastifyReplyFixtureFactory } from '../../layer-modules/server/test/fixtures/fastify.fixture';

export { FixtureFactory, PrototypeBasedFixtureFactory };

// eslint-disable-next-line @typescript-eslint/typedef
export const commonTest = {
  fixtures: { adapter: { server: { fastifyReplyFixtureFactory } } },
};
