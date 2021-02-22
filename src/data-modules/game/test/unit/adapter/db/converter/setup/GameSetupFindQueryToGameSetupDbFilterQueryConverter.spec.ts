import 'reflect-metadata';
import mongodb from 'mongodb';

import { GameSetupFindQueryToGameSetupDbFilterQueryConverter } from '../../../../../../adapter/db/converter/setup/GameSetupFindQueryToGameSetupDbFilterQueryConverter';
import { GameSetupDb } from '../../../../../../adapter/db/model/setup/GameSetupDb';
import { GameSetupFindQuery } from '../../../../../../domain/query/setup/GameSetupFindQuery';

describe(GameSetupFindQueryToGameSetupDbFilterQueryConverter.name, () => {
  let gameSetupFindQueryToGameSetupDbFilterQueryConverter: GameSetupFindQueryToGameSetupDbFilterQueryConverter;

  beforeAll(() => {
    gameSetupFindQueryToGameSetupDbFilterQueryConverter = new GameSetupFindQueryToGameSetupDbFilterQueryConverter();
  });

  describe('.transform', () => {
    describe('when called, by limit and offset', () => {
      let result: unknown;

      beforeAll(() => {
        const gameSetupFindQueryFixture: GameSetupFindQuery = {
          limit: 1,
          offset: 0,
        };

        result = gameSetupFindQueryToGameSetupDbFilterQueryConverter.transform(
          gameSetupFindQueryFixture,
        );
      });

      it('must return a query with no $and properties', () => {
        expect(
          (result as mongodb.FilterQuery<GameSetupDb>).$and,
        ).toBeUndefined();
      });
    });

    describe('when called, by limit, offset and an empty array of player setups', () => {
      let result: unknown;

      beforeAll(() => {
        const gameSetupFindQueryFixture: GameSetupFindQuery = {
          limit: 1,
          offset: 0,
          playerSetups: [],
        };

        result = gameSetupFindQueryToGameSetupDbFilterQueryConverter.transform(
          gameSetupFindQueryFixture,
        );
      });

      it('must return a query with no $and properties', () => {
        expect(
          (result as mongodb.FilterQuery<GameSetupDb>).$and,
        ).toBeUndefined();
      });
    });
  });
});
