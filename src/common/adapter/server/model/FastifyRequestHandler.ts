import { FastifyReply, FastifyRequest } from 'fastify';

export interface FastifyRequestHandler<TOutput> {
  handle(request: FastifyRequest, reply: FastifyReply): Promise<TOutput>;
}
