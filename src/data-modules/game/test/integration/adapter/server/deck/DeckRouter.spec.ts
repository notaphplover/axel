import 'reflect-metadata';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { Response as LightMyRequestResponse } from 'light-my-request';

import {
  FastifyRequestHandler,
  FastifyRouter,
} from '../../../../../../../integration-modules/fastify/adapter';
import {
  FastifyServerTest,
  FastifyServerTestOutputParam,
  serverTest,
} from '../../../../../../../integration-modules/fastify/test';
import { FastifyUserAuthenticator } from '../../../../../../user/adapter';
import { UserRole } from '../../../../../../user/domain/model/UserRole';
import { userFixtureFactory } from '../../../../../../user/test/fixtures/domain/model/fixtures';
import { DeckRouter } from '../../../../../adapter/server/router/deck/DeckRouter';

const fastifyIntegrationDescribeGenerator: (
  router: FastifyRouter,
  output: FastifyServerTestOutputParam,
) => jest.Describe =
  serverTest.integration.utils.fastifyIntegrationDescribeGenerator;

const fastifyServerTestOutputParam: FastifyServerTestOutputParam = {};

const getCardDeckByIdV1RequestHandlerMock: FastifyRequestHandler = {
  handle: jest.fn(),
};

const fastifyUserAuthenticator: FastifyUserAuthenticator = {
  authenticate: jest.fn(),
} as Partial<FastifyUserAuthenticator> as FastifyUserAuthenticator;

const postDeckV1RequestHandlerMock: FastifyRequestHandler = {
  handle: jest.fn(),
};

const deckRouter: FastifyRouter = new DeckRouter(
  fastifyUserAuthenticator,
  getCardDeckByIdV1RequestHandlerMock,
  postDeckV1RequestHandlerMock,
);

fastifyIntegrationDescribeGenerator(deckRouter, fastifyServerTestOutputParam)(
  DeckRouter.name,
  () => {
    let fastifyInstance: FastifyInstance;

    describe('DeckRouter based server', () => {
      beforeAll(async () => {
        fastifyInstance = (
          fastifyServerTestOutputParam.value as FastifyServerTest
        ).fastify as FastifyInstance;
      });

      describe('GET Decks', () => {
        describe('when called', () => {
          let responseBodyFixture: Record<string, unknown>;
          let response: LightMyRequestResponse;

          beforeAll(async () => {
            responseBodyFixture = {
              foo: 'bar',
            };

            (
              getCardDeckByIdV1RequestHandlerMock.handle as jest.Mock
            ).mockImplementationOnce(
              async (
                request: FastifyRequest,
                reply: FastifyReply,
              ): Promise<void> => {
                await reply.send(responseBodyFixture);
              },
            );

            response = await fastifyInstance.inject({
              method: 'GET',
              url: '/v1/decks/sampleDeckId',
            });
          });

          afterAll(async () => {
            (fastifyUserAuthenticator.authenticate as jest.Mock).mockClear();
            (
              getCardDeckByIdV1RequestHandlerMock.handle as jest.Mock
            ).mockClear();
          });

          it('must call getDecksV1RequestHandlerMock.handle to handle the request', () => {
            expect(
              getCardDeckByIdV1RequestHandlerMock.handle,
            ).toHaveBeenCalledTimes(1);
            expect(JSON.parse(response.body)).toStrictEqual(
              responseBodyFixture,
            );
          });
        });
      });

      describe('POST Decks', () => {
        describe('when called, with valid auth', () => {
          let responseBodyFixture: Record<string, unknown>;
          let response: LightMyRequestResponse;

          beforeAll(async () => {
            responseBodyFixture = {
              foo: 'bar',
            };

            (
              fastifyUserAuthenticator.authenticate as jest.Mock
            ).mockResolvedValueOnce(userFixtureFactory.get());

            (
              postDeckV1RequestHandlerMock.handle as jest.Mock
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
              url: '/v1/decks',
            });
          });

          afterAll(async () => {
            (fastifyUserAuthenticator.authenticate as jest.Mock).mockClear();
            (postDeckV1RequestHandlerMock.handle as jest.Mock).mockClear();
          });

          it('must call fastifyUserAuthenticator.authenticate with admin role', async () => {
            expect(fastifyUserAuthenticator.authenticate).toHaveBeenCalledTimes(
              1,
            );
            expect(fastifyUserAuthenticator.authenticate).toHaveBeenCalledWith(
              expect.anything(),
              expect.anything(),
              [UserRole.ADMIN],
            );
          });

          it('must call postDeckV1RequestHandlerMock.handle to handle the request', () => {
            expect(postDeckV1RequestHandlerMock.handle).toHaveBeenCalledTimes(
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
              message: 'test POST Deck with wrong auth',
            };

            (
              fastifyUserAuthenticator.authenticate as jest.Mock
            ).mockImplementationOnce(
              async (request: FastifyRequest, reply: FastifyReply) => {
                await reply
                  .status(fastifyUserAuthenticatorCodeSent)
                  .send(fastifyUserAuthenticatorBodySent);

                return null;
              },
            );

            response = await fastifyInstance.inject({
              method: 'POST',
              url: '/v1/decks',
            });
          });

          afterAll(async () => {
            (fastifyUserAuthenticator.authenticate as jest.Mock).mockClear();
          });

          it('must not call postDeckV1RequestHandlerMock.handle to handle the request', () => {
            expect(postDeckV1RequestHandlerMock.handle).not.toHaveBeenCalled();
          });

          it('must return the response sent by fastifyUserAuthenticator', () => {
            expect(response.statusCode).toBe(fastifyUserAuthenticatorCodeSent);
            expect(JSON.parse(response.body)).toStrictEqual(
              fastifyUserAuthenticatorBodySent,
            );
          });
        });
      });
    });
  },
);
