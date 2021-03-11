import 'reflect-metadata';
import * as fastify from 'fastify';
import { StatusCodes } from 'http-status-codes';

import {
  Converter,
  EitherEither,
  Interactor,
  ValueEither,
  ValueOrErrors,
} from '../../../../../../../../common/domain';
import { commonTest } from '../../../../../../../../common/test';
import { CardDeckApiV1 } from '../../../../../../adapter/api/model/deck/CardDeckApiV1';
import { PostCardDeckV1RequestHandler } from '../../../../../../adapter/server/reqHandler/deck/PostCardDeckV1RequestHandler';
import { CardDeck } from '../../../../../../domain/model/deck/CardDeck';
import { CardDeckCreationQuery } from '../../../../../../domain/query/deck/CardDeckCreationQuery';
import { cardDeckApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/model/deck';
import { cardDeckCreationQueryApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/query/deck';
import { cardDeckFixtureFactory } from '../../../../../fixtures/domain/model/deck';
import { cardDeckCreationQueryFixtureFactory } from '../../../../../fixtures/domain/query/deck';

describe(PostCardDeckV1RequestHandler.name, () => {
  let createCardDecksInteractor: jest.Mocked<
    Interactor<CardDeckCreationQuery, Promise<CardDeck[]>>
  >;
  let cardDeckToCardDeckApiV1Converter: jest.Mocked<
    Converter<CardDeck, CardDeckApiV1>
  >;
  let postCardDeckV1RequestToCardDeckCreationQueryConverter: jest.Mocked<
    Converter<
      fastify.FastifyRequest,
      Promise<ValueOrErrors<CardDeckCreationQuery>>
    >
  >;

  let postCardDeckV1RequestHandler: PostCardDeckV1RequestHandler;

  beforeAll(() => {
    cardDeckToCardDeckApiV1Converter = { transform: jest.fn() };
    createCardDecksInteractor = {
      interact: jest.fn(),
    };
    postCardDeckV1RequestToCardDeckCreationQueryConverter = {
      transform: jest.fn(),
    };

    postCardDeckV1RequestHandler = new PostCardDeckV1RequestHandler(
      cardDeckToCardDeckApiV1Converter,
      createCardDecksInteractor,
      postCardDeckV1RequestToCardDeckCreationQueryConverter,
    );
  });

  describe('.handle()', () => {
    describe('when called and the request is valid', () => {
      let requestFixture: fastify.FastifyRequest;
      let replyFixture: fastify.FastifyReply;

      beforeAll(async () => {
        requestFixture = ({
          body: cardDeckCreationQueryApiV1FixtureFactory.get(),
        } as Partial<fastify.FastifyRequest>) as fastify.FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        cardDeckToCardDeckApiV1Converter.transform.mockReturnValueOnce(
          cardDeckApiV1FixtureFactory.get(),
        );

        createCardDecksInteractor.interact.mockResolvedValueOnce([
          cardDeckFixtureFactory.get(),
        ]);

        const cardDeckCreationQueryOrErrors: ValueEither<CardDeckCreationQuery> = {
          isEither: false,
          value: cardDeckCreationQueryFixtureFactory.get(),
        };

        postCardDeckV1RequestToCardDeckCreationQueryConverter.transform.mockResolvedValueOnce(
          cardDeckCreationQueryOrErrors,
        );

        await postCardDeckV1RequestHandler.handle(requestFixture, replyFixture);
      });

      it('must call createCardDecksInteractor.interact()', () => {
        expect(createCardDecksInteractor.interact).toHaveBeenCalledTimes(1);
        expect(createCardDecksInteractor.interact).toHaveBeenCalledWith(
          cardDeckCreationQueryFixtureFactory.get(),
        );
      });

      it('must call cardDeckToCardDeckApiV1Converter.transform() with the cardDeck created', () => {
        expect(
          cardDeckToCardDeckApiV1Converter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(cardDeckToCardDeckApiV1Converter.transform).toHaveBeenCalledWith(
          cardDeckFixtureFactory.get(),
        );
      });

      it('must call reply.send with the cardDeckApiV1 generated', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith(
          cardDeckApiV1FixtureFactory.get(),
        );
      });
    });

    describe('when called and the request is not valid', () => {
      let requestFixture: fastify.FastifyRequest;
      let replyFixture: fastify.FastifyReply;

      let cardDeckCreationQueryOrErrors: EitherEither<string[]>;

      beforeAll(async () => {
        requestFixture = ({
          body: cardDeckCreationQueryApiV1FixtureFactory.get(),
        } as Partial<fastify.FastifyRequest>) as fastify.FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        cardDeckCreationQueryOrErrors = {
          isEither: true,
          value: ['Test when the request is not valid'],
        };

        postCardDeckV1RequestToCardDeckCreationQueryConverter.transform.mockResolvedValueOnce(
          cardDeckCreationQueryOrErrors,
        );

        await postCardDeckV1RequestHandler.handle(requestFixture, replyFixture);
      });

      it('must call reply.code() with bad status HTTP code', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      });

      it('must call reply.send() with the validation errror message', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith({
          message: cardDeckCreationQueryOrErrors.value[0],
        });
      });
    });
  });
});
