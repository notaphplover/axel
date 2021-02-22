/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import * as fastify from 'fastify';

import { Converter, Interactor } from '../../../../../../../../common/domain';
import { ValueOrErrors } from '../../../../../../../../common/domain/either/ValueOrErrors';
import { fastifyReplyFixtureFactory } from '../../../../../../../../integration-modules/fastify/test/fixtures/fastify.fixture';
import { CardApiV1 } from '../../../../../../adapter/api/model/card/CardApiV1';
import { PostCardV1RequestHandler } from '../../../../../../adapter/server/reqHandler/card/PostCardV1RequestHandler';
import { Card } from '../../../../../../domain/model/card/Card';
import { CardCreationQuery } from '../../../../../../domain/query/card/CardCreationQuery';
import { artifactApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/model/card';
import { artifactCreationQueryApiV1FixtureFactory } from '../../../../../fixtures/adapter/api/query/card';
import { artifactFixtureFactory } from '../../../../../fixtures/domain/model/card';
import { artifactCreationQueryFixtureFactory } from '../../../../../fixtures/domain/query/card';

describe(PostCardV1RequestHandler.name, () => {
  let cardToCardApiV1Converter: Converter<Card, CardApiV1>;
  let createCardsInteractor: Interactor<CardCreationQuery, Promise<Card[]>>;
  let postCardV1RequestToCardCreationQueryConverter: Converter<
    fastify.FastifyRequest,
    Promise<ValueOrErrors<CardCreationQuery>>
  >;

  let postCardV1RequestHandler: PostCardV1RequestHandler;

  beforeAll(() => {
    cardToCardApiV1Converter = {
      transform: jest.fn(),
    };
    createCardsInteractor = {
      interact: jest.fn(),
    };
    postCardV1RequestToCardCreationQueryConverter = {
      transform: jest.fn(),
    };

    postCardV1RequestHandler = new PostCardV1RequestHandler(
      cardToCardApiV1Converter,
      createCardsInteractor,
      postCardV1RequestToCardCreationQueryConverter,
    );
  });

  describe('.handle()', () => {
    describe('when called with a valid request', () => {
      let requestFixture: fastify.FastifyRequest;
      let replyFixture: fastify.FastifyReply;

      let artifactCreationQueryOrErrorsFixture: ValueOrErrors<CardCreationQuery>;

      beforeAll(async () => {
        requestFixture = ({
          body: artifactCreationQueryApiV1FixtureFactory.get(),
        } as Partial<fastify.FastifyRequest>) as fastify.FastifyRequest;

        replyFixture = fastifyReplyFixtureFactory.get();

        artifactCreationQueryOrErrorsFixture = {
          isEither: false,
          value: artifactCreationQueryFixtureFactory.get(),
        };

        (cardToCardApiV1Converter.transform as jest.Mock).mockReturnValueOnce(
          artifactApiV1FixtureFactory.get(),
        );

        (createCardsInteractor.interact as jest.Mock).mockResolvedValueOnce([
          artifactFixtureFactory.get(),
        ]);

        (postCardV1RequestToCardCreationQueryConverter.transform as jest.Mock).mockResolvedValueOnce(
          artifactCreationQueryOrErrorsFixture,
        );

        await postCardV1RequestHandler.handle(requestFixture, replyFixture);
      });

      it('must call postCardV1RequestToCardCreationQueryConverter.transform with the request provided', () => {
        expect(
          postCardV1RequestToCardCreationQueryConverter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          postCardV1RequestToCardCreationQueryConverter.transform,
        ).toHaveBeenCalledWith(requestFixture);
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
