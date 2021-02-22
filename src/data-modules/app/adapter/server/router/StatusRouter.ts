import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { inject, injectable } from 'inversify';

import {
  FastifyRequestHandler,
  FastifyRouter,
} from '../../../../../integration-modules/fastify/adapter';
import { ApiVersion } from '../../../../../layer-modules/api/adapter';
import { APP_ADAPTER_TYPES } from '../../config/types';

const STATUS_ROUTER_PATH_PREFIX: string = 'status';

@injectable()
export class StatusRouter implements FastifyRouter {
  constructor(
    @inject(APP_ADAPTER_TYPES.server.reqHandler.GET_STATUS_V1_REQUEST_HANDLER)
    private readonly getStatusV1RequestHandler: FastifyRequestHandler,
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
    server.get(`/${STATUS_ROUTER_PATH_PREFIX}`, {
      handler: this.getStatusV1RequestHandler.handle.bind(
        this.getStatusV1RequestHandler,
      ),
    });
  }
}
