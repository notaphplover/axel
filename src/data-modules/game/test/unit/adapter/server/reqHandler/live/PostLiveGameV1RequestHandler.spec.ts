import 'reflect-metadata';
import * as fastify from 'fastify';

import {
  Converter,
  Interactor,
  ValueOrErrors,
} from '../../../../../../../../common/domain';
import { commonTest } from '../../../../../../../../common/test';
import { UserContainer } from '../../../../../../../user/domain';
import { userFixtureFactory } from '../../../../../../../user/test/fixtures/domain/model/fixtures';
import { LiveGameApiV1 } from '../../../../../../adapter/api/model/live/LiveGameApiV1';
import { PostLiveGameV1RequestHandler } from '../../../../../../adapter/server/reqHandler/live/PostLiveGameV1RequestHandler';
import { LiveGameConnections } from '../../../../../../domain/model/live/connection/LiveGameConnections';
import { LiveGame } from '../../../../../../domain/model/live/LiveGame';
import { LiveGameConnectionsCreationQuery } from '../../../../../../domain/query/live/connection/LiveGameConnectionsCreationQuery';
import { LiveGameCreationQuery } from '../../../../../../domain/query/live/LiveGameCreationQuery';
import { GameSetupDeletionQuery } from '../../../../../../domain/query/setup/GameSetupDeletionQuery';
import { liveGameApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/model/live';
import { liveGameCreationQueryApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/query/card';
import { liveGameFixtureFactory } from '../../../../../fixtures/domain/model/live';
import {
  liveGameConnectionsCreationQueryFixtureFactory,
  liveGameCreationQueryFixtureFactory,
} from '../../../../../fixtures/domain/query/live';
import { gameSetupDeletionQueryFixtureFactory } from '../../../../../fixtures/domain/query/setup';

describe(PostLiveGameV1RequestHandler.name, () => {
  let createLiveGamesConnectionsInteractor: Interactor<
    LiveGameConnectionsCreationQuery,
    Promise<LiveGameConnections[]>
  >;
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
    createLiveGamesConnectionsInteractor = {
      interact: jest.fn(),
    };
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
      createLiveGamesConnectionsInteractor,
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

        requestFixture = {
          body: liveGameCreationQueryApiV1FixtureFactory.get(),
          user: userFixtureFactory.get(),
        } as Partial<
          fastify.FastifyRequest & UserContainer
        > as fastify.FastifyRequest & UserContainer;
        replyFixture =
          commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

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

      it('must call createLiveGamesConnectionsInteractor.interact()', () => {
        expect(
          createLiveGamesConnectionsInteractor.interact,
        ).toHaveBeenCalledTimes(1);
        expect(
          createLiveGamesConnectionsInteractor.interact,
        ).toHaveBeenCalledWith(
          liveGameConnectionsCreationQueryFixtureFactory.get(),
        );
      });

      it('must call deleteGameSetupInteractor.interact()', () => {
        expect(deleteGameSetupInteractor.interact).toHaveBeenCalledTimes(1);
        expect(deleteGameSetupInteractor.interact).toHaveBeenCalledWith(
          gameSetupDeletionQueryFixtureFactory.get(),
        );
      });
    });
  });
});
