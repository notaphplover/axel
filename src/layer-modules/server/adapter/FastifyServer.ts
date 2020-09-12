import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import { inject, injectable } from 'inversify';
import { ApiVersion } from '../../api/adapter';
import { FastifyRouter } from './FastifyRouter';
import { MongooseConector } from '../../../layer-modules/db/adapter';
import { Server } from '../domain/Server';
import { dbAdapter } from '../../db/adapter';
import { gameAdapter } from '../../../game/adapter';
import { userAdapter } from '../../../user/adapter';

@injectable()
export class FastifyServer implements Server {
  private readonly routers: FastifyRouter[];

  constructor(
    @inject(gameAdapter.config.types.server.router.GAME_ROUTER)
    gameRouter: FastifyRouter,
    @inject(dbAdapter.config.types.db.MONGOOSE_CONNECTOR)
    private readonly mongooseConnector: MongooseConector,
    @inject(userAdapter.config.types.server.router.USER_ROUTER)
    userRouter: FastifyRouter,
  ) {
    this.routers = [gameRouter, userRouter];
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
