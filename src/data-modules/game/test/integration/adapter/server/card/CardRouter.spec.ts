/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import {
  FastifyRequestHandler,
  FastifyRouter,
} from '../../../../../../../integration-modules/fastify/adapter';
import {
  FastifyServerTest,
  FastifyServerTestOutputParam,
  serverTest,
} from '../../../../../../../integration-modules/fastify/test';
import { CardRouter } from '../../../../../adapter/server/router/card/CardRouter';
import { FastifyUserAuthenticator } from '../../../../../../user/adapter';
import { Response as LightMyRequestResponse } from 'light-my-request';
import { StatusCodes } from 'http-status-codes';
import { UserRole } from '../../../../../../user/domain/model/UserRole';
import { userFixtureFactory } from '../../../../../../user/test/fixtures/domain/model/fixtures';

const fastifyIntegrationDescribeGenerator: (
  router: FastifyRouter,
  output: FastifyServerTestOutputParam,
) => jest.Describe =
  serverTest.integration.utils.fastifyIntegrationDescribeGenerator;

const fastifyServerTestOutputParam: FastifyServerTestOutputParam = {};

const fastifyUserAuthenticator: FastifyUserAuthenticator = ({
  authenticate: jest.fn(),
} as Partial<FastifyUserAuthenticator>) as FastifyUserAuthenticator;

const postCardV1RequestHandlerMock: FastifyRequestHandler = {
  handle: jest.fn(),
};

const postCardsSearchesV1RequestHandlerMock: FastifyRequestHandler = {
  handle: jest.fn(),
};

const cardRouter: FastifyRouter = new CardRouter(
  fastifyUserAuthenticator,
  postCardV1RequestHandlerMock,
  postCardsSearchesV1RequestHandlerMock,
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

      describe('POST Cards', () => {
        describe('when called, with valid auth', () => {
          let responseBodyFixture: Record<string, unknown>;
          let response: LightMyRequestResponse;

          beforeAll(async () => {
            responseBodyFixture = {
              foo: 'bar',
            };

            (fastifyUserAuthenticator.authenticate as jest.Mock).mockResolvedValueOnce(
              userFixtureFactory.get(),
            );

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

          afterAll(async () => {
            (fastifyUserAuthenticator.authenticate as jest.Mock).mockClear();
            (postCardV1RequestHandlerMock.handle as jest.Mock).mockClear();
          });

          it('must call fastifyUserAuthenticator.authenticate with admin role', async () => {
            expect(fastifyUserAuthenticator.authenticate).toHaveBeenCalledTimes(
              1,
            );
            expect(
              fastifyUserAuthenticator.authenticate,
            ).toHaveBeenCalledWith(expect.anything(), expect.anything(), [
              UserRole.ADMIN,
            ]);
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

        describe('when called, with wrong auth', () => {
          let fastifyUserAuthenticatorCodeSent: number;
          let fastifyUserAuthenticatorBodySent: unknown;

          let response: LightMyRequestResponse;

          beforeAll(async () => {
            fastifyUserAuthenticatorCodeSent = StatusCodes.UNAUTHORIZED;
            fastifyUserAuthenticatorBodySent = {
              message: 'test POST Card with wrong auth',
            };

            (fastifyUserAuthenticator.authenticate as jest.Mock).mockImplementationOnce(
              async (request: FastifyRequest, reply: FastifyReply) => {
                await reply
                  .status(fastifyUserAuthenticatorCodeSent)
                  .send(fastifyUserAuthenticatorBodySent);

                return null;
              },
            );

            response = await fastifyInstance.inject({
              method: 'POST',
              url: '/v1/cards',
            });
          });

          afterAll(async () => {
            (fastifyUserAuthenticator.authenticate as jest.Mock).mockClear();
          });

          it('must not call postCardV1RequestHandlerMock.handle to handle the request', () => {
            expect(postCardV1RequestHandlerMock.handle).not.toHaveBeenCalled();
          });

          it('must return the response sent by fastifyUserAuthenticator', () => {
            expect(response.statusCode).toBe(fastifyUserAuthenticatorCodeSent);
            expect(JSON.parse(response.body)).toStrictEqual(
              fastifyUserAuthenticatorBodySent,
            );
          });
        });
      });

      describe('POST Cards searches', () => {
        describe('when called', () => {
          let responseBodyFixture: Record<string, unknown>;
          let response: LightMyRequestResponse;

          beforeAll(async () => {
            responseBodyFixture = {
              foo: 'bar',
            };

            (postCardsSearchesV1RequestHandlerMock.handle as jest.Mock).mockImplementationOnce(
              async (
                request: FastifyRequest,
                reply: FastifyReply,
              ): Promise<void> => {
                await reply.send(responseBodyFixture);
              },
            );

            response = await fastifyInstance.inject({
              method: 'POST',
              url: '/v1/cards/searches',
            });
          });

          afterAll(async () => {
            (fastifyUserAuthenticator.authenticate as jest.Mock).mockClear();
            (postCardsSearchesV1RequestHandlerMock.handle as jest.Mock).mockClear();
          });

          it('must call getCardsV1RequestHandlerMock.handle to handle the request', () => {
            expect(
              postCardsSearchesV1RequestHandlerMock.handle,
            ).toHaveBeenCalledTimes(1);
            expect(JSON.parse(response.body)).toStrictEqual(
              responseBodyFixture,
            );
          });
        });
      });
    });
  },
);
