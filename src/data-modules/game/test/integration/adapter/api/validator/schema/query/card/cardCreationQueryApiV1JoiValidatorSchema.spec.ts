import Joi from 'joi';

import { CardTypeApiV1 } from '../../../../../../../../adapter/api/model/card/CardTypeApiV1';
import { CardCreationQueryApiV1 } from '../../../../../../../../adapter/api/query/card/CardCreationQueryApiV1';
import { cardCreationQueryApiV1JoiValidatorSchema } from '../../../../../../../../adapter/api/validator/schema/query/card/cardCreationQueryApiV1JoiValidatorSchema';
import {
  cardDetailApiV1FixtureFactory,
  resourceApiV1FixtureFactory,
} from '../../../../../../../fixtures/adapter/api/model/card';

describe('cardCreationQueryApiV1JoiValidatorSchema', () => {
  describe('.validate()', () => {
    const validCardCreationQueryApiV1Fixtures: CardCreationQueryApiV1[] = [
      {
        cost: resourceApiV1FixtureFactory.get(),
        detail: cardDetailApiV1FixtureFactory.get(),
        types: [CardTypeApiV1.Artifact],
      },
      {
        cost: resourceApiV1FixtureFactory.get(),
        detail: cardDetailApiV1FixtureFactory.get(),
        types: [CardTypeApiV1.Creature],
        power: 1,
        toughness: 2,
      },
      {
        cost: resourceApiV1FixtureFactory.get(),
        detail: cardDetailApiV1FixtureFactory.get(),
        types: [CardTypeApiV1.Creature, CardTypeApiV1.Artifact],
        power: 1,
        toughness: 2,
      },
    ];

    const invalidCardCreationQueryApiV1Fixtures: unknown[] = [
      {
        cost: resourceApiV1FixtureFactory.get(),
        types: [CardTypeApiV1.Artifact],
      },
      {
        detail: cardDetailApiV1FixtureFactory.get(),
        types: [CardTypeApiV1.Artifact],
      },
    ];

    describe.each(validCardCreationQueryApiV1Fixtures)(
      'when called, with a valid CardCreationQueryApiV1',
      (validCardCreationQueryApiV1Fixture: CardCreationQueryApiV1) => {
        let result: Joi.ValidationResult;

        beforeAll(() => {
          result = cardCreationQueryApiV1JoiValidatorSchema.validate(
            validCardCreationQueryApiV1Fixture,
          );
        });

        it('should return no validation errors', () => {
          expect(result.error).toBeUndefined();
        });
      },
    );

    describe.each(invalidCardCreationQueryApiV1Fixtures)(
      'when called, with an invalid CardCreationQueryApiV1',
      (invalidCardCreationQueryApiV1Fixture: unknown) => {
        let result: Joi.ValidationResult;

        beforeAll(() => {
          result = cardCreationQueryApiV1JoiValidatorSchema.validate(
            invalidCardCreationQueryApiV1Fixture,
          );
        });

        it('should return validation errors', () => {
          expect(result.error).not.toBeUndefined();
        });
      },
    );
  });
});
