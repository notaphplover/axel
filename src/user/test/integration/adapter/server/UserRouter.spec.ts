/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import {
  FastifyRequestHandler,
  FastifyRouter,
} from '../../../../../layer-modules/server/adapter';
import {
  FastifyServerTestOutputParam,
  serverTest,
} from '../../../../../layer-modules/server/test';
import { FastifyServerTest } from '../../../../../layer-modules/server/test';
import { Response as LightMyRequestResponse } from 'light-my-request';
import { UserRouter } from '../../../../adapter/server/router/UserRouter';

const fastifyIntegrationDescribeGenerator: (
  router: FastifyRouter,
  output: FastifyServerTestOutputParam,
) => jest.Describe =
  serverTest.integration.utils.fastifyIntegrationDescribeGenerator;

const fastifyServerTestOutputParam: FastifyServerTestOutputParam = {};

const postUserV1RequestHandlerMock: FastifyRequestHandler = {
  handle: jest.fn(),
};

const userRouter: FastifyRouter = new UserRouter(postUserV1RequestHandlerMock);

fastifyIntegrationDescribeGenerator(userRouter, fastifyServerTestOutputParam)(
  UserRouter.name,
  () => {
    let fastifyInstance: FastifyInstance;

    describe('POST user', () => {
      beforeAll(async () => {
        fastifyInstance = (fastifyServerTestOutputParam.value as FastifyServerTest)
          .fastify as FastifyInstance;
      });

      describe('when called', () => {
        let responseBodyFixture: Record<string, unknown>;
        let response: LightMyRequestResponse;

        beforeAll(async () => {
          responseBodyFixture = {
            foo: 'bar',
          };
          (postUserV1RequestHandlerMock.handle as jest.Mock).mockImplementationOnce(
            async (
              request: FastifyRequest,
              reply: FastifyReply,
            ): Promise<void> => {
              await reply.send(responseBodyFixture);
            },
          );

          response = await fastifyInstance.inject({
            method: 'POST',
            url: '/v1/users',
          });
        });

        it('must call postUserV1RequestHandler.handle to handle the request', () => {
          expect(postUserV1RequestHandlerMock.handle).toHaveBeenCalledTimes(1);
          expect(JSON.parse(response.body)).toStrictEqual(responseBodyFixture);
        });
      });
    });
  },
);
