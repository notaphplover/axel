import { FastifyReply, FastifyRequest } from 'fastify';

export interface FastifyRequestHandler {
  handle(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}
