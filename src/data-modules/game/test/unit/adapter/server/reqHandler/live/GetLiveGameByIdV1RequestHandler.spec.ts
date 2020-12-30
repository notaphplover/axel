/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Converter, Interactor } from '../../../../../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GameFindQuery } from '../../../../../../domain/query/GameFindQuery';
import { GetLiveGameByIdV1RequestHandler } from '../../../../../../adapter/server/reqHandler/live/GetLiveGameByIdV1RequestHandler';
import { LiveGame } from '../../../../../../domain/model/live/LiveGame';
import { LiveGameApiV1 } from '../../../../../../adapter/api/model/live/LiveGameApiV1';
import { StatusCodes } from 'http-status-codes';
import { commonTest } from '../../../../../../../../common/test';
import { gameApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/model';
import { gameFixtureFactory } from '../../../../../fixtures/domain/model';

describe(GetLiveGameByIdV1RequestHandler.name, () => {
  let findGameInteractor: Interactor<GameFindQuery, Promise<LiveGame | null>>;
  let gameToGameApiV1Port: Converter<LiveGame, LiveGameApiV1>;
  let getGameByIdV1RequestHandler: GetLiveGameByIdV1RequestHandler;

  beforeAll(() => {
    findGameInteractor = {
      interact: jest.fn(),
    };
    gameToGameApiV1Port = {
      transform: jest.fn(),
    };
    getGameByIdV1RequestHandler = new GetLiveGameByIdV1RequestHandler(
      findGameInteractor,
      gameToGameApiV1Port,
    );
  });

  describe('.handle()', () => {
    describe('when called and a game is found', () => {
      let requestFixture: FastifyRequest;
      let replyFixture: FastifyReply;

      beforeAll(async () => {
        requestFixture = ({
          params: { gameId: 'test-game-id' },
        } as Partial<FastifyRequest>) as FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        (findGameInteractor.interact as jest.Mock).mockResolvedValueOnce(
          gameFixtureFactory.get(),
        );

        (gameToGameApiV1Port.transform as jest.Mock).mockReturnValueOnce(
          gameApiV1FixtureFactory.get(),
        );

        await getGameByIdV1RequestHandler.handle(requestFixture, replyFixture);
      });

      it('must call findGameInteractor.interact()', () => {
        expect(findGameInteractor.interact).toHaveBeenCalledTimes(1);
        expect(findGameInteractor.interact).toHaveBeenCalledWith({
          id: (requestFixture.params as { gameId: string }).gameId,
        });
      });

      it('must call gameToGameApiV1Port.transform()', () => {
        expect(gameToGameApiV1Port.transform).toHaveBeenCalledTimes(1);
        expect(gameToGameApiV1Port.transform).toHaveBeenCalledWith(
          gameFixtureFactory.get(),
        );
      });

      it('must call reply.send()', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith(
          gameApiV1FixtureFactory.get(),
        );
      });
    });

    describe('when called and no game is found', () => {
      let requestFixture: FastifyRequest;
      let replyFixture: FastifyReply;

      beforeAll(async () => {
        requestFixture = ({
          params: { gameId: 'test-game-id' },
        } as Partial<FastifyRequest>) as FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        (findGameInteractor.interact as jest.Mock).mockResolvedValueOnce(null);

        await getGameByIdV1RequestHandler.handle(requestFixture, replyFixture);
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
