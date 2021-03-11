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
import { CardDeckApiV1 } from '../../../../../../adapter/api/model/deck/CardDeckApiV1';
import { GetCardDeckByIdV1RequestHandler } from '../../../../../../adapter/server/reqHandler/deck/GetCardDeckByIdV1RequestHandler';
import { CardDeck } from '../../../../../../domain/model/deck/CardDeck';
import { CardDeckFindQuery } from '../../../../../../domain/query/deck/CardDeckFindQuery';
import { cardDeckApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/model/deck';
import { cardDeckFixtureFactory } from '../../../../../fixtures/domain/model/deck';
import { cardDeckFindQueryFixtureFactory } from '../../../../../fixtures/domain/query/deck';

describe(GetCardDeckByIdV1RequestHandler.name, () => {
  let findCardDeckInteractor: jest.Mocked<
    Interactor<CardDeckFindQuery, Promise<CardDeck | null>>
  >;
  let cardDeckToCardDeckApiV1Port: jest.Mocked<
    Converter<CardDeck, CardDeckApiV1>
  >;
  let getCardDeckV1RequestToCardDeckFindQueryConverter: jest.Mocked<
    Converter<fastify.FastifyRequest, Promise<ValueOrErrors<CardDeckFindQuery>>>
  >;

  let getCardDeckByIdV1RequestHandler: GetCardDeckByIdV1RequestHandler;

  beforeAll(() => {
    findCardDeckInteractor = {
      interact: jest.fn(),
    };
    cardDeckToCardDeckApiV1Port = {
      transform: jest.fn(),
    };
    getCardDeckV1RequestToCardDeckFindQueryConverter = {
      transform: jest.fn(),
    };

    getCardDeckByIdV1RequestHandler = new GetCardDeckByIdV1RequestHandler(
      cardDeckToCardDeckApiV1Port,
      findCardDeckInteractor,
      getCardDeckV1RequestToCardDeckFindQueryConverter,
    );
  });

  describe('.handle()', () => {
    describe('when called and a cardDeck is found', () => {
      let requestFixture: fastify.FastifyRequest;
      let replyFixture: fastify.FastifyReply;

      let cardDeckFindQueryValueEither: ValueEither<CardDeckFindQuery>;

      beforeAll(async () => {
        const cardDeckId: string = 'test-cardDeck-id';

        requestFixture = ({
          params: { cardDeckId: cardDeckId },
        } as Partial<fastify.FastifyRequest>) as fastify.FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        cardDeckFindQueryValueEither = {
          isEither: false,
          value: cardDeckFindQueryFixtureFactory.get(),
        };

        getCardDeckV1RequestToCardDeckFindQueryConverter.transform.mockResolvedValueOnce(
          cardDeckFindQueryValueEither,
        );

        findCardDeckInteractor.interact.mockResolvedValueOnce(
          cardDeckFixtureFactory.get(),
        );

        cardDeckToCardDeckApiV1Port.transform.mockReturnValueOnce(
          cardDeckApiV1FixtureFactory.get(),
        );

        await getCardDeckByIdV1RequestHandler.handle(
          requestFixture,
          replyFixture,
        );
      });

      it('must call getCardDeckV1RequestToCardDeckFindQueryConverter.transform()', () => {
        expect(
          getCardDeckV1RequestToCardDeckFindQueryConverter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          getCardDeckV1RequestToCardDeckFindQueryConverter.transform,
        ).toHaveBeenCalledWith(requestFixture);
      });

      it('must call findCardDeckInteractor.interact()', () => {
        expect(findCardDeckInteractor.interact).toHaveBeenCalledTimes(1);
        expect(findCardDeckInteractor.interact).toHaveBeenCalledWith(
          cardDeckFindQueryFixtureFactory.get(),
        );
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
      let requestFixture: fastify.FastifyRequest;
      let replyFixture: fastify.FastifyReply;

      let cardDeckFindQueryValueEither: ValueEither<CardDeckFindQuery>;

      beforeAll(async () => {
        requestFixture = ({
          params: { cardDeckId: 'test-cardDeck-id' },
        } as Partial<fastify.FastifyRequest>) as fastify.FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        cardDeckFindQueryValueEither = {
          isEither: false,
          value: cardDeckFindQueryFixtureFactory.get(),
        };

        getCardDeckV1RequestToCardDeckFindQueryConverter.transform.mockResolvedValueOnce(
          cardDeckFindQueryValueEither,
        );

        findCardDeckInteractor.interact.mockResolvedValueOnce(null);

        await getCardDeckByIdV1RequestHandler.handle(
          requestFixture,
          replyFixture,
        );
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
