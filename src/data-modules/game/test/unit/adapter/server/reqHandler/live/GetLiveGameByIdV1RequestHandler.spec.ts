import 'reflect-metadata';
import * as fastify from 'fastify';
import { StatusCodes } from 'http-status-codes';

import {
  Converter,
  Interactor,
  ValueEither,
  ValueOrErrors,
} from '../../../../../../../../common/domain';
import { commonTest } from '../../../../../../../../common/test';
import { LiveGameApiV1 } from '../../../../../../adapter/api/model/live/LiveGameApiV1';
import { GetLiveGameByIdV1RequestHandler } from '../../../../../../adapter/server/reqHandler/live/GetLiveGameByIdV1RequestHandler';
import { LiveGame } from '../../../../../../domain/model/live/LiveGame';
import { LiveGameFindQuery } from '../../../../../../domain/query/live/LiveGameFindQuery';
import { liveGameApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/model/live';
import { liveGameFixtureFactory } from '../../../../../fixtures/domain/model/live';
import { liveGameFindQueryFixtureFactory } from '../../../../../fixtures/domain/query/live';

describe(GetLiveGameByIdV1RequestHandler.name, () => {
  let findGameInteractor: jest.Mocked<
    Interactor<LiveGameFindQuery, Promise<LiveGame | null>>
  >;
  let gameToGameApiV1Port: jest.Mocked<Converter<LiveGame, LiveGameApiV1>>;
  let getLiveGameV1RequestToLiveGameFindQueryConverter: jest.Mocked<
    Converter<fastify.FastifyRequest, Promise<ValueOrErrors<LiveGameFindQuery>>>
  >;

  let getGameByIdV1RequestHandler: GetLiveGameByIdV1RequestHandler;

  beforeAll(() => {
    findGameInteractor = {
      interact: jest.fn(),
    };
    gameToGameApiV1Port = {
      transform: jest.fn(),
    };
    getLiveGameV1RequestToLiveGameFindQueryConverter = {
      transform: jest.fn(),
    };

    getGameByIdV1RequestHandler = new GetLiveGameByIdV1RequestHandler(
      findGameInteractor,
      gameToGameApiV1Port,
      getLiveGameV1RequestToLiveGameFindQueryConverter,
    );
  });

  describe('.handle()', () => {
    describe('when called and a game is found', () => {
      let requestFixture: fastify.FastifyRequest;
      let replyFixture: fastify.FastifyReply;

      let liveGameFindQueryOrErrorsFixture: ValueEither<LiveGameFindQuery>;

      beforeAll(async () => {
        requestFixture = ({
          params: { gameId: 'test-game-id' },
        } as Partial<fastify.FastifyRequest>) as fastify.FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        liveGameFindQueryOrErrorsFixture = {
          isEither: false,
          value: liveGameFindQueryFixtureFactory.get(),
        };

        findGameInteractor.interact.mockResolvedValueOnce(
          liveGameFixtureFactory.get(),
        );

        gameToGameApiV1Port.transform.mockReturnValueOnce(
          liveGameApiV1FixtureFactory.get(),
        );

        getLiveGameV1RequestToLiveGameFindQueryConverter.transform.mockResolvedValueOnce(
          liveGameFindQueryOrErrorsFixture,
        );

        await getGameByIdV1RequestHandler.handle(requestFixture, replyFixture);
      });

      afterAll(() => {
        findGameInteractor.interact.mockClear();
        gameToGameApiV1Port.transform.mockClear();
        getLiveGameV1RequestToLiveGameFindQueryConverter.transform.mockClear();
      });

      it('must call getLiveGameV1RequestToLiveGameFindQueryConverter.transform()', () => {
        expect(
          getLiveGameV1RequestToLiveGameFindQueryConverter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          getLiveGameV1RequestToLiveGameFindQueryConverter.transform,
        ).toHaveBeenCalledWith(requestFixture);
      });

      it('must call findGameInteractor.interact()', () => {
        expect(findGameInteractor.interact).toHaveBeenCalledTimes(1);
        expect(findGameInteractor.interact).toHaveBeenCalledWith(
          liveGameFindQueryOrErrorsFixture.value,
        );
      });

      it('must call gameToGameApiV1Port.transform()', () => {
        expect(gameToGameApiV1Port.transform).toHaveBeenCalledTimes(1);
        expect(gameToGameApiV1Port.transform).toHaveBeenCalledWith(
          liveGameFixtureFactory.get(),
        );
      });

      it('must call reply.send()', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith(
          liveGameApiV1FixtureFactory.get(),
        );
      });
    });

    describe('when called and no game is found', () => {
      let requestFixture: fastify.FastifyRequest;
      let replyFixture: fastify.FastifyReply;

      let liveGameFindQueryOrErrorsFixture: ValueEither<LiveGameFindQuery>;

      beforeAll(async () => {
        requestFixture = ({
          params: { gameId: 'test-game-id' },
        } as Partial<fastify.FastifyRequest>) as fastify.FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        liveGameFindQueryOrErrorsFixture = {
          isEither: false,
          value: liveGameFindQueryFixtureFactory.get(),
        };

        (findGameInteractor.interact as jest.Mock).mockResolvedValueOnce(null);

        getLiveGameV1RequestToLiveGameFindQueryConverter.transform.mockResolvedValueOnce(
          liveGameFindQueryOrErrorsFixture,
        );

        await getGameByIdV1RequestHandler.handle(requestFixture, replyFixture);
      });

      afterAll(() => {
        findGameInteractor.interact.mockClear();
        gameToGameApiV1Port.transform.mockClear();
        getLiveGameV1RequestToLiveGameFindQueryConverter.transform.mockClear();
      });

      it('must call reply.code with not found code', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
      });
      it('must call reply.send with a text message', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith({
          message: expect.stringContaining('not found') as string,
        });
      });
    });
  });
});
