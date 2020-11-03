import { DeepCloneFixtureFactory } from './fixtures/domain/fixture/DeepCloneFixtureFactory';
import { FixtureFactory } from './fixtures/domain/fixture/FixtureFactory';
import { PrototypeBasedFixtureFactory } from './fixtures/domain/fixture/PrototypeBasedFixtureFactory';
import { commonTestE2eContainer } from './config/container/e2EContainer';
import { customDescribe } from './integration/utills/customDescribe';
import { fastifyReplyFixtureFactory } from '../../layer-modules/server/test/fixtures/fastify.fixture';

export {
  DeepCloneFixtureFactory,
  FixtureFactory,
  PrototypeBasedFixtureFactory,
};

// eslint-disable-next-line @typescript-eslint/typedef
export const commonTest = {
  config: { container: commonTestE2eContainer },
  fixtures: { adapter: { server: { fastifyReplyFixtureFactory } } },
  integration: { utils: { customDescribe } },
};
