import {
  ApiVersion,
  FastifyRequestHandler,
  FastifyRouter,
} from '../../../../common/adapter';
import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { inject, injectable } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../config/types';

const GAME_ROUTER_PATH_PREFIX: string = 'game';

@injectable()
export class GameRouter implements FastifyRouter {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.server.reqHandler.GET_GAME_BY_ID_V1_REQUEST_HANDLER,
    )
    private readonly getGameByIdV1RequestHandler: FastifyRequestHandler<
      Promise<void>
    >,
  ) {}

  public async injectRoutes(
    server: FastifyInstance,
    options: FastifyServerOptions,
    version: ApiVersion,
  ): Promise<void> {
    switch (version) {
      case ApiVersion.V1:
        return this.injectRoutesV1(server);
      default:
        break;
    }
  }

  private async injectRoutesV1(server: FastifyInstance): Promise<void> {
    server.get(`${GAME_ROUTER_PATH_PREFIX}/:gameId`, {
      handler: this.getGameByIdV1RequestHandler.handle.bind(this),
      schema: { params: { gameId: { type: 'string' } } },
    });
  }
}
