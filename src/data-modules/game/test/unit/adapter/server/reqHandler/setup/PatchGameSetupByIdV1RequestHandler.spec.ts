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
import {
  basicGameSetupFixtureFactory,
  extendedGameSetupFixtureFactory,
} from '../../../../../fixtures/domain/model/setup';
import { BasicGameSetup } from '../../../../../../domain/model/setup/BasicGameSetup';
import { BasicGameSetupApiV1 } from '../../../../../../adapter/api/model/setup/BasicGameSetupApiV1';
import { ExtendedGameSetup } from '../../../../../../domain/model/setup/ExtendedGameSetup';
import { GameSetupUpdateQuery } from '../../../../../../domain/query/setup/GameSetupUpdateQuery';
import { GameSetupUpdateQueryApiV1 } from '../../../../../../adapter/api/query/setup/GameSetupUpdateQueryApiV1';
import { GameSetupUpdateQueryApiV1ValidationContext } from '../../../../../../adapter/api/validator/setup/GameSetupUpdateQueryApiV1ValidationContext';
import { PatchGameSetupByIdV1RequestHandler } from '../../../../../../adapter/server/reqHandler/setup/PatchGameSetupByIdV1RequestHandler';
import { StatusCodes } from 'http-status-codes';
import { UserContainer } from '../../../../../../../user/domain';
import { commonTest } from '../../../../../../../../common/test';
import { gameSetupUpdateQueryApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/query/setup';
import { gameSetupUpdateQueryFixtureFactory } from '../../../../../fixtures/domain/query/setup';
import { userFixtureFactory } from '../../../../../../../user/test/fixtures/domain/model/fixtures';

describe(PatchGameSetupByIdV1RequestHandler.name, () => {
  let basicGameSetupToBasicGameSetupApiV1Converter: Converter<
    BasicGameSetup,
    BasicGameSetupApiV1
  >;
  let extendedGameSetupToBasicGameSetupConverter: Converter<
    ExtendedGameSetup,
    BasicGameSetup
  >;
  let gameSetupUpdateQueryApiV1ContextBasedValidator: ContextBasedValidator<
    GameSetupUpdateQueryApiV1,
    GameSetupUpdateQueryApiV1ValidationContext
  >;
  let gameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter: Converter<
    GameSetupUpdateQueryApiV1,
    Promise<GameSetupUpdateQuery>
  >;
  let updateExtendedGameSetupInteractor: Interactor<
    GameSetupUpdateQuery,
    Promise<ExtendedGameSetup | null>
  >;

  let patchGameSetupByIdV1RequestHandler: PatchGameSetupByIdV1RequestHandler;

  beforeAll(() => {
    basicGameSetupToBasicGameSetupApiV1Converter = {
      transform: jest.fn(),
    };
    extendedGameSetupToBasicGameSetupConverter = {
      transform: jest.fn(),
    };
    gameSetupUpdateQueryApiV1ContextBasedValidator = {
      validate: jest.fn(),
    };
    gameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter = {
      transform: jest.fn(),
    };
    updateExtendedGameSetupInteractor = {
      interact: jest.fn(),
    };

    patchGameSetupByIdV1RequestHandler = new PatchGameSetupByIdV1RequestHandler(
      basicGameSetupToBasicGameSetupApiV1Converter,
      extendedGameSetupToBasicGameSetupConverter,
      gameSetupUpdateQueryApiV1ContextBasedValidator,
      gameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter,
      updateExtendedGameSetupInteractor,
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

        (updateExtendedGameSetupInteractor.interact as jest.Mock).mockResolvedValueOnce(
          extendedGameSetupFixtureFactory.get(),
        );

        (extendedGameSetupToBasicGameSetupConverter.transform as jest.Mock).mockReturnValueOnce(
          basicGameSetupFixtureFactory.get(),
        );

        (basicGameSetupToBasicGameSetupApiV1Converter.transform as jest.Mock).mockReturnValueOnce(
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
        (updateExtendedGameSetupInteractor.interact as jest.Mock).mockClear();
        (extendedGameSetupToBasicGameSetupConverter.transform as jest.Mock).mockClear();
        (basicGameSetupToBasicGameSetupApiV1Converter.transform as jest.Mock).mockClear();
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

      it('must call updateExtendedGameSetupInteractor.interact with the domain query parsed', () => {
        expect(
          updateExtendedGameSetupInteractor.interact,
        ).toHaveBeenCalledTimes(1);
        expect(updateExtendedGameSetupInteractor.interact).toHaveBeenCalledWith(
          gameSetupUpdateQueryFixtureFactory.get(),
        );
      });

      it('must call extendedGameSetupToBasicGameSetupConverter.transform with the domain model received', () => {
        expect(
          extendedGameSetupToBasicGameSetupConverter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          extendedGameSetupToBasicGameSetupConverter.transform,
        ).toHaveBeenCalledWith(extendedGameSetupFixtureFactory.get());
      });

      it('must call basicGameSetupToBasicGameSetupApiV1Converter.transform with the domain model received', () => {
        expect(
          basicGameSetupToBasicGameSetupApiV1Converter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          basicGameSetupToBasicGameSetupApiV1Converter.transform,
        ).toHaveBeenCalledWith(basicGameSetupFixtureFactory.get());
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

        (updateExtendedGameSetupInteractor.interact as jest.Mock).mockResolvedValueOnce(
          null,
        );

        (extendedGameSetupToBasicGameSetupConverter.transform as jest.Mock).mockReturnValueOnce(
          basicGameSetupFixtureFactory.get(),
        );

        (basicGameSetupToBasicGameSetupApiV1Converter.transform as jest.Mock).mockReturnValueOnce(
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
        (updateExtendedGameSetupInteractor.interact as jest.Mock).mockClear();
        (extendedGameSetupToBasicGameSetupConverter.transform as jest.Mock).mockClear();
        (basicGameSetupToBasicGameSetupApiV1Converter.transform as jest.Mock).mockClear();
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

        (updateExtendedGameSetupInteractor.interact as jest.Mock).mockResolvedValueOnce(
          null,
        );

        (extendedGameSetupToBasicGameSetupConverter.transform as jest.Mock).mockReturnValueOnce(
          basicGameSetupFixtureFactory.get(),
        );

        (basicGameSetupToBasicGameSetupApiV1Converter.transform as jest.Mock).mockReturnValueOnce(
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
        (updateExtendedGameSetupInteractor.interact as jest.Mock).mockClear();
        (extendedGameSetupToBasicGameSetupConverter.transform as jest.Mock).mockClear();
        (basicGameSetupToBasicGameSetupApiV1Converter.transform as jest.Mock).mockClear();
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
