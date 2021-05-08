import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from 'fastify';
import { inject, injectable } from 'inversify';

import {
  FastifyRequestHandler,
  FastifyRouter,
} from '../../../../../../integration-modules/fastify/adapter';
import { ApiVersion } from '../../../../../../layer-modules/api/adapter';
import {
  FastifyUserAuthenticator,
  userAdapter,
} from '../../../../../user/adapter';
import { UserRole } from '../../../../../user/domain/model/UserRole';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

const CARD_ROUTER_PATH_PREFIX: string = 'cards';

@injectable()
export class CardRouter implements FastifyRouter {
  constructor(
    @inject(userAdapter.config.types.auth.FASTIFY_USER_AUTHENTICATOR)
    private readonly fastifyUserAuthenticator: FastifyUserAuthenticator,
    @inject(
      GAME_ADAPTER_TYPES.server.reqHandler.card.POST_CARD_V1_REQUEST_HANDLER,
    )
    private readonly postCardV1RequestHandler: FastifyRequestHandler,
    @inject(
      GAME_ADAPTER_TYPES.server.reqHandler.card
        .POST_CARDS_SEARCHES_V1_REQUEST_HANDLER,
    )
    private readonly postCardsSearchesV1RequestHandler: FastifyRequestHandler,
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
    server.post(`/${CARD_ROUTER_PATH_PREFIX}`, {
      onRequest: async (request: FastifyRequest, reply: FastifyReply) => {
        await this.fastifyUserAuthenticator.authenticate(request, reply, [
          UserRole.ADMIN,
        ]);
      },
      handler: this.postCardV1RequestHandler.handle.bind(
        this.postCardV1RequestHandler,
      ),
    });
    server.post(`/${CARD_ROUTER_PATH_PREFIX}/searches`, {
      handler: this.postCardsSearchesV1RequestHandler.handle.bind(
        this.postCardsSearchesV1RequestHandler,
      ),
    });
  }
}
