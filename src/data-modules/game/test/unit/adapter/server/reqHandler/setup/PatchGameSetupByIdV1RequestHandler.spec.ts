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
import {
  basicGameSetupApiV1FixtureFactory,
  extendedGameSetupApiV1FixtureFactory,
} from '../../../../../fixtures/adapter/api/model/setup';
import { BasicGameSetupApiV1 } from '../../../../../../adapter/api/model/setup/BasicGameSetupApiV1';
import { GameSetup } from '../../../../../../domain/model/setup/GameSetup';
import { GameSetupUpdateQuery } from '../../../../../../domain/query/setup/GameSetupUpdateQuery';
import { GameSetupUpdateQueryApiV1 } from '../../../../../../adapter/api/query/setup/GameSetupUpdateQueryApiV1';
import { GameSetupUpdateQueryApiV1ValidationContext } from '../../../../../../adapter/api/validator/setup/GameSetupUpdateQueryApiV1ValidationContext';
import { PatchGameSetupByIdV1RequestHandler } from '../../../../../../adapter/server/reqHandler/setup/PatchGameSetupByIdV1RequestHandler';
import { StatusCodes } from 'http-status-codes';
import { UserContainer } from '../../../../../../../user/domain';
import { commonTest } from '../../../../../../../../common/test';
import { gameSetupFixtureFactory } from '../../../../../fixtures/domain/model/setup';
import { gameSetupUpdateQueryApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/query/setup';
import { gameSetupUpdateQueryFixtureFactory } from '../../../../../fixtures/domain/query/setup';
import { userFixtureFactory } from '../../../../../../../user/test/fixtures/domain/model/fixtures';

describe(PatchGameSetupByIdV1RequestHandler.name, () => {
  let gameSetupToBasicGameSetupApiV1Converter: Converter<
    GameSetup,
    BasicGameSetupApiV1
  >;
  let gameSetupUpdateQueryApiV1ContextBasedValidator: ContextBasedValidator<
    GameSetupUpdateQueryApiV1,
    GameSetupUpdateQueryApiV1ValidationContext
  >;
  let gameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter: Converter<
    GameSetupUpdateQueryApiV1,
    Promise<GameSetupUpdateQuery>
  >;
  let updateGameSetupInteractor: Interactor<
    GameSetupUpdateQuery,
    Promise<GameSetup | null>
  >;

  let patchGameSetupByIdV1RequestHandler: PatchGameSetupByIdV1RequestHandler;

  beforeAll(() => {
    gameSetupToBasicGameSetupApiV1Converter = {
      transform: jest.fn(),
    };
    gameSetupUpdateQueryApiV1ContextBasedValidator = {
      validate: jest.fn(),
    };
    gameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter = {
      transform: jest.fn(),
    };
    updateGameSetupInteractor = {
      interact: jest.fn(),
    };

    patchGameSetupByIdV1RequestHandler = new PatchGameSetupByIdV1RequestHandler(
      gameSetupToBasicGameSetupApiV1Converter,
      gameSetupUpdateQueryApiV1ContextBasedValidator,
      gameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter,
      updateGameSetupInteractor,
    );
  });

  describe('.handle()', () => {
    describe('when called, and the request is valid', () => {
      let requestFixture: FastifyRequest & UserContainer;
      let replyFixture: FastifyReply;

      beforeAll(async () => {
        const requestFixtureBody: Partial<GameSetupUpdateQueryApiV1> = gameSetupUpdateQueryApiV1FixtureFactory.get();

        delete requestFixtureBody.id;

        requestFixture = ({
          body: requestFixtureBody,
          params: {
            gameSetupId: gameSetupUpdateQueryApiV1FixtureFactory.get().id,
          },
          user: userFixtureFactory.get(),
        } as Partial<FastifyRequest & UserContainer>) as FastifyRequest &
          UserContainer;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        const expectedValidationResult: ValidationSuccess<GameSetupUpdateQueryApiV1> = {
          model: gameSetupUpdateQueryApiV1FixtureFactory.get(),
          result: true,
        };

        (gameSetupUpdateQueryApiV1ContextBasedValidator.validate as jest.Mock).mockReturnValueOnce(
          expectedValidationResult,
        );

        (gameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          gameSetupUpdateQueryFixtureFactory.get(),
        );

        (updateGameSetupInteractor.interact as jest.Mock).mockResolvedValueOnce(
          gameSetupFixtureFactory.get(),
        );

        (gameSetupToBasicGameSetupApiV1Converter.transform as jest.Mock).mockReturnValueOnce(
          basicGameSetupApiV1FixtureFactory.get(),
        );

        await patchGameSetupByIdV1RequestHandler.handle(
          requestFixture,
          replyFixture,
        );
      });

      afterAll(() => {
        (gameSetupUpdateQueryApiV1ContextBasedValidator.validate as jest.Mock).mockClear();
        (gameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter.transform as jest.Mock).mockClear();
        (updateGameSetupInteractor.interact as jest.Mock).mockClear();
        (gameSetupToBasicGameSetupApiV1Converter.transform as jest.Mock).mockClear();
      });

      it('must call gameSetupUpdateQueryApiV1ContextBasedValidator.validate with the query from the request and the user', () => {
        expect(
          gameSetupUpdateQueryApiV1ContextBasedValidator.validate,
        ).toHaveBeenCalledTimes(1);
        expect(
          gameSetupUpdateQueryApiV1ContextBasedValidator.validate,
        ).toHaveBeenCalledWith(gameSetupUpdateQueryApiV1FixtureFactory.get(), {
          user: requestFixture.user,
        });
      });

      it('must call gameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter.transform with the validated model received', () => {
        expect(
          gameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          gameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter.transform,
        ).toHaveBeenCalledWith(gameSetupUpdateQueryApiV1FixtureFactory.get());
      });

      it('must call updateGameSetupInteractor.interact with the domain query parsed', () => {
        expect(updateGameSetupInteractor.interact).toHaveBeenCalledTimes(1);
        expect(updateGameSetupInteractor.interact).toHaveBeenCalledWith(
          gameSetupUpdateQueryFixtureFactory.get(),
        );
      });

      it('must call basicGameSetupToBasicGameSetupApiV1Converter.transform with the domain model received', () => {
        expect(
          gameSetupToBasicGameSetupApiV1Converter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          gameSetupToBasicGameSetupApiV1Converter.transform,
        ).toHaveBeenCalledWith(gameSetupFixtureFactory.get());
      });

      it('must call reply.send with the api model converted', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith(
          extendedGameSetupApiV1FixtureFactory.get(),
        );
      });
    });

    describe('when called, and the request is valid, and no game setup is found', () => {
      let requestFixture: FastifyRequest & UserContainer;
      let replyFixture: FastifyReply;

      beforeAll(async () => {
        const requestFixtureBody: Partial<GameSetupUpdateQueryApiV1> = gameSetupUpdateQueryApiV1FixtureFactory.get();

        delete requestFixtureBody.id;

        requestFixture = ({
          body: requestFixtureBody,
          params: {
            gameSetupId: gameSetupUpdateQueryApiV1FixtureFactory.get().id,
          },
          user: userFixtureFactory.get(),
        } as Partial<FastifyRequest & UserContainer>) as FastifyRequest &
          UserContainer;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        const expectedValidationResult: ValidationSuccess<GameSetupUpdateQueryApiV1> = {
          model: gameSetupUpdateQueryApiV1FixtureFactory.get(),
          result: true,
        };

        (gameSetupUpdateQueryApiV1ContextBasedValidator.validate as jest.Mock).mockReturnValueOnce(
          expectedValidationResult,
        );

        (gameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          gameSetupUpdateQueryFixtureFactory.get(),
        );

        (updateGameSetupInteractor.interact as jest.Mock).mockResolvedValueOnce(
          null,
        );

        (gameSetupToBasicGameSetupApiV1Converter.transform as jest.Mock).mockReturnValueOnce(
          basicGameSetupApiV1FixtureFactory.get(),
        );

        await patchGameSetupByIdV1RequestHandler.handle(
          requestFixture,
          replyFixture,
        );
      });

      afterAll(() => {
        (gameSetupUpdateQueryApiV1ContextBasedValidator.validate as jest.Mock).mockClear();
        (gameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter.transform as jest.Mock).mockClear();
        (updateGameSetupInteractor.interact as jest.Mock).mockClear();
        (gameSetupToBasicGameSetupApiV1Converter.transform as jest.Mock).mockClear();
      });

      it('must call reply.code with a NOT_FOUND code', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
      });

      it('must call reply.send with a message error', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith({
          message: expect.any(String) as string,
        });
      });
    });

    describe('when called, and the request is not valid', () => {
      let requestFixture: FastifyRequest & UserContainer;
      let replyFixture: FastifyReply;

      let expectedValidationResult: ValidationFail;

      beforeAll(async () => {
        const requestFixtureBody: Partial<GameSetupUpdateQueryApiV1> = gameSetupUpdateQueryApiV1FixtureFactory.get();

        delete requestFixtureBody.id;

        requestFixture = ({
          body: requestFixtureBody,
          params: {
            gameSetupId: gameSetupUpdateQueryApiV1FixtureFactory.get().id,
          },
          user: userFixtureFactory.get(),
        } as Partial<FastifyRequest & UserContainer>) as FastifyRequest &
          UserContainer;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        expectedValidationResult = {
          errorMessage: 'sample-error-message',
          result: false,
        };

        (gameSetupUpdateQueryApiV1ContextBasedValidator.validate as jest.Mock).mockReturnValueOnce(
          expectedValidationResult,
        );

        (gameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          gameSetupUpdateQueryFixtureFactory.get(),
        );

        (updateGameSetupInteractor.interact as jest.Mock).mockResolvedValueOnce(
          null,
        );

        (gameSetupToBasicGameSetupApiV1Converter.transform as jest.Mock).mockReturnValueOnce(
          basicGameSetupApiV1FixtureFactory.get(),
        );

        await patchGameSetupByIdV1RequestHandler.handle(
          requestFixture,
          replyFixture,
        );
      });

      afterAll(() => {
        (gameSetupUpdateQueryApiV1ContextBasedValidator.validate as jest.Mock).mockClear();
        (gameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter.transform as jest.Mock).mockClear();
        (updateGameSetupInteractor.interact as jest.Mock).mockClear();
        (gameSetupToBasicGameSetupApiV1Converter.transform as jest.Mock).mockClear();
      });

      it('must call reply.code with a BAD_REQUEST code', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      });

      it('must call reply.send with a message error', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith({
          message: expectedValidationResult.errorMessage,
        });
      });
    });
  });
});
