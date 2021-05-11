import 'reflect-metadata';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Response as LightMyRequestResponse } from 'light-my-request';

import {
  FastifyRequestHandler,
  FastifyRouter,
} from '../../../../../../integration-modules/fastify/adapter';
import {
  FastifyServerTestOutputParam,
  serverTest,
  FastifyServerTest,
} from '../../../../../../integration-modules/fastify/test';
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
        fastifyInstance = (
          fastifyServerTestOutputParam.value as FastifyServerTest
        ).fastify as FastifyInstance;
      });

      describe('when called', () => {
        let responseBodyFixture: Record<string, unknown>;
        let response: LightMyRequestResponse;

        beforeAll(async () => {
          responseBodyFixture = {
            foo: 'bar',
          };
          (
            postUserV1RequestHandlerMock.handle as jest.Mock
          ).mockImplementationOnce(
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
