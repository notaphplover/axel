import 'reflect-metadata';
import * as fastify from 'fastify';

import { Converter, Interactor } from '../../../../../../../../common/domain';
import { ValueOrErrors } from '../../../../../../../../common/domain/either/ValueOrErrors';
import { fastifyReplyFixtureFactory } from '../../../../../../../../integration-modules/fastify/test/fixtures/fastify.fixture';
import { CardApiV1 } from '../../../../../../adapter/api/model/card/CardApiV1';
import { PostCardsSearchesV1RequestHandler } from '../../../../../../adapter/server/reqHandler/card/PostCardsSearchesV1RequestHandler';
import { Card } from '../../../../../../domain/model/card/Card';
import { CardFindQuery } from '../../../../../../domain/query/card/CardFindQuery';
import { creatureApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/model/card';
import { creatureFindQueryApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/query/card';
import { creatureFixtureFactory } from '../../../../../fixtures/domain/model/card';
import { creatureFindQueryFixtureFactory } from '../../../../../fixtures/domain/query/card';

describe(PostCardsSearchesV1RequestHandler.name, () => {
  let cardToCardApiV1Converter: Converter<Card, CardApiV1>;
  let findCardsInteractor: Interactor<CardFindQuery, Promise<Card[]>>;
  let postCardsSearchesV1RequestToCardFindQueryConverter: Converter<
    fastify.FastifyRequest,
    Promise<ValueOrErrors<CardFindQuery>>
  >;

  let getCardsV1RequestHandler: PostCardsSearchesV1RequestHandler;

  beforeAll(async () => {
    cardToCardApiV1Converter = {
      transform: jest.fn(),
    };
    findCardsInteractor = {
      interact: jest.fn(),
    };
    postCardsSearchesV1RequestToCardFindQueryConverter = {
      transform: jest.fn(),
    };

    getCardsV1RequestHandler = new PostCardsSearchesV1RequestHandler(
      cardToCardApiV1Converter,
      findCardsInteractor,
      postCardsSearchesV1RequestToCardFindQueryConverter,
    );
  });

  describe('.handle()', () => {
    describe('when called with a valid request', () => {
      let requestFixture: fastify.FastifyRequest;
      let replyFixture: fastify.FastifyReply;

      let cardFindQueryOrErrors: ValueOrErrors<CardFindQuery>;

      beforeAll(async () => {
        requestFixture = ({
          body: creatureFindQueryApiV1FixtureFactory.get(),
        } as Partial<fastify.FastifyRequest>) as fastify.FastifyRequest;

        replyFixture = fastifyReplyFixtureFactory.get();

        cardFindQueryOrErrors = {
          isEither: false,
          value: creatureFindQueryFixtureFactory.get(),
        };

        (cardToCardApiV1Converter.transform as jest.Mock).mockReturnValueOnce(
          creatureApiV1FixtureFactory.get(),
        );
        (findCardsInteractor.interact as jest.Mock).mockResolvedValueOnce([
          creatureFixtureFactory.get(),
        ]);
        (postCardsSearchesV1RequestToCardFindQueryConverter.transform as jest.Mock).mockResolvedValueOnce(
          cardFindQueryOrErrors,
        );

        await getCardsV1RequestHandler.handle(requestFixture, replyFixture);
      });

      it('must call postCardsSearchesV1RequestToCardFindQueryConverter.transform', () => {
        expect(
          postCardsSearchesV1RequestToCardFindQueryConverter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          postCardsSearchesV1RequestToCardFindQueryConverter.transform,
        ).toHaveBeenCalledWith(requestFixture);
      });

      it('must call findCardsInteractor.interact with the card find query generated', () => {
        expect(findCardsInteractor.interact).toHaveBeenCalledTimes(1);
        expect(findCardsInteractor.interact).toHaveBeenCalledWith(
          creatureFindQueryFixtureFactory.get(),
        );
      });

      it('must call cardToCardApiV1Converter.transform with the card found', () => {
        expect(cardToCardApiV1Converter.transform).toHaveBeenCalledTimes(1);
        expect(cardToCardApiV1Converter.transform).toHaveBeenCalledWith(
          creatureFixtureFactory.get(),
        );
      });

      it('must call reply.send with the cards api found', () => {
        expect(replyFixture.send).toHaveBeenCalledTimes(1);
        expect(replyFixture.send).toHaveBeenCalledWith([
          creatureApiV1FixtureFactory.get(),
        ]);
      });
    });
  });
});
