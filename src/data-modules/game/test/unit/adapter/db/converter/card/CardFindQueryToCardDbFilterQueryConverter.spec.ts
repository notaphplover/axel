import 'reflect-metadata';
import mongodb from 'mongodb';

import { CardFindQueryToCardDbFilterQueryConverter } from '../../../../../../adapter/db/converter/card/CardFindQueryToCardDbFilterQueryConverter';
import { CardFindQuery } from '../../../../../../domain/query/card/CardFindQuery';

describe(CardFindQueryToCardDbFilterQueryConverter.name, () => {
  let cardFindQueryToCardDbFilterQueryConverter: CardFindQueryToCardDbFilterQueryConverter;

  beforeAll(() => {
    cardFindQueryToCardDbFilterQueryConverter = new CardFindQueryToCardDbFilterQueryConverter();
  });

  describe('.transform', () => {
    describe('when called, with limit and offset', () => {
      let result: unknown;

      beforeAll(() => {
        const cardFindQueryFixture: CardFindQuery = {
          limit: 1,
          offset: 0,
        };

        result = cardFindQueryToCardDbFilterQueryConverter.transform(
          cardFindQueryFixture,
        );
      });

      it('must return a query with no $and property', () => {
        expect((result as mongodb.FilterQuery<unknown>).$and).toBeUndefined();
      });
    });

    describe('when called, with limit, offset and an empty types array', () => {
      let result: unknown;

      beforeAll(() => {
        const cardFindQueryFixture: CardFindQuery = {
          limit: 1,
          offset: 0,
          types: [],
        };

        result = cardFindQueryToCardDbFilterQueryConverter.transform(
          cardFindQueryFixture,
        );
      });

      it('must return a query with no $and property', () => {
        expect((result as mongodb.FilterQuery<unknown>).$and).toBeUndefined();
      });
    });
  });
});
