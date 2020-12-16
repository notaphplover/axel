import 'reflect-metadata';
import { ExtendedGameSetupDb } from '../../../../../adapter/db/model/setup/ExtendedGameSetupDb';
import { GameSetupFindQuery } from '../../../../../domain/query/setup/GameSetupFindQuery';
import { GameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter } from '../../../../../adapter/db/converter/setup/GameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter';
import mongodb from 'mongodb';

describe(
  GameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter.name,
  () => {
    let gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter: GameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter;

    beforeAll(() => {
      gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter = new GameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter();
    });

    describe('.transform', () => {
      describe('when called, by limit and offset', () => {
        let result: unknown;

        beforeAll(() => {
          const gameSetupFindQueryFixture: GameSetupFindQuery = {
            limit: 1,
            offset: 0,
          };

          result = gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter.transform(
            gameSetupFindQueryFixture,
          );
        });

        it('must return a query with no $and properties', () => {
          expect(
            (result as mongodb.FilterQuery<ExtendedGameSetupDb>).$and,
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

          result = gameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter.transform(
            gameSetupFindQueryFixture,
          );
        });

        it('must return a query with no $and properties', () => {
          expect(
            (result as mongodb.FilterQuery<ExtendedGameSetupDb>).$and,
          ).toBeUndefined();
        });
      });
    });
  },
);
