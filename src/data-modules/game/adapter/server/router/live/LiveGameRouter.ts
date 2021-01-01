import { FastifyInstance, FastifyServerOptions } from 'fastify';
import {
  FastifyRequestHandler,
  FastifyRouter,
} from '../../../../../../integration-modules/fastify/adapter';
import { inject, injectable } from 'inversify';
import { ApiVersion } from '../../../../../../layer-modules/api/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

const GAME_ROUTER_PATH_PREFIX: string = 'games';

@injectable()
export class LiveGameRouter implements FastifyRouter {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.server.reqHandler.live
        .GET_LIVE_GAME_BY_ID_V1_REQUEST_HANDLER,
    )
    private readonly getGameByIdV1RequestHandler: FastifyRequestHandler,
    @inject(
      GAME_ADAPTER_TYPES.server.reqHandler.live
        .POST_LIVE_GAME_V1_REQUEST_HANDLER,
    )
    private readonly postGameV1RequestHandler: FastifyRequestHandler,
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
    server.get(`/${GAME_ROUTER_PATH_PREFIX}/:gameId`, {
      handler: this.getGameByIdV1RequestHandler.handle.bind(
        this.getGameByIdV1RequestHandler,
      ),
      schema: { params: { gameId: { type: 'string' } } },
    });
    server.post(`/${GAME_ROUTER_PATH_PREFIX}`, {
      handler: this.postGameV1RequestHandler.handle.bind(
        this.postGameV1RequestHandler,
      ),
    });
  }
}