/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import {
  Converter,
  Interactor,
  ValidationFail,
  ValidationResult,
  Validator,
} from '../../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PostUserV1RequestHandler } from '../../../../adapter/server/reqHandler/PostUserV1RequestHandler';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../../../domain/model/User';
import { UserApiV1 } from '../../../../adapter/api/model/UserApiV1';
import { UserCreationQuery } from '../../../../domain/query/UserCreationQuery';
import { UserCreationQueryApiV1 } from '../../../../adapter/api/query/UserCreationQueryApiV1';
import { commonTest } from '../../../../../common/test';
import { userApiV1FixtureFactory } from '../../../fixtures/adapter/api/model/fixtures';
import { userCreationQueryApiV1FixtureFactory } from '../../../fixtures/adapter/api/query/fixtures';
import { userCreationQueryFixtureFactory } from '../../../fixtures/domain/query/fixtures';
import { userFixtureFactory } from '../../../fixtures/domain/model/fixtures';
import { UserRole } from '../../../../domain/model/UserRole';

describe(PostUserV1RequestHandler.name, () => {
  let createUsersInteractor: Interactor<UserCreationQuery, Promise<User[]>>;
  let userCreationQueryApiV1Validator: Validator<UserCreationQueryApiV1>;
  let userToUserApiV1Converter: Converter<User, UserApiV1>;

  let postUserV1RequestHandler: PostUserV1RequestHandler;

  beforeAll(() => {
    createUsersInteractor = {
      interact: jest.fn(),
    };
    userCreationQueryApiV1Validator = { validate: jest.fn() };
    userToUserApiV1Converter = { transform: jest.fn() };

    postUserV1RequestHandler = new PostUserV1RequestHandler(
      createUsersInteractor,
      userCreationQueryApiV1Validator,
      userToUserApiV1Converter,
    );
  });

  describe('.handle()', () => {
    describe('when called and the request is valid', () => {
      let requestFixture: FastifyRequest;
      let replyFixture: FastifyReply;

      beforeAll(async () => {
        requestFixture = ({
          body: userCreationQueryApiV1FixtureFactory.get(),
        } as Partial<FastifyRequest>) as FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        (createUsersInteractor.interact as jest.Mock).mockResolvedValueOnce([
          userFixtureFactory.get(),
        ]);
        const userCreationQueryApiV1ValidatorValidationResult: ValidationResult<UserCreationQueryApiV1> = {
          model: userCreationQueryApiV1FixtureFactory.get(),
          result: true,
        };
        (userCreationQueryApiV1Validator.validate as jest.Mock).mockReturnValueOnce(
          userCreationQueryApiV1ValidatorValidationResult,
        );
        (userToUserApiV1Converter.transform as jest.Mock).mockReturnValueOnce(
          userApiV1FixtureFactory.get(),
        );

        await postUserV1RequestHandler.handle(requestFixture, replyFixture);
      });

      it('must call userCreationQueryApiV1Validator.validate() with the request body', () => {
        expect(userCreationQueryApiV1Validator.validate).toHaveBeenCalledTimes(
          1,
        );
        expect(userCreationQueryApiV1Validator.validate).toHaveBeenCalledWith(
          requestFixture.body,
        );
      });

      it('must call createUsersInteractor.interact()', () => {
        const expected: UserCreationQuery = userCreationQueryFixtureFactory.get();

        expected.roles = [UserRole.CLIENT];

        expect(createUsersInteractor.interact).toHaveBeenCalledTimes(1);
        expect(createUsersInteractor.interact).toHaveBeenCalledWith(expected);
      });

      it('must call userToUserApiV1Converter.transform() with the user created', () => {
        expect(userToUserApiV1Converter.transform).toHaveBeenCalledTimes(1);
        expect(userToUserApiV1Converter.transform).toHaveBeenCalledWith(
          userFixtureFactory.get(),
        );
      });

      it('must call reply.send with the userApiV1 generated', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith(
          userApiV1FixtureFactory.get(),
        );
      });
    });

    describe('when called and the request is not valid', () => {
      let requestFixture: FastifyRequest;
      let replyFixture: FastifyReply;

      let userCreationQueryApiV1ValidatorValidationResult: ValidationFail;

      beforeAll(async () => {
        requestFixture = ({
          body: userCreationQueryApiV1FixtureFactory.get(),
        } as Partial<FastifyRequest>) as FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        userCreationQueryApiV1ValidatorValidationResult = {
          result: false,
          errorMessage: 'test error message',
        };
        (userCreationQueryApiV1Validator.validate as jest.Mock).mockReturnValueOnce(
          userCreationQueryApiV1ValidatorValidationResult,
        );

        await postUserV1RequestHandler.handle(requestFixture, replyFixture);
      });

      it('must call reply.code() with bad status HTTP code', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      });

      it('must call reply.send() with the validation errror message', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith(
          userCreationQueryApiV1ValidatorValidationResult.errorMessage,
        );
      });
    });
  });
});
