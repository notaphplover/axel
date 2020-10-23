import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from 'fastify';
import {
  FastifyRequestHandler,
  FastifyRouter,
} from '../../../../../../layer-modules/server/adapter';
import { inject, injectable } from 'inversify';
import { ApiVersion } from '../../../../../../layer-modules/api/adapter';
import { FastifyUserAuthenticator } from '../../../../../user/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { UserRole } from '../../../../../user/domain/model/UserRole';
import { userAdapter } from '../../../../../user/adapter';

const DECK_ROUTER_PATH_PREFIX: string = 'decks';

@injectable()
export class DeckRouter implements FastifyRouter {
  constructor(
    @inject(userAdapter.config.types.auth.FASTIFY_USER_AUTHENTICATOR)
    private readonly fastifyUserAuthenticator: FastifyUserAuthenticator,
    @inject(
      GAME_ADAPTER_TYPES.server.reqHandler.deck
        .GET_CARD_DECK_BY_ID_V1_REQUEST_HANDLER,
    )
    private readonly getCardDeckByIdV1RequestHandler: FastifyRequestHandler,
    @inject(
      GAME_ADAPTER_TYPES.server.reqHandler.deck
        .POST_CARD_DECK_V1_REQUEST_HANDLER,
    )
    private readonly postCardDeckV1RequestHandler: FastifyRequestHandler,
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
    server.get(`/${DECK_ROUTER_PATH_PREFIX}/:cardDeckId`, {
      handler: this.getCardDeckByIdV1RequestHandler.handle.bind(
        this.getCardDeckByIdV1RequestHandler,
      ),
      schema: { params: { cardDeckId: { type: 'string' } } },
    });
    server.post(`/${DECK_ROUTER_PATH_PREFIX}`, {
      onRequest: async (request: FastifyRequest, reply: FastifyReply) => {
        await this.fastifyUserAuthenticator.authenticate(request, reply, [
          UserRole.ADMIN,
        ]);
      },
      handler: this.postCardDeckV1RequestHandler.handle.bind(
        this.postCardDeckV1RequestHandler,
      ),
    });
  }
}
