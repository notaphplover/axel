/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import {
  Converter,
  Interactor,
  ValidationFail,
  ValidationResult,
  Validator,
} from '../../../../../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GameCreationQueryApiV1 } from '../../../../../../adapter/api/query/GameCreationQueryApiV1';
import { LiveGame } from '../../../../../../domain/model/live/LiveGame';
import { LiveGameApiV1 } from '../../../../../../adapter/api/model/live/LiveGameApiV1';
import { LiveGameCreationQuery } from '../../../../../../domain/query/live/LiveGameCreationQuery';
import { PostLiveGameV1RequestHandler } from '../../../../../../adapter/server/reqHandler/live/PostLiveGameV1RequestHandler';
import { StatusCodes } from 'http-status-codes';
import { commonTest } from '../../../../../../../../common/test';
import { gameApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/model';
import { gameCreationQueryApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/query/card';
import { gameCreationQueryFixtureFactory } from '../../../../../fixtures/domain/query/card';
import { gameFixtureFactory } from '../../../../../fixtures/domain/model';

describe(PostLiveGameV1RequestHandler.name, () => {
  let createGamesInteractor: Interactor<
    LiveGameCreationQuery,
    Promise<LiveGame[]>
  >;
  let gameCreationQueryApiV1Validator: Validator<GameCreationQueryApiV1>;
  let gameToGameApiV1Converter: Converter<LiveGame, LiveGameApiV1>;

  let postGameV1RequestHandler: PostLiveGameV1RequestHandler;

  beforeAll(() => {
    createGamesInteractor = {
      interact: jest.fn(),
    };
    gameCreationQueryApiV1Validator = { validate: jest.fn() };
    gameToGameApiV1Converter = { transform: jest.fn() };

    postGameV1RequestHandler = new PostLiveGameV1RequestHandler(
      createGamesInteractor,
      gameCreationQueryApiV1Validator,
      gameToGameApiV1Converter,
    );
  });

  describe('.handle()', () => {
    describe('when called and the request is valid', () => {
      let requestFixture: FastifyRequest;
      let replyFixture: FastifyReply;

      beforeAll(async () => {
        requestFixture = ({
          body: gameCreationQueryApiV1FixtureFactory.get(),
        } as Partial<FastifyRequest>) as FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        (createGamesInteractor.interact as jest.Mock).mockResolvedValueOnce([
          gameFixtureFactory.get(),
        ]);
        const gameCreationQueryApiV1ValidatorValidationResult: ValidationResult<GameCreationQueryApiV1> = {
          model: gameCreationQueryApiV1FixtureFactory.get(),
          result: true,
        };
        (gameCreationQueryApiV1Validator.validate as jest.Mock).mockReturnValueOnce(
          gameCreationQueryApiV1ValidatorValidationResult,
        );
        (gameToGameApiV1Converter.transform as jest.Mock).mockReturnValueOnce(
          gameApiV1FixtureFactory.get(),
        );

        await postGameV1RequestHandler.handle(requestFixture, replyFixture);
      });

      it('must call gameCreationQueryApiV1Validator.validate() with the request body', () => {
        expect(gameCreationQueryApiV1Validator.validate).toHaveBeenCalledTimes(
          1,
        );
        expect(gameCreationQueryApiV1Validator.validate).toHaveBeenCalledWith(
          requestFixture.body,
        );
      });

      it('must call createGamesInteractor.interact()', () => {
        expect(createGamesInteractor.interact).toHaveBeenCalledTimes(1);
        expect(createGamesInteractor.interact).toHaveBeenCalledWith(
          gameCreationQueryFixtureFactory.get(),
        );
      });

      it('must call gameToGameApiV1Converter.transform() with the game created', () => {
        expect(gameToGameApiV1Converter.transform).toHaveBeenCalledTimes(1);
        expect(gameToGameApiV1Converter.transform).toHaveBeenCalledWith(
          gameFixtureFactory.get(),
        );
      });

      it('must call reply.send with the gameApiV1 generated', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith(
          gameApiV1FixtureFactory.get(),
        );
      });
    });

    describe('when called and the request is not valid', () => {
      let requestFixture: FastifyRequest;
      let replyFixture: FastifyReply;

      let gameCreationQueryApiV1ValidatorValidationResult: ValidationFail;

      beforeAll(async () => {
        requestFixture = ({
          body: gameCreationQueryApiV1FixtureFactory.get(),
        } as Partial<FastifyRequest>) as FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        gameCreationQueryApiV1ValidatorValidationResult = {
          result: false,
          errorMessage: 'test error message',
        };
        (gameCreationQueryApiV1Validator.validate as jest.Mock).mockReturnValueOnce(
          gameCreationQueryApiV1ValidatorValidationResult,
        );

        await postGameV1RequestHandler.handle(requestFixture, replyFixture);
      });

      it('must call reply.code() with bad status HTTP code', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      });

      it('must call reply.send() with the validation errror message', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith({
          message: gameCreationQueryApiV1ValidatorValidationResult.errorMessage,
        });
      });
    });
  });
});
