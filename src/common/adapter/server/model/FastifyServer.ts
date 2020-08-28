import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import { ApiVersion } from '../../api/ApiVersion';
import { FastifyRouter } from './FastifyRouter';
import { Server } from '../../../domain/server/Server';
import { injectable } from 'inversify';

@injectable()
export class FastifyServer implements Server {
  private readonly routers: FastifyRouter[];

  constructor() {
    this.routers = [];
  }

  public async bootstrap(): Promise<void> {
    const fastifyServer: FastifyInstance = fastify({ logger: true });

    const registerRouterVersion: (
      router: FastifyRouter,
      version: ApiVersion,
    ) => PromiseLike<void> = (router: FastifyRouter, version: ApiVersion) =>
      fastifyServer.register(
        async (server: FastifyInstance, options: FastifyServerOptions) =>
          router.injectRoutes(server, options, version),
        {
          prefix: `/${version}`,
        },
      );

    const registerRouter: (router: FastifyRouter) => Promise<void[]> = async (
      router: FastifyRouter,
    ) =>
      Promise.all(
        Object.values(ApiVersion).map(async (version: ApiVersion) =>
          registerRouterVersion(router, version),
        ),
      );

    await Promise.all(this.routers.map(registerRouter));

    const start: () => Promise<void> = async () => {
      try {
        await fastifyServer.listen(3000);
      } catch (err) {
        fastifyServer.log.error(err);
        process.exit(1);
      }
    };

    await start();
  }
}
