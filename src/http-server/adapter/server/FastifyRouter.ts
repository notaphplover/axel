import { FastifyInstance, FastifyServerOptions } from 'fastify';

export interface FastifyRouter<
  TOptions extends FastifyServerOptions = FastifyServerOptions
> {
  injectRoutes(server: FastifyInstance, options: TOptions): Promise<void>;
}
