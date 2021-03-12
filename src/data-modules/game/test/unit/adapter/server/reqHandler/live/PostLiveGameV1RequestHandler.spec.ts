import 'reflect-metadata';
import * as fastify from 'fastify';
import { StatusCodes } from 'http-status-codes';

import {
  Converter,
  Interactor,
  EitherEither,
  ValueOrErrors,
} from '../../../../../../../../common/domain';
import { commonTest } from '../../../../../../../../common/test';
import { UserContainer } from '../../../../../../../user/domain';
import { userFixtureFactory } from '../../../../../../../user/test/fixtures/domain/model/fixtures';
import { LiveGameApiV1 } from '../../../../../../adapter/api/model/live/LiveGameApiV1';
import { PostLiveGameV1RequestHandler } from '../../../../../../adapter/server/reqHandler/live/PostLiveGameV1RequestHandler';
import { LiveGame } from '../../../../../../domain/model/live/LiveGame';
import { LiveGameCreationQuery } from '../../../../../../domain/query/live/LiveGameCreationQuery';
import { GameSetupDeletionQuery } from '../../../../../../domain/query/setup/GameSetupDeletionQuery';
import { liveGameApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/model/live';
import { liveGameCreationQueryApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/query/card';
import { liveGameFixtureFactory } from '../../../../../fixtures/domain/model/live';
import { liveGameCreationQueryFixtureFactory } from '../../../../../fixtures/domain/query/live';
import { gameSetupDeletionQueryFixtureFactory } from '../../../../../fixtures/domain/query/setup';

describe(PostLiveGameV1RequestHandler.name, () => {
  let createGamesInteractor: jest.Mocked<
    Interactor<LiveGameCreationQuery, Promise<LiveGame[]>>
  >;
  let deleteGameSetupInteractor: jest.Mocked<
    Interactor<GameSetupDeletionQuery, Promise<void>>
  >;
  let gameToGameApiV1Converter: jest.Mocked<Converter<LiveGame, LiveGameApiV1>>;
  let postLiveGameV1RequestToLiveGameCreationQueryConverter: jest.Mocked<
    Converter<
      fastify.FastifyRequest & UserContainer,
      Promise<ValueOrErrors<LiveGameCreationQuery>>
    >
  >;

  let postGameV1RequestHandler: PostLiveGameV1RequestHandler;

  beforeAll(() => {
    createGamesInteractor = {
      interact: jest.fn(),
    };
    deleteGameSetupInteractor = {
      interact: jest.fn(),
    };
    gameToGameApiV1Converter = { transform: jest.fn() };
    postLiveGameV1RequestToLiveGameCreationQueryConverter = {
      transform: jest.fn(),
    };

    postGameV1RequestHandler = new PostLiveGameV1RequestHandler(
      createGamesInteractor,
      deleteGameSetupInteractor,
      gameToGameApiV1Converter,
      postLiveGameV1RequestToLiveGameCreationQueryConverter,
    );
  });

  describe('.handle()', () => {
    describe('when called and the request is valid', () => {
      let liveGameCreationQueryOrErrors: ValueOrErrors<LiveGameCreationQuery>;

      let requestFixture: fastify.FastifyRequest & UserContainer;
      let replyFixture: fastify.FastifyReply;

      beforeAll(async () => {
        liveGameCreationQueryOrErrors = {
          isEither: false,
          value: liveGameCreationQueryFixtureFactory.get(),
        };

        requestFixture = ({
          body: liveGameCreationQueryApiV1FixtureFactory.get(),
          user: userFixtureFactory.get(),
        } as Partial<
          fastify.FastifyRequest & UserContainer
        >) as fastify.FastifyRequest & UserContainer;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        createGamesInteractor.interact.mockResolvedValueOnce([
          liveGameFixtureFactory.get(),
        ]);
        deleteGameSetupInteractor.interact.mockResolvedValueOnce(undefined);
        gameToGameApiV1Converter.transform.mockReturnValueOnce(
          liveGameApiV1FixtureFactory.get(),
        );
        postLiveGameV1RequestToLiveGameCreationQueryConverter.transform.mockResolvedValueOnce(
          liveGameCreationQueryOrErrors,
        );

        await postGameV1RequestHandler.handle(requestFixture, replyFixture);
      });

      afterAll(() => {
        createGamesInteractor.interact.mockClear();
        deleteGameSetupInteractor.interact.mockClear();
        gameToGameApiV1Converter.transform.mockClear();
        postLiveGameV1RequestToLiveGameCreationQueryConverter.transform.mockClear();
      });

      it('must call postLiveGameV1RequestToLiveGameCreationQueryConverter.transform', () => {
        expect(
          postLiveGameV1RequestToLiveGameCreationQueryConverter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          postLiveGameV1RequestToLiveGameCreationQueryConverter.transform,
        ).toHaveBeenCalledWith(requestFixture);
      });

      it('must call createGamesInteractor.interact()', () => {
        expect(createGamesInteractor.interact).toHaveBeenCalledTimes(1);
        expect(createGamesInteractor.interact).toHaveBeenCalledWith(
          liveGameCreationQueryFixtureFactory.get(),
        );
      });

      it('must call deleteGameSetupInteractor.interact()', () => {
        expect(deleteGameSetupInteractor.interact).toHaveBeenCalledTimes(1);
        expect(deleteGameSetupInteractor.interact).toHaveBeenCalledWith(
          gameSetupDeletionQueryFixtureFactory.get(),
        );
      });

      it('must call gameToGameApiV1Converter.transform() with the game created', () => {
        expect(gameToGameApiV1Converter.transform).toHaveBeenCalledTimes(1);
        expect(gameToGameApiV1Converter.transform).toHaveBeenCalledWith(
          liveGameFixtureFactory.get(),
        );
      });

      it('must call reply.send with the gameApiV1 generated', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith(
          liveGameApiV1FixtureFactory.get(),
        );
      });
    });

    describe('when called and the request is not valid', () => {
      let liveGameCreationQueryOrErrors: EitherEither<string[]>;

      let requestFixture: fastify.FastifyRequest & UserContainer;
      let replyFixture: fastify.FastifyReply;

      beforeAll(async () => {
        liveGameCreationQueryOrErrors = {
          isEither: true,
          value: ['Test when validation fails'],
        };

        requestFixture = ({
          body: liveGameCreationQueryApiV1FixtureFactory.get(),
          user: userFixtureFactory.get(),
        } as Partial<
          fastify.FastifyRequest & UserContainer
        >) as fastify.FastifyRequest & UserContainer;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        postLiveGameV1RequestToLiveGameCreationQueryConverter.transform.mockResolvedValueOnce(
          liveGameCreationQueryOrErrors,
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
          message: liveGameCreationQueryOrErrors.value[0],
        });
      });
    });
  });
});
