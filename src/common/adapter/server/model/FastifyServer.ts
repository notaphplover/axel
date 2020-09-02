import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import { inject, injectable } from 'inversify';
import { ApiVersion } from '../../api/ApiVersion';
import { COMMON_ADAPTER_TYPES } from '../../config/types';
import { FastifyRouter } from './FastifyRouter';
import { MongooseConector } from '../../db/MongooseConnector';
import { Server } from '../../../domain/server/Server';
import { gameAdapter } from '../../../../game/adapter';

@injectable()
export class FastifyServer implements Server {
  private readonly routers: FastifyRouter[];

  constructor(
    @inject(gameAdapter.config.types.server.router.GAME_ROUTER)
    gameRouter: FastifyRouter,
    @inject(COMMON_ADAPTER_TYPES.db.MONGOOSE_CONNECTOR)
    private readonly mongooseConnector: MongooseConector,
  ) {
    this.routers = [gameRouter];
  }

  public async bootstrap(): Promise<void> {
    const fastifyServer: FastifyInstance = fastify({ logger: true });

    const promises: Promise<unknown>[] = [
      this.bootstrapDb(),
      ...this.registerRouters(fastifyServer),
    ];

    await Promise.all(promises);

    await this.startServer(fastifyServer);
  }

  private async bootstrapDb(): Promise<unknown> {
    return this.mongooseConnector.connect();
  }

  private registerRouters(fastifyServer: FastifyInstance): Promise<unknown>[] {
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

    return this.routers.map(registerRouter);
  }

  private async startServer(fastifyServer: FastifyInstance): Promise<void> {
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
