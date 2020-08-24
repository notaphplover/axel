import { Server } from '../../domain/Server';
import fastify from 'fastify';
import { FastifyRouter } from './FastifyRouter';
import { AddressInfo } from 'net';
import { injectable } from 'inversify';

@injectable()
export class FastifyServer implements Server {
  private readonly routers: FastifyRouter[];

  constructor() {
    this.routers = [];
  }

  public async bootstrap(): Promise<void> {
    const fastifyServer = fastify({ logger: true });

    for (const router of this.routers) {
      fastifyServer.register(router.injectRoutes);
    }

    const start = async () => {
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