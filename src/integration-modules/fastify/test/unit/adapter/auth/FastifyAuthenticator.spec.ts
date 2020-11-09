/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { FastifyReply, FastifyRequest } from 'fastify';
import { FastifyAuthenticator } from '../../../../adapter/auth/FastifyAuthenticator';
import { JwtManager } from '../../../../../../data-modules/jwt/domain';
import { StatusCodes } from 'http-status-codes';
import { fastifyReplyFixtureFactory } from '../../../fixtures/fastify.fixture';

interface TTokenTypeMock {
  foo: 'bar';
}

describe(FastifyAuthenticator.name, () => {
  let jwtManager: JwtManager<TTokenTypeMock>;

  let fastifyAuthenticator: FastifyAuthenticator<TTokenTypeMock>;

  beforeAll(() => {
    jwtManager = {
      create: jest.fn(),
      parse: jest.fn(),
    };

    fastifyAuthenticator = new FastifyAuthenticator(jwtManager);
  });

  describe('.authenticate()', () => {
    describe('when called', () => {
      let jwtTokenFixture: string;
      let tTokenMockFixture: TTokenTypeMock;

      let result: unknown;

      beforeAll(async () => {
        tTokenMockFixture = { foo: 'bar' };

        (jwtManager.parse as jest.Mock).mockResolvedValueOnce(
          tTokenMockFixture,
        );

        jwtTokenFixture = 'test-jwt-token';

        const requestFixture: FastifyRequest = ({
          headers: {
            authorization: 'Bearer ' + jwtTokenFixture,
          },
        } as Partial<FastifyRequest>) as FastifyRequest;

        const replyFixture: FastifyReply = fastifyReplyFixtureFactory.get();

        result = await fastifyAuthenticator.authenticate(
          requestFixture,
          replyFixture,
        );
      });

      afterAll(() => {
        (jwtManager.parse as jest.Mock).mockClear();
      });

      it('must jwtManager.parse with the token provided', () => {
        expect(jwtManager.parse).toHaveBeenCalledTimes(1);
        expect(jwtManager.parse).toHaveBeenCalledWith(jwtTokenFixture);
      });

      it('must return the used parsed by jwtManager', () => {
        expect(result).toStrictEqual(tTokenMockFixture);
      });
    });

    describe('when called, with no authorization header', () => {
      let replyFixture: FastifyReply;

      let result: unknown;

      beforeAll(async () => {
        const requestFixture: FastifyRequest = ({
          headers: {},
        } as Partial<FastifyRequest>) as FastifyRequest;
        replyFixture = fastifyReplyFixtureFactory.get();

        result = await fastifyAuthenticator.authenticate(
          requestFixture,
          replyFixture,
        );
      });

      it('must call reply.code with HTTP FORBIDDEN code', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(StatusCodes.FORBIDDEN);
      });

      it('must call reply.send with an error message', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
      });

      it('must not call jwtManager.parse', () => {
        expect(jwtManager.parse).not.toHaveBeenCalled();
      });

      it('must return null', () => {
        expect(result).toBeNull();
      });
    });

    describe('when called, with no beared authorization header', () => {
      let replyFixture: FastifyReply;

      let result: unknown;

      beforeAll(async () => {
        const requestFixture: FastifyRequest = ({
          headers: {
            authorization: 'Not a Bearer token',
          },
        } as Partial<FastifyRequest>) as FastifyRequest;
        replyFixture = fastifyReplyFixtureFactory.get();

        result = await fastifyAuthenticator.authenticate(
          requestFixture,
          replyFixture,
        );
      });

      it('must call reply.code with HTTP BAD REQUEST code', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      });

      it('must call reply.send with an error message', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
      });

      it('must not call jwtManager.parse', () => {
        expect(jwtManager.parse).not.toHaveBeenCalled();
      });

      it('must return null', () => {
        expect(result).toBeNull();
      });
    });

    describe('when called, with a bearer invalid jwt authorization header', () => {
      let replyFixture: FastifyReply;

      let result: unknown;

      beforeAll(async () => {
        (jwtManager.parse as jest.Mock).mockRejectedValueOnce(
          'Test when jwt manager fails to parse',
        );

        const requestFixture: FastifyRequest = ({
          headers: {
            authorization: 'Bearer test-jwt-token',
          },
        } as Partial<FastifyRequest>) as FastifyRequest;
        replyFixture = fastifyReplyFixtureFactory.get();

        result = await fastifyAuthenticator.authenticate(
          requestFixture,
          replyFixture,
        );
      });

      afterAll(() => {
        (jwtManager.parse as jest.Mock).mockClear();
      });

      it('must call reply.code with BAD REQUEST code', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      });

      it('must call reply.send with an error message', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
      });

      it('must return null', () => {
        expect(result).toBeNull();
      });
    });
  });
});
