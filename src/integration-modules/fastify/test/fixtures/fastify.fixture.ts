import { FastifyReply } from 'fastify';
import { FastifyReplyFixtureFactory } from './FastifyReplyFixtureFactory';
import { FixtureFactory } from '../../../../common/test/fixtures/domain/fixture/FixtureFactory';

export const fastifyReplyFixtureFactory: FixtureFactory<FastifyReply> = new FastifyReplyFixtureFactory();
