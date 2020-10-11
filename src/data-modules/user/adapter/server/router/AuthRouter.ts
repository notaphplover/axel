import { FastifyInstance, FastifyServerOptions } from 'fastify';
import {
  FastifyRequestHandler,
  FastifyRouter,
} from '../../../../../layer-modules/server/adapter';
import { inject, injectable } from 'inversify';
import { ApiVersion } from '../../../../../layer-modules/api/adapter';
import { USER_ADAPTER_TYPES } from '../../config/types';

const AUTH_ROUTER_PATH_PREFIX: string = 'auth';

@injectable()
export class AuthRouter implements FastifyRouter {
  constructor(
    @inject(
      USER_ADAPTER_TYPES.server.reqHandler
        .POST_AUTH_USER_TOKEN_V1_REQUEST_HANDLER,
    )
    private readonly postAuthTokenV1RequestHandler: FastifyRequestHandler,
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
    server.post(`/${AUTH_ROUTER_PATH_PREFIX}/tokens`, {
      handler: this.postAuthTokenV1RequestHandler.handle.bind(
        this.postAuthTokenV1RequestHandler,
      ),
    });
  }
}
