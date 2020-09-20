import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import { ApiVersion } from '../../api/adapter';
import { FastifyRouter } from './FastifyRouter';
import { MongooseConector } from '../../db/adapter';
import { Server } from '../domain/Server';
import { injectable } from 'inversify';

@injectable()
export class FastifyServer implements Server {
  protected fastifyInstance: FastifyInstance | undefined;

  constructor(
    private readonly mongooseConnector: MongooseConector,
    private readonly routers: FastifyRouter[],
  ) {
    this.fastifyInstance = undefined;
  }

  public async bootstrap(): Promise<void> {
    if (this.fastifyInstance !== undefined) {
      throw new Error('There is already a fastify instance up');
    }
    const fastifyInstance: FastifyInstance = fastify({ logger: true });

    this.fastifyInstance = fastifyInstance;

    const promises: Promise<unknown>[] = [
      this.mongooseConnector.connect(),
      ...this.registerRouters(fastifyInstance),
    ];

    await Promise.all(promises);
  }

  public async close(): Promise<void> {
    if (undefined === this.fastifyInstance) {
      throw new Error('There is no fastify instance up');
    }

    const fastifyInstance: FastifyInstance = this.fastifyInstance;

    this.fastifyInstance = undefined;

    await Promise.all([
      this.mongooseConnector.close(),
      fastifyInstance.close(),
    ]);
  }

  private registerRouters(
    fastifyInstance: FastifyInstance,
  ): Promise<unknown>[] {
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

    return this.routers.map(registerRouter);
  }
}
