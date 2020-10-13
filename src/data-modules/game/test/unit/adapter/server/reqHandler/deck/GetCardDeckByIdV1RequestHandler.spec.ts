/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Converter, Interactor } from '../../../../../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CardDeck } from '../../../../../../domain/model/deck/CardDeck';
import { CardDeckApiV1 } from '../../../../../../adapter/api/model/deck/CardDeckApiV1';
import { CardDeckFindQuery } from '../../../../../../domain/query/deck/CardDeckFindQuery';
import { GetCardDeckByIdV1RequestHandler } from '../../../../../../adapter/server/reqHandler/deck/GetCardDeckByIdV1RequestHandler';
import { StatusCodes } from 'http-status-codes';
import { cardDeckApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/model/fixtures';
import { cardDeckFixtureFactory } from '../../../../../fixtures/domain/model/fixtures';
import { commonTest } from '../../../../../../../../common/test';

describe(GetCardDeckByIdV1RequestHandler.name, () => {
  let findCardDeckInteractor: Interactor<CardDeckFindQuery, Promise<CardDeck | null>>;
  let cardDeckToCardDeckApiV1Port: Converter<CardDeck, CardDeckApiV1>;
  let getCardDeckByIdV1RequestHandler: GetCardDeckByIdV1RequestHandler;

  beforeAll(() => {
    findCardDeckInteractor = {
      interact: jest.fn(),
    };
    cardDeckToCardDeckApiV1Port = {
      transform: jest.fn(),
    };
    getCardDeckByIdV1RequestHandler = new GetCardDeckByIdV1RequestHandler(
      cardDeckToCardDeckApiV1Port,
      findCardDeckInteractor,
    );
  });

  describe('.handle()', () => {
    describe('when called and a cardDeck is found', () => {
      let requestFixture: FastifyRequest;
      let replyFixture: FastifyReply;

      beforeAll(async () => {
        requestFixture = ({
          params: { cardDeckId: 'test-cardDeck-id' },
        } as Partial<FastifyRequest>) as FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        (findCardDeckInteractor.interact as jest.Mock).mockResolvedValueOnce(
          cardDeckFixtureFactory.get(),
        );

        (cardDeckToCardDeckApiV1Port.transform as jest.Mock).mockReturnValueOnce(
          cardDeckApiV1FixtureFactory.get(),
        );

        await getCardDeckByIdV1RequestHandler.handle(requestFixture, replyFixture);
      });

      it('must call findCardDeckInteractor.interact()', () => {
        expect(findCardDeckInteractor.interact).toHaveBeenCalledTimes(1);
        expect(findCardDeckInteractor.interact).toHaveBeenCalledWith({
          id: (requestFixture.params as { cardDeckId: string }).cardDeckId,
        });
      });

      it('must call cardDeckToCardDeckApiV1Port.transform()', () => {
        expect(cardDeckToCardDeckApiV1Port.transform).toHaveBeenCalledTimes(1);
        expect(cardDeckToCardDeckApiV1Port.transform).toHaveBeenCalledWith(
          cardDeckFixtureFactory.get(),
        );
      });

      it('must call reply.send()', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith(
          cardDeckApiV1FixtureFactory.get(),
        );
      });
    });

    describe('when called and no cardDeck is found', () => {
      let requestFixture: FastifyRequest;
      let replyFixture: FastifyReply;

      beforeAll(async () => {
        requestFixture = ({
          params: { cardDeckId: 'test-cardDeck-id' },
        } as Partial<FastifyRequest>) as FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        (findCardDeckInteractor.interact as jest.Mock).mockResolvedValueOnce(null);

        await getCardDeckByIdV1RequestHandler.handle(requestFixture, replyFixture);
      });

      it('must call reply.code with not found code', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
      });
      it('must call reply.send with a text mesage', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith(
          expect.stringContaining('not found'),
        );
      });
    });
  });
});
