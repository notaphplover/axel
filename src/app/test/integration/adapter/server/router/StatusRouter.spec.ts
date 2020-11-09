/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import {
  FastifyRequestHandler,
  FastifyRouter,
} from '../../../../../../integration-modules/fastify/adapter';
import {
  FastifyServerTest,
  FastifyServerTestOutputParam,
  serverTest,
} from '../../../../../../integration-modules/fastify/test';
import { Response as LightMyRequestResponse } from 'light-my-request';
import { StatusRouter } from '../../../../../adapter/server/router/StatusRouter';

const fastifyIntegrationDescribeGenerator: (
  router: FastifyRouter,
  output: FastifyServerTestOutputParam,
) => jest.Describe =
  serverTest.integration.utils.fastifyIntegrationDescribeGenerator;

const fastifyServerTestOutputParam: FastifyServerTestOutputParam = {};

const getStatusV1RequestHandlerMock: FastifyRequestHandler = {
  handle: jest.fn(),
};

const statusRouter: FastifyRouter = new StatusRouter(
  getStatusV1RequestHandlerMock,
);

fastifyIntegrationDescribeGenerator(statusRouter, fastifyServerTestOutputParam)(
  StatusRouter.name,
  () => {
    let fastifyInstance: FastifyInstance;

    describe('StatusRouter based server', () => {
      beforeAll(async () => {
        fastifyInstance = (fastifyServerTestOutputParam.value as FastifyServerTest)
          .fastify as FastifyInstance;
      });

      describe('GET Status', () => {
        describe('when called', () => {
          let responseBodyFixture: Record<string, unknown>;
          let response: LightMyRequestResponse;

          beforeAll(async () => {
            responseBodyFixture = {
              foo: 'bar',
            };

            (getStatusV1RequestHandlerMock.handle as jest.Mock).mockImplementationOnce(
              async (
                request: FastifyRequest,
                reply: FastifyReply,
              ): Promise<void> => {
                await reply.send(responseBodyFixture);
              },
            );

            response = await fastifyInstance.inject({
              method: 'GET',
              url: '/v1/status',
            });
          });

          afterAll(async () => {
            (getStatusV1RequestHandlerMock.handle as jest.Mock).mockClear();
          });

          it('must call getStatusV1RequestHandlerMock.handle to handle the request', () => {
            expect(getStatusV1RequestHandlerMock.handle).toHaveBeenCalledTimes(
              1,
            );
            expect(JSON.parse(response.body)).toStrictEqual(
              responseBodyFixture,
            );
          });
        });
      });
    });
  },
);
