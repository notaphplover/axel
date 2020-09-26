import { FastifyInstance, FastifyServerOptions } from 'fastify';
import {
  FastifyRequestHandler,
  FastifyRouter,
} from '../../../../../layer-modules/server/adapter';
import { inject, injectable } from 'inversify';
import { ApiVersion } from '../../../../../layer-modules/api/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

const CARD_ROUTER_PATH_PREFIX: string = 'cards';

@injectable()
export class CardRouter implements FastifyRouter {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.server.reqHandler.card.GET_CARDS_V1_REQUEST_HANDLER,
    )
    private readonly getCardsV1RequestHandler: FastifyRequestHandler,
    @inject(
      GAME_ADAPTER_TYPES.server.reqHandler.card.POST_CARD_V1_REQUEST_HANDLER,
    )
    private readonly postCardV1RequestHandler: FastifyRequestHandler,
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
    server.get(`/${CARD_ROUTER_PATH_PREFIX}`, {
      handler: this.getCardsV1RequestHandler.handle.bind(
        this.getCardsV1RequestHandler,
      ),
    });
    server.post(`/${CARD_ROUTER_PATH_PREFIX}`, {
      handler: this.postCardV1RequestHandler.handle.bind(
        this.postCardV1RequestHandler,
      ),
    });
  }
}
