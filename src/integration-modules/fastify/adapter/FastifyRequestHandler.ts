import { FastifyReply, FastifyRequest } from 'fastify';

export interface FastifyRequestHandler<
  TRequest extends FastifyRequest = FastifyRequest
> {
  handle(request: TRequest, reply: FastifyReply): Promise<void>;
}
