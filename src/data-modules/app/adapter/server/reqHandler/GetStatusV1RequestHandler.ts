import { FastifyReply, FastifyRequest } from 'fastify';
import { injectable } from 'inversify';

import { FastifyRequestHandler } from '../../../../../integration-modules/fastify/adapter';

@injectable()
export class GetStatusV1RequestHandler implements FastifyRequestHandler {
  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    await reply.send({
      status: 'OK',
    });
  }
}
