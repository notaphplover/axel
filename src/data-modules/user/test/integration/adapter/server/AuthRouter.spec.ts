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
import { AuthRouter } from '../../../../adapter/server/router/AuthRouter';

const fastifyIntegrationDescribeGenerator: (
  router: FastifyRouter,
  output: FastifyServerTestOutputParam,
) => jest.Describe =
  serverTest.integration.utils.fastifyIntegrationDescribeGenerator;

const fastifyServerTestOutputParam: FastifyServerTestOutputParam = {};

const postAuthV1RequestHandlerMock: FastifyRequestHandler = {
  handle: jest.fn(),
};

const authRouter: FastifyRouter = new AuthRouter(postAuthV1RequestHandlerMock);

fastifyIntegrationDescribeGenerator(authRouter, fastifyServerTestOutputParam)(
  AuthRouter.name,
  () => {
    let fastifyInstance: FastifyInstance;

    describe('POST auth', () => {
      beforeAll(async () => {
        fastifyInstance = (fastifyServerTestOutputParam.value as FastifyServerTest)
          .fastify as FastifyInstance;
      });

      describe('when called', () => {
        let responseBodyFixture: Record<string, unknown>;
        let response: unknown;

        beforeAll(async () => {
          responseBodyFixture = {
            foo: 'bar',
          };
          (postAuthV1RequestHandlerMock.handle as jest.Mock).mockImplementationOnce(
            async (
              request: FastifyRequest,
              reply: FastifyReply,
            ): Promise<void> => {
              await reply.send(responseBodyFixture);
            },
          );

          response = await fastifyInstance.inject({
            method: 'POST',
            url: '/v1/auth/tokens',
          });
        });

        it('must call postAuthV1RequestHandler.handle to handle the request', () => {
          expect(postAuthV1RequestHandlerMock.handle).toHaveBeenCalledTimes(1);
          expect(
            JSON.parse((response as LightMyRequestResponse).body),
          ).toStrictEqual(responseBodyFixture);
        });
      });
    });
  },
);
