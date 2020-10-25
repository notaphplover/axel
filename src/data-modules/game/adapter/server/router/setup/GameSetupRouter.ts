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
import {
  FastifyUserAuthenticator,
  userAdapter,
} from '../../../../../user/adapter';
import { User, UserContainer } from '../../../../../user/domain';
import { inject, injectable } from 'inversify';
import { ApiVersion } from '../../../../../../layer-modules/api/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { UserRole } from '../../../../../user/domain/model/UserRole';

const GAME_SETUP_ROUTER_PATH_PREFIX: string = 'game-setups';

@injectable()
export class GameSetupRouter implements FastifyRouter {
  constructor(
    @inject(userAdapter.config.types.auth.FASTIFY_USER_AUTHENTICATOR)
    private readonly fastifyUserAuthenticator: FastifyUserAuthenticator,
    @inject(
      GAME_ADAPTER_TYPES.server.reqHandler.setup
        .GET_GAME_SETUPS_V1_REQUEST_HANDLER,
    )
    private readonly getGameSetupsV1RequestHandler: FastifyRequestHandler,
    @inject(
      GAME_ADAPTER_TYPES.server.reqHandler.setup
        .POST_GAME_SETUP_V1_REQUEST_HANDLER,
    )
    private readonly postGameSetupV1RequestHandler: FastifyRequestHandler<
      FastifyRequest & UserContainer
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
    server.get(`/${GAME_SETUP_ROUTER_PATH_PREFIX}`, {
      onRequest: async (request: FastifyRequest, reply: FastifyReply) => {
        await this.fastifyUserAuthenticator.authenticate(request, reply, [
          UserRole.CLIENT,
        ]);
      },
      handler: this.getGameSetupsV1RequestHandler.handle.bind(
        this.getGameSetupsV1RequestHandler,
      ),
    });

    server.post(`/${GAME_SETUP_ROUTER_PATH_PREFIX}`, {
      onRequest: async (request: FastifyRequest, reply: FastifyReply) => {
        const user: User | null = await this.fastifyUserAuthenticator.authenticate(
          request,
          reply,
          [UserRole.CLIENT],
        );
        if (user !== null) {
          ((request as unknown) as UserContainer).user = user;
        }
      },
      handler: async (request: FastifyRequest, reply: FastifyReply) =>
        this.postGameSetupV1RequestHandler.handle(
          request as FastifyRequest & UserContainer,
          reply,
        ),
    });
  }
}
