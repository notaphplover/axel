/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import {
  ContextBasedValidator,
  Converter,
  Interactor,
  ValidationFail,
  ValidationSuccess,
} from '../../../../../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ExtendedGameSetupApiV1 } from '../../../../../../adapter/api/model/setup/ExtendedGameSetupApiV1';
import { GameSetup } from '../../../../../../domain/model/setup/GameSetup';
import { GameSetupCreationQueryApiV1 } from '../../../../../../adapter/api/query/setup/GameSetupCreationQueryApiV1';
import { GameSetupCreationQueryApiV1ValidationContext } from '../../../../../../adapter/api/validator/setup/GameSetupCreationQueryApiV1ValidationContext';
import { GameSetupsCreationQuery } from '../../../../../../domain/query/setup/GameSetupCreationQuery';
import { PostGameSetupV1RequestHandler } from '../../../../../../adapter/server/reqHandler/setup/PostGameSetupV1RequestHandler';
import { StatusCodes } from 'http-status-codes';
import { UserContainer } from '../../../../../../../user/domain';
import { commonTest } from '../../../../../../../../common/test';
import { extendedGameSetupApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/model/setup';
import { gameSetupCreationQueryApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/query/setup';
import { gameSetupFixtureFactory } from '../../../../../fixtures/domain/model/setup';
import { gameSetupsCreationQueryFixtureFactory } from '../../../../../fixtures/domain/query/setup';
import { userFixtureFactory } from '../../../../../../../user/test/fixtures/domain/model/fixtures';

describe(PostGameSetupV1RequestHandler.name, () => {
  let gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter: Converter<
    GameSetupCreationQueryApiV1,
    Promise<GameSetupsCreationQuery>
  >;

  let gameSetupCreationQueryApiV1ContextBasedValidator: ContextBasedValidator<
    GameSetupCreationQueryApiV1,
    GameSetupCreationQueryApiV1ValidationContext
  >;

  let gameSetupToExtendedGameSetupApiV1Converter: Converter<
    GameSetup,
    ExtendedGameSetupApiV1
  >;

  let createGameSetupsInteractor: Interactor<
    GameSetupsCreationQuery,
    Promise<GameSetup[]>
  >;

  let postGameSetupV1RequestHandler: PostGameSetupV1RequestHandler;

  beforeAll(() => {
    gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter = {
      transform: jest.fn(),
    };

    gameSetupCreationQueryApiV1ContextBasedValidator = {
      validate: jest.fn(),
    };

    gameSetupToExtendedGameSetupApiV1Converter = {
      transform: jest.fn(),
    };

    createGameSetupsInteractor = {
      interact: jest.fn(),
    };

    postGameSetupV1RequestHandler = new PostGameSetupV1RequestHandler(
      gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter,
      gameSetupCreationQueryApiV1ContextBasedValidator,
      gameSetupToExtendedGameSetupApiV1Converter,
      createGameSetupsInteractor,
    );
  });

  describe('.handle()', () => {
    describe('when called, and the request is valid', () => {
      let requestFixture: FastifyRequest & UserContainer;
      let replyFixture: FastifyReply;

      beforeAll(async () => {
        requestFixture = ({
          body: gameSetupCreationQueryApiV1FixtureFactory.get(),
          user: userFixtureFactory.get(),
        } as Partial<FastifyRequest & UserContainer>) as FastifyRequest &
          UserContainer;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        const expectedValidationResult: ValidationSuccess<GameSetupCreationQueryApiV1> = {
          model: gameSetupCreationQueryApiV1FixtureFactory.get(),
          result: true,
        };
        (gameSetupCreationQueryApiV1ContextBasedValidator.validate as jest.Mock).mockReturnValueOnce(
          expectedValidationResult,
        );

        (gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter.transform as jest.Mock).mockResolvedValueOnce(
          gameSetupsCreationQueryFixtureFactory.get(),
        );

        (createGameSetupsInteractor.interact as jest.Mock).mockResolvedValueOnce(
          [gameSetupFixtureFactory.get()],
        );

        (gameSetupToExtendedGameSetupApiV1Converter.transform as jest.Mock).mockReturnValueOnce(
          extendedGameSetupApiV1FixtureFactory.get(),
        );

        await postGameSetupV1RequestHandler.handle(
          requestFixture,
          replyFixture,
        );
      });

      it('must call gameSetupCreationQueryApiV1ContextBasedValidator.validate with the request body and the validation context', () => {
        expect(
          gameSetupCreationQueryApiV1ContextBasedValidator.validate,
        ).toHaveBeenCalledTimes(1);
        expect(
          gameSetupCreationQueryApiV1ContextBasedValidator.validate,
        ).toHaveBeenCalledWith(
          gameSetupCreationQueryApiV1FixtureFactory.get(),
          { user: userFixtureFactory.get() },
        );
      });

      it('must call gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter.transform with the model obtained', () => {
        expect(
          gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter.transform,
        ).toHaveBeenCalledWith(gameSetupCreationQueryApiV1FixtureFactory.get());
      });

      it('must call createGameSetupsInteractor.interact with the gameSetupsCreationQuery obtained', () => {
        expect(createGameSetupsInteractor.interact).toHaveBeenCalledTimes(1);
        expect(createGameSetupsInteractor.interact).toHaveBeenCalledWith(
          gameSetupsCreationQueryFixtureFactory.get(),
        );
      });

      it('must call gameSetupToGameSetupApiV1Converter.transform with the game setup created', () => {
        expect(
          gameSetupToExtendedGameSetupApiV1Converter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          gameSetupToExtendedGameSetupApiV1Converter.transform,
        ).toHaveBeenCalledWith(gameSetupFixtureFactory.get());
      });

      it('must call reply.send with the game setup api v1 transformed', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith(
          extendedGameSetupApiV1FixtureFactory.get(),
        );
      });
    });

    describe('when called and the request is not valid', () => {
      let requestFixture: FastifyRequest & UserContainer;
      let replyFixture: FastifyReply;

      let gameSetupCreationQueryApiV1ContextBasedValidatorValidationResult: ValidationFail;

      beforeAll(async () => {
        requestFixture = ({
          body: gameSetupCreationQueryApiV1FixtureFactory.get(),
          user: userFixtureFactory.get(),
        } as Partial<FastifyRequest & UserContainer>) as FastifyRequest &
          UserContainer;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        gameSetupCreationQueryApiV1ContextBasedValidatorValidationResult = {
          result: false,
          errorMessage: 'test error message',
        };
        (gameSetupCreationQueryApiV1ContextBasedValidator.validate as jest.Mock).mockReturnValueOnce(
          gameSetupCreationQueryApiV1ContextBasedValidatorValidationResult,
        );

        await postGameSetupV1RequestHandler.handle(
          requestFixture,
          replyFixture,
        );
      });

      it('must call reply.code() with bad status HTTP code', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      });

      it('must call reply.send() with the validation errror message', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith({
          message:
            gameSetupCreationQueryApiV1ContextBasedValidatorValidationResult.errorMessage,
        });
      });
    });
  });
});
