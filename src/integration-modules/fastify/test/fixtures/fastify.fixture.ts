import { FastifyReply } from 'fastify';

import { FixtureFactory } from '../../../../common/test/fixtures/domain/fixture/FixtureFactory';
import { FastifyReplyFixtureFactory } from './FastifyReplyFixtureFactory';

export const fastifyReplyFixtureFactory: FixtureFactory<FastifyReply> = new FastifyReplyFixtureFactory();
