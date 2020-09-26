/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import {
  FastifyRequestHandler,
  FastifyRouter,
} from '../../../../../../layer-modules/server/adapter';
import {
  FastifyServerTest,
  FastifyServerTestOutputParam,
  serverTest,
} from '../../../../../../layer-modules/server/test';
import { CardRouter } from '../../../../../adapter/server/router/card/CardRouter';
import { Response as LightMyRequestResponse } from 'light-my-request';

const fastifyIntegrationDescribeGenerator: (
  router: FastifyRouter,
  output: FastifyServerTestOutputParam,
) => jest.Describe =
  serverTest.integration.utils.fastifyIntegrationDescribeGenerator;

const fastifyServerTestOutputParam: FastifyServerTestOutputParam = {};

const getCardsV1RequestHandlerMock: FastifyRequestHandler = {
  handle: jest.fn(),
};

const postCardV1RequestHandlerMock: FastifyRequestHandler = {
  handle: jest.fn(),
};

const cardRouter: FastifyRouter = new CardRouter(
  getCardsV1RequestHandlerMock,
  postCardV1RequestHandlerMock,
);

fastifyIntegrationDescribeGenerator(cardRouter, fastifyServerTestOutputParam)(
  CardRouter.name,
  () => {
    let fastifyInstance: FastifyInstance;

    describe('CardRouter based server', () => {
      beforeAll(async () => {
        fastifyInstance = (fastifyServerTestOutputParam.value as FastifyServerTest)
          .fastify as FastifyInstance;
      });

      describe('GET Cards', () => {
        describe('when called', () => {
          let responseBodyFixture: Record<string, unknown>;
          let response: LightMyRequestResponse;

          beforeAll(async () => {
            responseBodyFixture = {
              foo: 'bar',
            };

            (getCardsV1RequestHandlerMock.handle as jest.Mock).mockImplementationOnce(
              async (
                request: FastifyRequest,
                reply: FastifyReply,
              ): Promise<void> => {
                await reply.send(responseBodyFixture);
              },
            );

            response = await fastifyInstance.inject({
              method: 'GET',
              url: '/v1/cards',
            });
          });

          it('must call getCardsV1RequestHandlerMock.handle to handle the request', () => {
            expect(getCardsV1RequestHandlerMock.handle).toHaveBeenCalledTimes(
              1,
            );
            expect(JSON.parse(response.body)).toStrictEqual(
              responseBodyFixture,
            );
          });
        });
      });

      describe('POST Cards', () => {
        describe('when called', () => {
          let responseBodyFixture: Record<string, unknown>;
          let response: LightMyRequestResponse;

          beforeAll(async () => {
            responseBodyFixture = {
              foo: 'bar',
            };

            (postCardV1RequestHandlerMock.handle as jest.Mock).mockImplementationOnce(
              async (
                request: FastifyRequest,
                reply: FastifyReply,
              ): Promise<void> => {
                await reply.send(responseBodyFixture);
              },
            );

            response = await fastifyInstance.inject({
              method: 'POST',
              url: '/v1/cards',
            });
          });

          it('must call postCardV1RequestHandlerMock.handle to handle the request', () => {
            expect(postCardV1RequestHandlerMock.handle).toHaveBeenCalledTimes(
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
