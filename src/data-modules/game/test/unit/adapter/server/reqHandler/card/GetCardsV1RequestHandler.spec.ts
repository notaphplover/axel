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
import { CardFindQuery } from '../../../../../../domain/query/card/CardFindQuery';
import { CardFindQueryApiV1 } from '../../../../../../adapter/api/query/card/CardFindQueryApiV1';
import { GetCardsV1RequestHandler } from '../../../../../../adapter/server/reqHandler/card/GetCardsV1RequestHandler';
import { artifactApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/model/fixtures';
import { artifactFindQueryApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/query/fixtures';
import { artifactFindQueryFixtureFactory } from '../../../../../fixtures/domain/query/fixtures';
import { artifactFixtureFactory } from '../../../../../fixtures/domain/model/fixtures';
import { fastifyReplyFixtureFactory } from '../../../../../../../../layer-modules/server/test/fixtures/fastify.fixture';

describe(GetCardsV1RequestHandler.name, () => {
  let cardFindQueryApiV1ToCardFindQueryConverter: Converter<
    CardFindQueryApiV1,
    CardFindQuery
  >;
  let cardFindQueryApiV1Validator: Validator<CardFindQueryApiV1>;
  let cardToCardApiV1Converter: Converter<Card, CardApiV1>;
  let findCardsInteractor: Interactor<CardFindQuery, Promise<Card[]>>;

  let getCardsV1RequestHandler: GetCardsV1RequestHandler;

  beforeAll(async () => {
    cardFindQueryApiV1ToCardFindQueryConverter = {
      transform: jest.fn(),
    };
    cardFindQueryApiV1Validator = {
      validate: jest.fn(),
    };
    cardToCardApiV1Converter = {
      transform: jest.fn(),
    };
    findCardsInteractor = {
      interact: jest.fn(),
    };

    getCardsV1RequestHandler = new GetCardsV1RequestHandler(
      cardFindQueryApiV1ToCardFindQueryConverter,
      cardFindQueryApiV1Validator,
      cardToCardApiV1Converter,
      findCardsInteractor,
    );
  });

  describe('.handle()', () => {
    describe('when called with a valid request', () => {
      let requestFixture: FastifyRequest;
      let replyFixture: FastifyReply;

      let validationResultFixture: ValidationSuccess<CardFindQueryApiV1>;

      beforeAll(async () => {
        requestFixture = ({
          params: artifactFindQueryApiV1FixtureFactory.get(),
        } as Partial<FastifyRequest>) as FastifyRequest;

        replyFixture = fastifyReplyFixtureFactory.get();

        validationResultFixture = {
          model: artifactFindQueryApiV1FixtureFactory.get(),
          result: true,
        };

        (cardFindQueryApiV1ToCardFindQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          artifactFindQueryFixtureFactory.get(),
        );
        (cardFindQueryApiV1Validator.validate as jest.Mock).mockReturnValueOnce(
          validationResultFixture,
        );
        (cardToCardApiV1Converter.transform as jest.Mock).mockReturnValueOnce(
          artifactApiV1FixtureFactory.get(),
        );
        (findCardsInteractor.interact as jest.Mock).mockResolvedValueOnce([
          artifactFixtureFactory.get(),
        ]);

        await getCardsV1RequestHandler.handle(requestFixture, replyFixture);
      });

      it('must call cardFindQueryApiV1Validator.validate with the request params', () => {
        expect(cardFindQueryApiV1Validator.validate).toHaveBeenCalledTimes(1);
        expect(cardFindQueryApiV1Validator.validate).toHaveBeenCalledWith(
          artifactFindQueryApiV1FixtureFactory.get(),
        );
      });

      it('must call cardFindQueryApiV1ToCardFindQueryConverter.transform with the validation result model', () => {
        expect(
          cardFindQueryApiV1ToCardFindQueryConverter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          cardFindQueryApiV1ToCardFindQueryConverter.transform,
        ).toHaveBeenCalledWith(validationResultFixture.model);
      });

      it('must call findCardsInteractor.interact with the card find query generated', () => {
        expect(findCardsInteractor.interact).toHaveBeenCalledTimes(1);
        expect(findCardsInteractor.interact).toHaveBeenCalledWith(
          artifactFindQueryFixtureFactory.get(),
        );
      });

      it('must call cardToCardApiV1Converter.transform with the card found', () => {
        expect(cardToCardApiV1Converter.transform).toHaveBeenCalledTimes(1);
        expect(cardToCardApiV1Converter.transform).toHaveBeenCalledWith(
          artifactFixtureFactory.get(),
        );
      });

      it('must call reply.send with the cards api found', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith([
          artifactApiV1FixtureFactory.get(),
        ]);
      });
    });
  });
});
