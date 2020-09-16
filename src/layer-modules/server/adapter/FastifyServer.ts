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

  private fastifyInstance: FastifyInstance | undefined;

  constructor(
    @inject(userAdapter.config.types.server.router.AUTH_ROUTER)
    authRouter: FastifyRouter,
    @inject(gameAdapter.config.types.server.router.GAME_ROUTER)
    gameRouter: FastifyRouter,
    @inject(dbAdapter.config.types.db.MONGOOSE_CONNECTOR)
    private readonly mongooseConnector: MongooseConector,
    @inject(userAdapter.config.types.server.router.USER_ROUTER)
    userRouter: FastifyRouter,
  ) {
    this.routers = [authRouter, gameRouter, userRouter];
    this.fastifyInstance = undefined;
  }

  public async bootstrap(): Promise<void> {
    if (this.fastifyInstance !== undefined) {
      throw new Error('There is already a fastify instance up');
    }
    const fastifyInstance: FastifyInstance = fastify({ logger: true });

    this.fastifyInstance = fastifyInstance;

    const promises: Promise<unknown>[] = [
      this.bootstrapDb(),
      ...this.registerRouters(fastifyInstance),
    ];

    await Promise.all(promises);

    await this.startInstance(fastifyInstance);
  }

  public async close(): Promise<void> {
    if (undefined === this.fastifyInstance) {
      throw new Error('There is no fastify instance up');
    }

    const fastifyInstance: FastifyInstance = this.fastifyInstance;

    this.fastifyInstance = undefined;

    await fastifyInstance.close();
  }

  private async bootstrapDb(): Promise<unknown> {
    return this.mongooseConnector.connect();
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

  private async startInstance(fastifyInstance: FastifyInstance): Promise<void> {
    const start: () => Promise<void> = async () => {
      try {
        await fastifyInstance.listen(3000);
      } catch (err) {
        fastifyInstance.log.error(err);
        process.exit(1);
      }
    };

    await start();
  }
}
