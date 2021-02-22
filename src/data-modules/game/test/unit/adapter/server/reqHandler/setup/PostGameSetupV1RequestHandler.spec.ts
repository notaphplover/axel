/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import * as fastify from 'fastify';
import { StatusCodes } from 'http-status-codes';

import { Converter, Interactor } from '../../../../../../../../common/domain';
import { EitherEither } from '../../../../../../../../common/domain/either/Either';
import { ValueOrErrors } from '../../../../../../../../common/domain/either/ValueOrErrors';
import { commonTest } from '../../../../../../../../common/test';
import { UserContainer } from '../../../../../../../user/domain';
import { userFixtureFactory } from '../../../../../../../user/test/fixtures/domain/model/fixtures';
import { ExtendedGameSetupApiV1 } from '../../../../../../adapter/api/model/setup/ExtendedGameSetupApiV1';
import { PostGameSetupV1RequestHandler } from '../../../../../../adapter/server/reqHandler/setup/PostGameSetupV1RequestHandler';
import { GameSetup } from '../../../../../../domain/model/setup/GameSetup';
import { GameSetupsCreationQuery } from '../../../../../../domain/query/setup/GameSetupCreationQuery';
import { extendedGameSetupApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/model/setup';
import { gameSetupCreationQueryApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/query/setup';
import { gameSetupFixtureFactory } from '../../../../../fixtures/domain/model/setup';
import { gameSetupsCreationQueryFixtureFactory } from '../../../../../fixtures/domain/query/setup';

describe(PostGameSetupV1RequestHandler.name, () => {
  let gameSetupToExtendedGameSetupApiV1Converter: jest.Mocked<
    Converter<GameSetup, ExtendedGameSetupApiV1>
  >;

  let createGameSetupsInteractor: jest.Mocked<
    Interactor<GameSetupsCreationQuery, Promise<GameSetup[]>>
  >;

  let postGameSetupV1RequestToGameSetupsCreationQueryConverter: jest.Mocked<
    Converter<
      fastify.FastifyRequest & UserContainer,
      Promise<ValueOrErrors<GameSetupsCreationQuery>>
    >
  >;

  let postGameSetupV1RequestHandler: PostGameSetupV1RequestHandler;

  beforeAll(() => {
    gameSetupToExtendedGameSetupApiV1Converter = {
      transform: jest.fn(),
    };

    createGameSetupsInteractor = {
      interact: jest.fn(),
    };

    postGameSetupV1RequestToGameSetupsCreationQueryConverter = {
      transform: jest.fn(),
    };

    postGameSetupV1RequestHandler = new PostGameSetupV1RequestHandler(
      gameSetupToExtendedGameSetupApiV1Converter,
      createGameSetupsInteractor,
      postGameSetupV1RequestToGameSetupsCreationQueryConverter,
    );
  });

  describe('.handle()', () => {
    describe('when called, and the request is valid', () => {
      let requestFixture: fastify.FastifyRequest & UserContainer;
      let replyFixture: fastify.FastifyReply;

      beforeAll(async () => {
        requestFixture = ({
          body: gameSetupCreationQueryApiV1FixtureFactory.get(),
          user: userFixtureFactory.get(),
        } as Partial<
          fastify.FastifyRequest & UserContainer
        >) as fastify.FastifyRequest & UserContainer;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        const gameSetupsCreationQueryOrErrors: ValueOrErrors<GameSetupsCreationQuery> = {
          isEither: false,
          value: gameSetupsCreationQueryFixtureFactory.get(),
        };

        createGameSetupsInteractor.interact.mockResolvedValueOnce([
          gameSetupFixtureFactory.get(),
        ]);

        gameSetupToExtendedGameSetupApiV1Converter.transform.mockReturnValueOnce(
          extendedGameSetupApiV1FixtureFactory.get(),
        );

        postGameSetupV1RequestToGameSetupsCreationQueryConverter.transform.mockResolvedValueOnce(
          gameSetupsCreationQueryOrErrors,
        );

        await postGameSetupV1RequestHandler.handle(
          requestFixture,
          replyFixture,
        );
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
      let requestFixture: fastify.FastifyRequest & UserContainer;
      let replyFixture: fastify.FastifyReply;

      let gameSetupCreationQueryOrErrors: EitherEither<string[]>;

      beforeAll(async () => {
        requestFixture = ({
          body: gameSetupCreationQueryApiV1FixtureFactory.get(),
          user: userFixtureFactory.get(),
        } as Partial<
          fastify.FastifyRequest & UserContainer
        >) as fastify.FastifyRequest & UserContainer;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        gameSetupCreationQueryOrErrors = {
          isEither: true,
          value: ['test error message'],
        };

        postGameSetupV1RequestToGameSetupsCreationQueryConverter.transform.mockResolvedValueOnce(
          gameSetupCreationQueryOrErrors,
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
          message: gameSetupCreationQueryOrErrors.value[0],
        });
      });
    });
  });
});
