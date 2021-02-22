/* eslint-disable @typescript-eslint/unbound-method */
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
import { UserContainer } from '../../../../../../user/domain';
import { UserRole } from '../../../../../../user/domain/model/UserRole';
import { userFixtureFactory } from '../../../../../../user/test/fixtures/domain/model/fixtures';
import { GameSetupRouter } from '../../../../../adapter/server/router/setup/GameSetupRouter';

const fastifyIntegrationDescribeGenerator: (
  router: FastifyRouter,
  output: FastifyServerTestOutputParam,
) => jest.Describe =
  serverTest.integration.utils.fastifyIntegrationDescribeGenerator;

const fastifyServerTestOutputParam: FastifyServerTestOutputParam = {};

const fastifyUserAuthenticator: FastifyUserAuthenticator = ({
  authenticate: jest.fn(),
} as Partial<FastifyUserAuthenticator>) as FastifyUserAuthenticator;

const postGameSetupsSearchesV1RequestHandler: FastifyRequestHandler = {
  handle: jest.fn(),
};

const patchGameSetupByIdV1RequestHandlerMock: FastifyRequestHandler<
  FastifyRequest & UserContainer
> = {
  handle: jest.fn(),
};

const postGameSetupV1RequestHandlerMock: FastifyRequestHandler<
  FastifyRequest & UserContainer
> = {
  handle: jest.fn(),
};

const gameSetupRouter: FastifyRouter = new GameSetupRouter(
  fastifyUserAuthenticator,
  postGameSetupsSearchesV1RequestHandler,
  patchGameSetupByIdV1RequestHandlerMock,
  postGameSetupV1RequestHandlerMock,
);

fastifyIntegrationDescribeGenerator(
  gameSetupRouter,
  fastifyServerTestOutputParam,
)(GameSetupRouter.name, () => {
  let fastifyInstance: FastifyInstance;

  describe('GameSetupRouter based server', () => {
    beforeAll(async () => {
      fastifyInstance = (fastifyServerTestOutputParam.value as FastifyServerTest)
        .fastify as FastifyInstance;
    });

    describe('PATCH GameSetups', () => {
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

          (patchGameSetupByIdV1RequestHandlerMock.handle as jest.Mock).mockImplementationOnce(
            async (
              request: FastifyRequest,
              reply: FastifyReply,
            ): Promise<void> => {
              await reply.send(responseBodyFixture);
            },
          );

          response = await fastifyInstance.inject({
            method: 'PATCH',
            url: '/v1/game-setups/sample-game-setup-id',
          });
        });

        afterAll(async () => {
          (fastifyUserAuthenticator.authenticate as jest.Mock).mockClear();
          (patchGameSetupByIdV1RequestHandlerMock.handle as jest.Mock).mockClear();
        });

        it('must call fastifyUserAuthenticator.authenticate with admin role', async () => {
          expect(fastifyUserAuthenticator.authenticate).toHaveBeenCalledTimes(
            1,
          );
          expect(
            fastifyUserAuthenticator.authenticate,
          ).toHaveBeenCalledWith(expect.anything(), expect.anything(), [
            UserRole.CLIENT,
          ]);
        });

        it('must call patchGameSetupV1RequestHandlerMock.handle to handle the request', () => {
          expect(
            patchGameSetupByIdV1RequestHandlerMock.handle,
          ).toHaveBeenCalledTimes(1);
          expect(JSON.parse(response.body)).toStrictEqual(responseBodyFixture);
        });
      });

      describe('when called, with wrong auth', () => {
        let fastifyUserAuthenticatorCodeSent: number;
        let fastifyUserAuthenticatorBodySent: unknown;

        let response: LightMyRequestResponse;

        beforeAll(async () => {
          fastifyUserAuthenticatorCodeSent = StatusCodes.UNAUTHORIZED;
          fastifyUserAuthenticatorBodySent = {
            message: 'test PATCH GameSetup with wrong auth',
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
            method: 'PATCH',
            url: '/v1/game-setups/sample-game-setup-id',
          });
        });

        afterAll(async () => {
          (fastifyUserAuthenticator.authenticate as jest.Mock).mockClear();
        });

        it('must not call patchGameSetupV1RequestHandlerMock.handle to handle the request', () => {
          expect(
            patchGameSetupByIdV1RequestHandlerMock.handle,
          ).not.toHaveBeenCalled();
        });

        it('must return the response sent by fastifyUserAuthenticator', () => {
          expect(response.statusCode).toBe(fastifyUserAuthenticatorCodeSent);
          expect(JSON.parse(response.body)).toStrictEqual(
            fastifyUserAuthenticatorBodySent,
          );
        });
      });
    });

    describe('POST GameSetups', () => {
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

          (postGameSetupV1RequestHandlerMock.handle as jest.Mock).mockImplementationOnce(
            async (
              request: FastifyRequest,
              reply: FastifyReply,
            ): Promise<void> => {
              await reply.send(responseBodyFixture);
            },
          );

          response = await fastifyInstance.inject({
            method: 'POST',
            url: '/v1/game-setups',
          });
        });

        afterAll(async () => {
          (fastifyUserAuthenticator.authenticate as jest.Mock).mockClear();
          (postGameSetupV1RequestHandlerMock.handle as jest.Mock).mockClear();
        });

        it('must call fastifyUserAuthenticator.authenticate with admin role', async () => {
          expect(fastifyUserAuthenticator.authenticate).toHaveBeenCalledTimes(
            1,
          );
          expect(
            fastifyUserAuthenticator.authenticate,
          ).toHaveBeenCalledWith(expect.anything(), expect.anything(), [
            UserRole.CLIENT,
          ]);
        });

        it('must call postGameSetupV1RequestHandlerMock.handle to handle the request', () => {
          expect(
            postGameSetupV1RequestHandlerMock.handle,
          ).toHaveBeenCalledTimes(1);
          expect(JSON.parse(response.body)).toStrictEqual(responseBodyFixture);
        });
      });

      describe('when called, with wrong auth', () => {
        let fastifyUserAuthenticatorCodeSent: number;
        let fastifyUserAuthenticatorBodySent: unknown;

        let response: LightMyRequestResponse;

        beforeAll(async () => {
          fastifyUserAuthenticatorCodeSent = StatusCodes.UNAUTHORIZED;
          fastifyUserAuthenticatorBodySent = {
            message: 'test POST GameSetup with wrong auth',
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
            url: '/v1/game-setups',
          });
        });

        afterAll(async () => {
          (fastifyUserAuthenticator.authenticate as jest.Mock).mockClear();
        });

        it('must not call postGameSetupV1RequestHandlerMock.handle to handle the request', () => {
          expect(
            postGameSetupV1RequestHandlerMock.handle,
          ).not.toHaveBeenCalled();
        });

        it('must return the response sent by fastifyUserAuthenticator', () => {
          expect(response.statusCode).toBe(fastifyUserAuthenticatorCodeSent);
          expect(JSON.parse(response.body)).toStrictEqual(
            fastifyUserAuthenticatorBodySent,
          );
        });
      });
    });

    describe('POST GameSetups searches', () => {
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

          (postGameSetupsSearchesV1RequestHandler.handle as jest.Mock).mockImplementationOnce(
            async (
              request: FastifyRequest,
              reply: FastifyReply,
            ): Promise<void> => {
              await reply.send(responseBodyFixture);
            },
          );

          response = await fastifyInstance.inject({
            method: 'POST',
            url: '/v1/game-setups/searches',
          });
        });

        afterAll(async () => {
          (fastifyUserAuthenticator.authenticate as jest.Mock).mockClear();
          (postGameSetupsSearchesV1RequestHandler.handle as jest.Mock).mockClear();
        });

        it('must call fastifyUserAuthenticator.authenticate with admin role', async () => {
          expect(fastifyUserAuthenticator.authenticate).toHaveBeenCalledTimes(
            1,
          );
          expect(
            fastifyUserAuthenticator.authenticate,
          ).toHaveBeenCalledWith(expect.anything(), expect.anything(), [
            UserRole.CLIENT,
          ]);
        });

        it('must call getGameSetupsV1RequestHandler.handle to handle the request', () => {
          expect(
            postGameSetupsSearchesV1RequestHandler.handle,
          ).toHaveBeenCalledTimes(1);
          expect(JSON.parse(response.body)).toStrictEqual(responseBodyFixture);
        });
      });

      describe('when called, with wrong auth', () => {
        let fastifyUserAuthenticatorCodeSent: number;
        let fastifyUserAuthenticatorBodySent: unknown;

        let response: LightMyRequestResponse;

        beforeAll(async () => {
          fastifyUserAuthenticatorCodeSent = StatusCodes.UNAUTHORIZED;
          fastifyUserAuthenticatorBodySent = {
            message: 'test GET GameSetups with wrong auth',
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
            url: '/v1/game-setups/searches',
          });
        });

        afterAll(async () => {
          (fastifyUserAuthenticator.authenticate as jest.Mock).mockClear();
        });

        it('must not call getGameSetupsV1RequestHandler.handle to handle the request', () => {
          expect(
            postGameSetupsSearchesV1RequestHandler.handle,
          ).not.toHaveBeenCalled();
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
});
