import { FixtureFactory } from './fixtures/domain/fixture/FixtureFactory';
import { FixtureFactoryImpl } from './fixtures/domain/fixture/FixtureFactoryImpl';
import { fastifyReplyFixtureFactory } from '../../layer-modules/server/test/fixtures/fastify.fixture';

export { FixtureFactory, FixtureFactoryImpl };

// eslint-disable-next-line @typescript-eslint/typedef
export const commonTest = {
  fixtures: { adapter: { server: { fastifyReplyFixtureFactory } } },
};
