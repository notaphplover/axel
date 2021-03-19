import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import { injectable } from 'inversify';

import { ApiVersion } from '../../../layer-modules/api/adapter';
import { Server } from '../../../layer-modules/server/domain';
import { FastifyRouter } from './FastifyRouter';

@injectable()
export class FastifyServer implements Server {
  protected fastifyInstance: FastifyInstance | undefined;

  constructor(private readonly routers: FastifyRouter[]) {
    this.fastifyInstance = undefined;
  }

  public async bootstrap(): Promise<void> {
    if (this.fastifyInstance !== undefined) {
      throw new Error('There is already a fastify instance up');
    }
    const fastifyInstance: FastifyInstance = fastify({ logger: true });

    this.fastifyInstance = fastifyInstance;

    await this.registerRouters(fastifyInstance);
  }

  public async close(): Promise<void> {
    if (undefined === this.fastifyInstance) {
      throw new Error('There is no fastify instance up');
    }

    const fastifyInstance: FastifyInstance = this.fastifyInstance;

    this.fastifyInstance = undefined;

    await fastifyInstance.close();
  }

  private async registerRouters(
    fastifyInstance: FastifyInstance,
  ): Promise<void> {
    const registerRouterVersion: (
      router: FastifyRouter,
      version: ApiVersion,
    ) => PromiseLike<void> = (router: FastifyRouter, version: ApiVersion) =>
      fastifyInstance.register(
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
  }
}
