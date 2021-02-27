import 'reflect-metadata';
import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import {
  Converter,
  Interactor,
  ValidationFail,
  ValidationResult,
  Validator,
} from '../../../../../../common/domain';
import { commonTest } from '../../../../../../common/test';
import { UserTokenApiV1 } from '../../../../adapter/api/model/UserTokenApiV1';
import { AuthCreationQueryApiV1 } from '../../../../adapter/api/query/AuthCreationQueryApiV1';
import { PostAuthTokenV1RequestHandler } from '../../../../adapter/server/reqHandler/PostAuthUserTokenV1RequestHandler';
import { User } from '../../../../domain/model/User';
import { UserToken } from '../../../../domain/model/UserToken';
import { UserFindQuery } from '../../../../domain/query/UserFindQuery';
import { userTokenApiV1FixtureFactory } from '../../../fixtures/adapter/api/model/fixtures';
import { authCreationQueryApiV1FixtureFactory } from '../../../fixtures/adapter/api/query/fixtures';
import {
  userFixtureFactory,
  userTokenFixtureFactory,
} from '../../../fixtures/domain/model/fixtures';

describe(PostAuthTokenV1RequestHandler.name, () => {
  let authCreationQueryApiV1Validator: Validator<AuthCreationQueryApiV1>;
  let findUserInteractor: Interactor<UserFindQuery, Promise<User | null>>;
  let createUserTokenInteractor: Interactor<User, Promise<UserToken>>;
  let userTokenToUserTokenApiV1Converter: Converter<UserToken, UserTokenApiV1>;

  let postAuthTokenV1RequestHandler: PostAuthTokenV1RequestHandler;

  beforeAll(() => {
    authCreationQueryApiV1Validator = {
      validate: jest.fn(),
    };
    findUserInteractor = {
      interact: jest.fn(),
    };
    createUserTokenInteractor = {
      interact: jest.fn(),
    };
    userTokenToUserTokenApiV1Converter = {
      transform: jest.fn(),
    };

    postAuthTokenV1RequestHandler = new PostAuthTokenV1RequestHandler(
      authCreationQueryApiV1Validator,
      findUserInteractor,
      createUserTokenInteractor,
      userTokenToUserTokenApiV1Converter,
    );
  });

  describe('.handle()', () => {
    describe('when called and the request is valid and the user is found', () => {
      let requestFixture: FastifyRequest;
      let replyFixture: FastifyReply;

      beforeAll(async () => {
        requestFixture = ({
          body: authCreationQueryApiV1FixtureFactory.get(),
        } as Partial<FastifyRequest>) as FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        const authCreationQueryApiV1ValidatorValidationResult: ValidationResult<AuthCreationQueryApiV1> = {
          model: authCreationQueryApiV1FixtureFactory.get(),
          result: true,
        };

        (authCreationQueryApiV1Validator.validate as jest.Mock).mockReturnValueOnce(
          authCreationQueryApiV1ValidatorValidationResult,
        );

        (findUserInteractor.interact as jest.Mock).mockResolvedValueOnce(
          userFixtureFactory.get(),
        );

        (createUserTokenInteractor.interact as jest.Mock).mockResolvedValueOnce(
          userTokenFixtureFactory.get(),
        );
        (userTokenToUserTokenApiV1Converter.transform as jest.Mock).mockReturnValueOnce(
          userTokenFixtureFactory.get(),
        );

        await postAuthTokenV1RequestHandler.handle(
          requestFixture,
          replyFixture,
        );
      });

      afterAll(() => {
        (authCreationQueryApiV1Validator.validate as jest.Mock).mockClear();
        (findUserInteractor.interact as jest.Mock).mockClear();
        (createUserTokenInteractor.interact as jest.Mock).mockClear();
        (userTokenToUserTokenApiV1Converter.transform as jest.Mock).mockClear();
      });

      it('must call authCreationQueryApiV1Validator.validate with the request body', () => {
        expect(authCreationQueryApiV1Validator.validate).toHaveBeenCalledTimes(
          1,
        );
        expect(authCreationQueryApiV1Validator.validate).toHaveBeenCalledWith(
          requestFixture.body,
        );
      });

      it('must call findUserInteractor.interact with a user find query by username and password', () => {
        const expected: UserFindQuery = {
          password: authCreationQueryApiV1FixtureFactory.get().password,
          username: authCreationQueryApiV1FixtureFactory.get().username,
        };

        expect(findUserInteractor.interact).toHaveBeenCalledTimes(1);
        expect(findUserInteractor.interact).toHaveBeenCalledWith(expected);
      });

      it('must call createUserTokenInteractor.interact with the user found', () => {
        expect(createUserTokenInteractor.interact).toHaveBeenCalledTimes(1);
        expect(createUserTokenInteractor.interact).toHaveBeenCalledWith(
          userFixtureFactory.get(),
        );
      });

      it('must call userTokenToUserTokenApiV1Converter.transform with the token generated', () => {
        expect(
          userTokenToUserTokenApiV1Converter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          userTokenToUserTokenApiV1Converter.transform,
        ).toHaveBeenCalledWith(userTokenFixtureFactory.get());
      });

      it('must call reply.send with the API user token generated', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith(
          userTokenApiV1FixtureFactory.get(),
        );
      });
    });

    describe('when called and the request is valid and the user is not found', () => {
      let requestFixture: FastifyRequest;
      let replyFixture: FastifyReply;

      beforeAll(async () => {
        requestFixture = ({
          body: authCreationQueryApiV1FixtureFactory.get(),
        } as Partial<FastifyRequest>) as FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        const authCreationQueryApiV1ValidatorValidationResult: ValidationResult<AuthCreationQueryApiV1> = {
          model: authCreationQueryApiV1FixtureFactory.get(),
          result: true,
        };

        (authCreationQueryApiV1Validator.validate as jest.Mock).mockReturnValueOnce(
          authCreationQueryApiV1ValidatorValidationResult,
        );

        (findUserInteractor.interact as jest.Mock).mockResolvedValueOnce(null);

        await postAuthTokenV1RequestHandler.handle(
          requestFixture,
          replyFixture,
        );
      });

      afterAll(() => {
        (authCreationQueryApiV1Validator.validate as jest.Mock).mockClear();
        (findUserInteractor.interact as jest.Mock).mockClear();
      });

      it('must call reply.code with unauthorized status', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(
          StatusCodes.UNAUTHORIZED,
        );
      });

      it('must call reply.send with an error message', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith({
          message: expect.stringContaining('nvalid credentials') as string,
        });
      });
    });

    describe('when called and the request is not valid', () => {
      let requestFixture: FastifyRequest;
      let replyFixture: FastifyReply;

      let authCreationQueryApiV1ValidatorValidationResult: ValidationFail;

      beforeAll(async () => {
        requestFixture = ({
          body: authCreationQueryApiV1FixtureFactory.get(),
        } as Partial<FastifyRequest>) as FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        authCreationQueryApiV1ValidatorValidationResult = {
          errorMessage: 'tample-error-message',
          result: false,
        };

        (authCreationQueryApiV1Validator.validate as jest.Mock).mockReturnValueOnce(
          authCreationQueryApiV1ValidatorValidationResult,
        );

        await postAuthTokenV1RequestHandler.handle(
          requestFixture,
          replyFixture,
        );
      });

      afterAll(() => {
        (authCreationQueryApiV1Validator.validate as jest.Mock).mockClear();
      });

      it('must call reply.code with bad request status', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      });

      it('must call reply.send with an error message', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith({
          message: authCreationQueryApiV1ValidatorValidationResult.errorMessage,
        });
      });
    });
  });
});
