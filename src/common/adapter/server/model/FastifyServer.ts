import fastify, { FastifyInstance } from 'fastify';
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

    await Promise.all(
      this.routers.map((router: FastifyRouter) =>
        fastifyServer.register(router.injectRoutes.bind(router)),
      ),
    );

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
