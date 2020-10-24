/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import {
  Converter,
  Interactor,
  ValidationFail,
  ValidationSuccess,
  Validator,
} from '../../../../../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ExtendedGameSetup } from '../../../../../../domain/model/setup/ExtendedGameSetup';
import { ExtendedGameSetupApiV1 } from '../../../../../../adapter/api/model/setup/ExtendedGameSetupApiV1';
import { GameSetupCreationQueryApiV1 } from '../../../../../../adapter/api/query/setup/GameSetupCreationQueryApiV1';
import { GameSetupsCreationQuery } from '../../../../../../domain/query/setup/GameSetupCreationQuery';
import { PostGameSetupV1RequestHandler } from '../../../../../../adapter/server/reqHandler/setup/PostGameSetupV1RequestHandler';
import { StatusCodes } from 'http-status-codes';
import { UserContainer } from '../../../../../../../user/domain';
import { commonTest } from '../../../../../../../../common/test';
import { extendedGameSetupApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/model/setup';
import { extendedGameSetupFixtureFactory } from '../../../../../fixtures/domain/model/setup';
import { gameSetupCreationQueryApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/query/setup';
import { gameSetupsCreationQueryFixtureFactory } from '../../../../../fixtures/domain/query/setup';
import { userFixtureFactory } from '../../../../../../../user/test/fixtures/domain/model/fixtures';

describe(PostGameSetupV1RequestHandler.name, () => {
  let gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter: Converter<
    GameSetupCreationQueryApiV1,
    GameSetupsCreationQuery
  >;

  let gameSetupCreationQueryApiV1Validator: Validator<GameSetupCreationQueryApiV1>;

  let extendedGameSetupToExtendedGameSetupApiV1Converter: Converter<
    ExtendedGameSetup,
    ExtendedGameSetupApiV1
  >;

  let createExtendedGameSetupsInteractor: Interactor<
    GameSetupsCreationQuery,
    Promise<ExtendedGameSetup[]>
  >;

  let postGameSetupV1RequestHandler: PostGameSetupV1RequestHandler;

  beforeAll(() => {
    gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter = {
      transform: jest.fn(),
    };

    gameSetupCreationQueryApiV1Validator = {
      validate: jest.fn(),
    };

    extendedGameSetupToExtendedGameSetupApiV1Converter = {
      transform: jest.fn(),
    };

    createExtendedGameSetupsInteractor = {
      interact: jest.fn(),
    };

    postGameSetupV1RequestHandler = new PostGameSetupV1RequestHandler(
      gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter,
      gameSetupCreationQueryApiV1Validator,
      extendedGameSetupToExtendedGameSetupApiV1Converter,
      createExtendedGameSetupsInteractor,
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
        (gameSetupCreationQueryApiV1Validator.validate as jest.Mock).mockReturnValueOnce(
          expectedValidationResult,
        );

        (gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          gameSetupsCreationQueryFixtureFactory.get(),
        );

        (createExtendedGameSetupsInteractor.interact as jest.Mock).mockResolvedValueOnce(
          [extendedGameSetupFixtureFactory.get()],
        );

        (extendedGameSetupToExtendedGameSetupApiV1Converter.transform as jest.Mock).mockReturnValueOnce(
          extendedGameSetupApiV1FixtureFactory.get(),
        );

        await postGameSetupV1RequestHandler.handle(
          requestFixture,
          replyFixture,
        );
      });

      it('must call gameSetupCreationQueryApiV1Validator.validate with the request body', () => {
        expect(
          gameSetupCreationQueryApiV1Validator.validate,
        ).toHaveBeenCalledTimes(1);
        expect(
          gameSetupCreationQueryApiV1Validator.validate,
        ).toHaveBeenCalledWith(gameSetupCreationQueryApiV1FixtureFactory.get());
      });

      it('must call gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter.transform with the model obtained', () => {
        expect(
          gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter.transform,
        ).toHaveBeenCalledWith(gameSetupCreationQueryApiV1FixtureFactory.get());
      });

      it('must call createExtendedGameSetupsInteractor.interact with the gameSetupsCreationQuery obtained', () => {
        expect(
          createExtendedGameSetupsInteractor.interact,
        ).toHaveBeenCalledTimes(1);
        expect(
          createExtendedGameSetupsInteractor.interact,
        ).toHaveBeenCalledWith(gameSetupsCreationQueryFixtureFactory.get());
      });

      it('must call extendedGameSetupToExtendedGameSetupApiV1Converter.transform with the game setup created', () => {
        expect(
          extendedGameSetupToExtendedGameSetupApiV1Converter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          extendedGameSetupToExtendedGameSetupApiV1Converter.transform,
        ).toHaveBeenCalledWith(extendedGameSetupFixtureFactory.get());
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

      let gameSetupCreationQueryApiV1ValidatorValidationResult: ValidationFail;

      beforeAll(async () => {
        requestFixture = ({
          body: gameSetupCreationQueryApiV1FixtureFactory.get(),
          user: userFixtureFactory.get(),
        } as Partial<FastifyRequest & UserContainer>) as FastifyRequest &
          UserContainer;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        gameSetupCreationQueryApiV1ValidatorValidationResult = {
          result: false,
          errorMessage: 'test error message',
        };
        (gameSetupCreationQueryApiV1Validator.validate as jest.Mock).mockReturnValueOnce(
          gameSetupCreationQueryApiV1ValidatorValidationResult,
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
            gameSetupCreationQueryApiV1ValidatorValidationResult.errorMessage,
        });
      });
    });
  });
});
