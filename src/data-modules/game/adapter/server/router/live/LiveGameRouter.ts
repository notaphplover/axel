import * as fastify from 'fastify';
import {
  FastifyRequestHandler,
  FastifyRouter,
} from '../../../../../../integration-modules/fastify/adapter';
import {
  FastifyUserAuthenticator,
  userAdapter,
} from '../../../../../user/adapter';
import { User, UserContainer } from '../../../../../user/domain';
import { inject, injectable } from 'inversify';
import { ApiVersion } from '../../../../../../layer-modules/api/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { UserRole } from '../../../../../user/domain/model/UserRole';

const GAME_ROUTER_PATH_PREFIX: string = 'games';

@injectable()
export class LiveGameRouter implements FastifyRouter {
  constructor(
    @inject(userAdapter.config.types.auth.FASTIFY_USER_AUTHENTICATOR)
    private readonly fastifyUserAuthenticator: FastifyUserAuthenticator,
    @inject(
      GAME_ADAPTER_TYPES.server.reqHandler.live
        .GET_LIVE_GAME_BY_ID_V1_REQUEST_HANDLER,
    )
    private readonly getGameByIdV1RequestHandler: FastifyRequestHandler,
    @inject(
      GAME_ADAPTER_TYPES.server.reqHandler.live
        .POST_LIVE_GAME_V1_REQUEST_HANDLER,
    )
    private readonly postGameV1RequestHandler: FastifyRequestHandler<
      fastify.FastifyRequest & UserContainer
    >,
  ) {}

  public async injectRoutes(
    server: fastify.FastifyInstance,
    options: fastify.FastifyServerOptions,
    version: ApiVersion,
  ): Promise<void> {
    switch (version) {
      case ApiVersion.V1:
        return this.injectRoutesV1(server);
      default:
        break;
    }
  }

  private async injectRoutesV1(server: fastify.FastifyInstance): Promise<void> {
    server.get(`/${GAME_ROUTER_PATH_PREFIX}/:gameId`, {
      handler: this.getGameByIdV1RequestHandler.handle.bind(
        this.getGameByIdV1RequestHandler,
      ),
      schema: { params: { gameId: { type: 'string' } } },
    });
    server.post(`/${GAME_ROUTER_PATH_PREFIX}`, {
      onRequest: async (
        request: fastify.FastifyRequest,
        reply: fastify.FastifyReply,
      ) => {
        const user: User | null = await this.fastifyUserAuthenticator.authenticate(
          request,
          reply,
          [UserRole.CLIENT],
        );
        if (user !== null) {
          ((request as unknown) as UserContainer).user = user;
        }
      },
      handler: async (
        request: fastify.FastifyRequest,
        reply: fastify.FastifyReply,
      ) =>
        this.postGameV1RequestHandler.handle(
          request as fastify.FastifyRequest & UserContainer,
          reply,
        ),
    });
  }
}
