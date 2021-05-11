import { FastifyReply } from 'fastify';

import { FixtureFactory } from '../../../../common/test';

export class FastifyReplyFixtureFactory
  implements FixtureFactory<jest.Mocked<FastifyReply>>
{
  public get(): jest.Mocked<FastifyReply> {
    return {
      callNotFound: jest.fn().mockReturnThis(),
      code: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as Partial<jest.Mocked<FastifyReply>> as jest.Mocked<FastifyReply>;
  }
}
