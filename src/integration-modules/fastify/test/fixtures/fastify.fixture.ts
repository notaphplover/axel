import { FastifyReply } from 'fastify';

import { FixtureFactory } from '../../../../common/test';
import { FastifyReplyFixtureFactory } from './FastifyReplyFixtureFactory';

export const fastifyReplyFixtureFactory: FixtureFactory<FastifyReply> = new FastifyReplyFixtureFactory();
