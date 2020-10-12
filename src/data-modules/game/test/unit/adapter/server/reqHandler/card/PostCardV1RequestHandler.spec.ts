/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import {
  Converter,
  Interactor,
  ValidationSuccess,
  Validator,
} from '../../../../../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Card } from '../../../../../../domain/model/card/Card';
import { CardApiV1 } from '../../../../../../adapter/api/model/card/CardApiV1';
import { CardCreationQuery } from '../../../../../../domain/query/card/CardCreationQuery';
import { CardCreationQueryApiV1 } from '../../../../../../adapter/api/query/card/CardCreationQueryApiV1';
import { PostCardV1RequestHandler } from '../../../../../../adapter/server/reqHandler/card/PostCardV1RequestHandler';
import { artifactApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/model/fixtures';
import { artifactCreationQueryApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/query/fixtures';
import { artifactCreationQueryFixtureFactory } from '../../../../../fixtures/domain/query/fixtures';
import { artifactFixtureFactory } from '../../../../../fixtures/domain/model/fixtures';
import { fastifyReplyFixtureFactory } from '../../../../../../../../layer-modules/server/test/fixtures/fastify.fixture';

describe(PostCardV1RequestHandler.name, () => {
  let cardCreationQueryApiV1ToCardCreationQueryConverter: Converter<
    CardCreationQueryApiV1,
    CardCreationQuery
  >;
  let cardCreationQueryApiV1Validator: Validator<CardCreationQueryApiV1>;
  let cardToCardApiV1Converter: Converter<Card, CardApiV1>;
  let createCardsInteractor: Interactor<CardCreationQuery, Promise<Card[]>>;

  let postCardV1RequestHandler: PostCardV1RequestHandler;

  beforeAll(() => {
    cardCreationQueryApiV1ToCardCreationQueryConverter = {
      transform: jest.fn(),
    };
    cardCreationQueryApiV1Validator = {
      validate: jest.fn(),
    };
    cardToCardApiV1Converter = {
      transform: jest.fn(),
    };
    createCardsInteractor = {
      interact: jest.fn(),
    };

    postCardV1RequestHandler = new PostCardV1RequestHandler(
      cardCreationQueryApiV1ToCardCreationQueryConverter,
      cardCreationQueryApiV1Validator,
      cardToCardApiV1Converter,
      createCardsInteractor,
    );
  });

  describe('.handle()', () => {
    describe('when called with a valid request', () => {
      let expectedValidationResult: ValidationSuccess<CardCreationQueryApiV1>;
      let requestFixture: FastifyRequest;
      let replyFixture: FastifyReply;

      beforeAll(async () => {
        requestFixture = ({
          body: artifactCreationQueryApiV1FixtureFactory.get(),
        } as Partial<FastifyRequest>) as FastifyRequest;

        replyFixture = fastifyReplyFixtureFactory.get();

        (cardCreationQueryApiV1ToCardCreationQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          artifactCreationQueryFixtureFactory.get(),
        );

        expectedValidationResult = {
          model: artifactCreationQueryApiV1FixtureFactory.get(),
          result: true,
        };

        (cardCreationQueryApiV1Validator.validate as jest.Mock).mockReturnValueOnce(
          expectedValidationResult,
        );

        (cardToCardApiV1Converter.transform as jest.Mock).mockReturnValueOnce(
          artifactApiV1FixtureFactory.get(),
        );

        (createCardsInteractor.interact as jest.Mock).mockResolvedValueOnce([
          artifactFixtureFactory.get(),
        ]);

        await postCardV1RequestHandler.handle(requestFixture, replyFixture);
      });

      it('must call cardCreationQueryApiV1Validator with the request body', () => {
        expect(cardCreationQueryApiV1Validator.validate).toHaveBeenCalledTimes(
          1,
        );
        expect(cardCreationQueryApiV1Validator.validate).toHaveBeenCalledWith(
          requestFixture.body,
        );
      });
      it('must call cardCreationQueryApiV1ToCardCreationQueryConverter with the api query obtained', () => {
        expect(
          cardCreationQueryApiV1ToCardCreationQueryConverter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          cardCreationQueryApiV1ToCardCreationQueryConverter.transform,
        ).toHaveBeenCalledWith(expectedValidationResult.model);
      });
      it('must call createCardsInteractor with the query obtained', () => {
        expect(createCardsInteractor.interact).toHaveBeenCalledTimes(1);
        expect(createCardsInteractor.interact).toHaveBeenCalledWith(
          artifactCreationQueryFixtureFactory.get(),
        );
      });
      it('must call cardToCardApiV1Converter with the cards obtained', () => {
        expect(cardToCardApiV1Converter.transform).toHaveBeenCalledTimes(1);
        expect(cardToCardApiV1Converter.transform).toHaveBeenCalledWith(
          artifactFixtureFactory.get(),
        );
      });
      it('must call reply.send with the api cards obtained', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith(
          artifactApiV1FixtureFactory.get(),
        );
      });
    });
  });
});
