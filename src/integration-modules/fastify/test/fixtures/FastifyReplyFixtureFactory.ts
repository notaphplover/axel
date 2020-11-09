import { FastifyReply } from 'fastify';
import { FixtureFactory } from '../../../../common/test';

export class FastifyReplyFixtureFactory
  implements FixtureFactory<FastifyReply> {
  public get(): FastifyReply {
    return ({
      callNotFound: jest.fn().mockReturnThis(),
      code: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as Partial<FastifyReply>) as FastifyReply;
  }
}
