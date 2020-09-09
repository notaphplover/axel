import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { ApiVersion } from '../../api/adapter';

export interface FastifyRouter<
  TOptions extends FastifyServerOptions = FastifyServerOptions
> {
  injectRoutes(
    server: FastifyInstance,
    options: TOptions,
    version: ApiVersion,
  ): Promise<void>;
}
