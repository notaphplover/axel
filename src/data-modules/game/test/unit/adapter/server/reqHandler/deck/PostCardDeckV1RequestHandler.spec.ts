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
import { CardDeck } from '../../../../../../domain/model/deck/CardDeck';
import { CardDeckApiV1 } from '../../../../../../adapter/api/model/deck/CardDeckApiV1';
import { CardDeckCreationQuery } from '../../../../../../domain/query/deck/CardDeckCreationQuery';
import { CardDeckCreationQueryApiV1 } from '../../../../../../adapter/api/query/deck/CardDeckCreationQueryApiV1';
import { PostCardDeckV1RequestHandler } from '../../../../../../adapter/server/reqHandler/deck/PostCardDeckV1RequestHandler';
import { StatusCodes } from 'http-status-codes';
import { cardDeckApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/model/deck';
import { cardDeckCreationQueryApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/query/deck';
import { cardDeckCreationQueryFixtureFactory } from '../../../../../fixtures/domain/query/deck';
import { cardDeckFixtureFactory } from '../../../../../fixtures/domain/model/deck';
import { commonTest } from '../../../../../../../../common/test';

describe(PostCardDeckV1RequestHandler.name, () => {
  let cardDeckCreationQueryApiV1ToCardDeckCreationQueryConverter: Converter<
    CardDeckCreationQueryApiV1,
    CardDeckCreationQuery
  >;
  let createCardDecksInteractor: Interactor<
    CardDeckCreationQuery,
    Promise<CardDeck[]>
  >;
  let cardDeckCreationQueryApiV1Validator: Validator<CardDeckCreationQueryApiV1>;
  let cardDeckToCardDeckApiV1Converter: Converter<CardDeck, CardDeckApiV1>;

  let postCardDeckV1RequestHandler: PostCardDeckV1RequestHandler;

  beforeAll(() => {
    cardDeckCreationQueryApiV1ToCardDeckCreationQueryConverter = {
      transform: jest.fn(),
    };
    cardDeckCreationQueryApiV1Validator = { validate: jest.fn() };
    cardDeckToCardDeckApiV1Converter = { transform: jest.fn() };
    createCardDecksInteractor = {
      interact: jest.fn(),
    };

    postCardDeckV1RequestHandler = new PostCardDeckV1RequestHandler(
      cardDeckCreationQueryApiV1ToCardDeckCreationQueryConverter,
      cardDeckCreationQueryApiV1Validator,
      cardDeckToCardDeckApiV1Converter,
      createCardDecksInteractor,
    );
  });

  describe('.handle()', () => {
    describe('when called and the request is valid', () => {
      let requestFixture: FastifyRequest;
      let replyFixture: FastifyReply;

      beforeAll(async () => {
        requestFixture = ({
          body: cardDeckCreationQueryApiV1FixtureFactory.get(),
        } as Partial<FastifyRequest>) as FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        (cardDeckCreationQueryApiV1ToCardDeckCreationQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          cardDeckCreationQueryFixtureFactory.get(),
        );
        const cardDeckCreationQueryApiV1ValidatorValidationResult: ValidationResult<CardDeckCreationQueryApiV1> = {
          model: cardDeckCreationQueryApiV1FixtureFactory.get(),
          result: true,
        };
        (cardDeckCreationQueryApiV1Validator.validate as jest.Mock).mockReturnValueOnce(
          cardDeckCreationQueryApiV1ValidatorValidationResult,
        );
        (cardDeckToCardDeckApiV1Converter.transform as jest.Mock).mockReturnValueOnce(
          cardDeckApiV1FixtureFactory.get(),
        );

        (createCardDecksInteractor.interact as jest.Mock).mockResolvedValueOnce(
          [cardDeckFixtureFactory.get()],
        );

        await postCardDeckV1RequestHandler.handle(requestFixture, replyFixture);
      });

      it('must call cardDeckCreationQueryApiV1Validator.validate() with the request body', () => {
        expect(
          cardDeckCreationQueryApiV1Validator.validate,
        ).toHaveBeenCalledTimes(1);
        expect(
          cardDeckCreationQueryApiV1Validator.validate,
        ).toHaveBeenCalledWith(requestFixture.body);
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
      let requestFixture: FastifyRequest;
      let replyFixture: FastifyReply;

      let cardDeckCreationQueryApiV1ValidatorValidationResult: ValidationFail;

      beforeAll(async () => {
        requestFixture = ({
          body: cardDeckCreationQueryApiV1FixtureFactory.get(),
        } as Partial<FastifyRequest>) as FastifyRequest;
        replyFixture = commonTest.fixtures.adapter.server.fastifyReplyFixtureFactory.get();

        cardDeckCreationQueryApiV1ValidatorValidationResult = {
          result: false,
          errorMessage: 'test error message',
        };
        (cardDeckCreationQueryApiV1Validator.validate as jest.Mock).mockReturnValueOnce(
          cardDeckCreationQueryApiV1ValidatorValidationResult,
        );

        await postCardDeckV1RequestHandler.handle(requestFixture, replyFixture);
      });

      it('must call reply.code() with bad status HTTP code', () => {
        expect(replyFixture.code).toHaveBeenCalledTimes(1);
        expect(replyFixture.code).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      });

      it('must call reply.send() with the validation errror message', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith(
          cardDeckCreationQueryApiV1ValidatorValidationResult.errorMessage,
        );
      });
    });
  });
});
