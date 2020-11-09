import { FastifyInstance, FastifyServerOptions } from 'fastify';
import {
  FastifyRequestHandler,
  FastifyRouter,
} from '../../../../../integration-modules/fastify/adapter';
import { inject, injectable } from 'inversify';
import { ApiVersion } from '../../../../../layer-modules/api/adapter';
import { USER_ADAPTER_TYPES } from '../../config/types';

const USER_ROUTER_PATH_PREFIX: string = 'users';

@injectable()
export class UserRouter implements FastifyRouter {
  constructor(
    @inject(USER_ADAPTER_TYPES.server.reqHandler.POST_USER_V1_REQUEST_HANDLER)
    private readonly postUserV1RequestHandler: FastifyRequestHandler,
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
    server.post(`/${USER_ROUTER_PATH_PREFIX}`, {
      handler: this.postUserV1RequestHandler.handle.bind(
        this.postUserV1RequestHandler,
      ),
    });
  }
}
