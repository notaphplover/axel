import 'reflect-metadata';

import * as fastify from 'fastify';

import { Converter, Validator } from '../../../../../../../../common/domain';
import {
  EitherEither,
  ValueEither,
} from '../../../../../../../../common/domain/either/Either';
import { CardTypeApiV1 } from '../../../../../../adapter/api/model/card/CardTypeApiV1';
import { CardCreationQueryApiV1 } from '../../../../../../adapter/api/query/card/CardCreationQueryApiV1';
import { PostCardV1RequestToCardCreationQueryConverter } from '../../../../../../adapter/server/converter/card/PostCardV1RequestToCardCreationQueryConverter';
import { CardCreationQuery } from '../../../../../../domain/query/card/CardCreationQuery';
import {
  cardDetailApiV1FixtureFactory,
  resourceApiV1FixtureFactory,
} from '../../../../../fixtures/adapter/api/model/card';

describe(PostCardV1RequestToCardCreationQueryConverter.name, () => {
  let queryApiToQueryConverter: jest.Mocked<
    Converter<CardCreationQueryApiV1, Promise<CardCreationQuery>>
  >;

  let syntaxValidator: jest.Mocked<Validator<CardCreationQueryApiV1>>;

  let postCardV1RequestToCardCreationQueryConverter: PostCardV1RequestToCardCreationQueryConverter;

  describe('.transform()', () => {
    beforeAll(() => {
      queryApiToQueryConverter = {
        transform: jest.fn(),
      };

      syntaxValidator = {
        validate: jest.fn(),
      };

      postCardV1RequestToCardCreationQueryConverter = new PostCardV1RequestToCardCreationQueryConverter(
        queryApiToQueryConverter,
        syntaxValidator,
      );
    });

    describe('having a request with a CardCreationQueryApiV1 with power, toughness and creature type', () => {
      let cardCreationQueryApiV1Fixture: CardCreationQueryApiV1;
      let requestFixture: fastify.FastifyRequest;

      beforeAll(() => {
        cardCreationQueryApiV1Fixture = {
          cost: resourceApiV1FixtureFactory.get(),
          detail: cardDetailApiV1FixtureFactory.get(),
          power: 2,
          toughness: 3,
          types: [CardTypeApiV1.Artifact, CardTypeApiV1.Creature],
        };

        requestFixture = ({
          body: cardCreationQueryApiV1Fixture,
        } as Partial<fastify.FastifyRequest>) as fastify.FastifyRequest;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          syntaxValidator.validate.mockReturnValueOnce({
            model: cardCreationQueryApiV1Fixture,
            result: true,
          });

          result = await postCardV1RequestToCardCreationQueryConverter.transform(
            requestFixture,
          );
        });

        it('should return no validation error', () => {
          expect((result as ValueEither<CardCreationQueryApiV1>).isEither).toBe(
            false,
          );
        });
      });
    });

    describe('having a request with a CardCreationQueryApiV1 with no power nor toughness nor creature type', () => {
      let cardCreationQueryApiV1Fixture: CardCreationQueryApiV1;
      let requestFixture: fastify.FastifyRequest;

      beforeAll(() => {
        cardCreationQueryApiV1Fixture = {
          cost: resourceApiV1FixtureFactory.get(),
          detail: cardDetailApiV1FixtureFactory.get(),
          types: [CardTypeApiV1.Enchantment],
        };

        requestFixture = ({
          body: cardCreationQueryApiV1Fixture,
        } as Partial<fastify.FastifyRequest>) as fastify.FastifyRequest;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          syntaxValidator.validate.mockReturnValueOnce({
            model: cardCreationQueryApiV1Fixture,
            result: true,
          });

          result = await postCardV1RequestToCardCreationQueryConverter.transform(
            requestFixture,
          );
        });

        it('should return no validation error', () => {
          expect((result as ValueEither<CardCreationQueryApiV1>).isEither).toBe(
            false,
          );
        });
      });
    });

    describe('having a request with a CardCreationQueryApiV1 with an empty types array', () => {
      let cardCreationQueryApiV1Fixture: CardCreationQueryApiV1;
      let requestFixture: fastify.FastifyRequest;

      beforeAll(() => {
        cardCreationQueryApiV1Fixture = {
          cost: resourceApiV1FixtureFactory.get(),
          detail: cardDetailApiV1FixtureFactory.get(),
          types: [],
        };

        requestFixture = ({
          body: cardCreationQueryApiV1Fixture,
        } as Partial<fastify.FastifyRequest>) as fastify.FastifyRequest;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          syntaxValidator.validate.mockReturnValueOnce({
            model: cardCreationQueryApiV1Fixture,
            result: true,
          });

          result = await postCardV1RequestToCardCreationQueryConverter.transform(
            requestFixture,
          );
        });

        it('should return a validation error', () => {
          expect((result as EitherEither<string[]>).isEither).toBe(true);
          expect((result as EitherEither<string[]>).value).toContain(
            'A card creation query must include at least one type',
          );
        });
      });
    });

    describe('having a request with a CardCreationQueryApiV1 with power and no creature type', () => {
      let cardCreationQueryApiV1Fixture: CardCreationQueryApiV1;
      let requestFixture: fastify.FastifyRequest;

      beforeAll(() => {
        cardCreationQueryApiV1Fixture = {
          cost: resourceApiV1FixtureFactory.get(),
          detail: cardDetailApiV1FixtureFactory.get(),
          power: 2,
          types: [CardTypeApiV1.Artifact],
        };

        requestFixture = ({
          body: cardCreationQueryApiV1Fixture,
        } as Partial<fastify.FastifyRequest>) as fastify.FastifyRequest;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          syntaxValidator.validate.mockReturnValueOnce({
            model: cardCreationQueryApiV1Fixture,
            result: true,
          });

          result = await postCardV1RequestToCardCreationQueryConverter.transform(
            requestFixture,
          );
        });

        it('should return a validation error', () => {
          expect((result as EitherEither<string[]>).isEither).toBe(true);
          expect((result as EitherEither<string[]>).value).toContain(
            'A non creature creation query must not include values for "power" nor "toughness" fields',
          );
        });
      });
    });

    describe('having a request with a CardCreationQueryApiV1 with toughness and no creature type', () => {
      let cardCreationQueryApiV1Fixture: CardCreationQueryApiV1;
      let requestFixture: fastify.FastifyRequest;

      beforeAll(() => {
        cardCreationQueryApiV1Fixture = {
          cost: resourceApiV1FixtureFactory.get(),
          detail: cardDetailApiV1FixtureFactory.get(),
          toughness: 2,
          types: [CardTypeApiV1.Artifact],
        };

        requestFixture = ({
          body: cardCreationQueryApiV1Fixture,
        } as Partial<fastify.FastifyRequest>) as fastify.FastifyRequest;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          syntaxValidator.validate.mockReturnValueOnce({
            model: cardCreationQueryApiV1Fixture,
            result: true,
          });

          result = await postCardV1RequestToCardCreationQueryConverter.transform(
            requestFixture,
          );
        });

        it('should return a validation error', () => {
          expect((result as EitherEither<string[]>).isEither).toBe(true);
          expect((result as EitherEither<string[]>).value).toContain(
            'A non creature creation query must not include values for "power" nor "toughness" fields',
          );
        });
      });
    });

    describe('having a request with a CardCreationQueryApiV1 with no power and creature type', () => {
      let cardCreationQueryApiV1Fixture: CardCreationQueryApiV1;
      let requestFixture: fastify.FastifyRequest;

      beforeAll(() => {
        cardCreationQueryApiV1Fixture = {
          cost: resourceApiV1FixtureFactory.get(),
          detail: cardDetailApiV1FixtureFactory.get(),
          toughness: 2,
          types: [CardTypeApiV1.Artifact, CardTypeApiV1.Creature],
        };

        requestFixture = ({
          body: cardCreationQueryApiV1Fixture,
        } as Partial<fastify.FastifyRequest>) as fastify.FastifyRequest;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          syntaxValidator.validate.mockReturnValueOnce({
            model: cardCreationQueryApiV1Fixture,
            result: true,
          });

          result = await postCardV1RequestToCardCreationQueryConverter.transform(
            requestFixture,
          );
        });

        it('should return a validation error', () => {
          expect((result as EitherEither<string[]>).isEither).toBe(true);
          expect((result as EitherEither<string[]>).value).toContain(
            'A creature creation query must include values for "power" and "toughness" fields',
          );
        });
      });
    });

    describe('having a request with a CardCreationQueryApiV1 with no toughness and creature type', () => {
      let cardCreationQueryApiV1Fixture: CardCreationQueryApiV1;
      let requestFixture: fastify.FastifyRequest;

      beforeAll(() => {
        cardCreationQueryApiV1Fixture = {
          cost: resourceApiV1FixtureFactory.get(),
          detail: cardDetailApiV1FixtureFactory.get(),
          power: 2,
          types: [CardTypeApiV1.Artifact, CardTypeApiV1.Creature],
        };

        requestFixture = ({
          body: cardCreationQueryApiV1Fixture,
        } as Partial<fastify.FastifyRequest>) as fastify.FastifyRequest;
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          syntaxValidator.validate.mockReturnValueOnce({
            model: cardCreationQueryApiV1Fixture,
            result: true,
          });

          result = await postCardV1RequestToCardCreationQueryConverter.transform(
            requestFixture,
          );
        });

        it('should return a validation error', () => {
          expect((result as EitherEither<string[]>).isEither).toBe(true);
          expect((result as EitherEither<string[]>).value).toContain(
            'A creature creation query must include values for "power" and "toughness" fields',
          );
        });
      });
    });
  });
});
