import { FastifyInstance } from 'fastify';
import { FastifyServer } from '../../adapter/FastifyServer';

export class FastifyServerTest extends FastifyServer {
  public get fastify(): FastifyInstance | undefined {
    return this.fastifyInstance;
  }
}
