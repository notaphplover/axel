import { FastifyInstance } from 'fastify';
import { injectable } from 'inversify';

import { FastifyRouter } from './FastifyRouter';
import { FastifyServer } from './FastifyServer';

@injectable()
export class FastifyPortListeningServer extends FastifyServer {
  protected fastifyInstance: FastifyInstance | undefined;

  constructor(routers: FastifyRouter[], private readonly port: number) {
    super(routers);
  }

  public async bootstrap(): Promise<void> {
    await super.bootstrap();

    await this.startListening(this.fastifyInstance as FastifyInstance);
  }

  protected async startListening(
    fastifyInstance: FastifyInstance,
  ): Promise<void> {
    try {
      await fastifyInstance.listen(this.port, '0.0.0.0');
    } catch (err) {
      fastifyInstance.log.error(err);
      process.exit(1);
    }
  }
}
