import { FixtureFactory } from '../../../../../common/test';
import { GameFindQuery } from '../../../../domain/query/GameFindQuery';
import { GameFindQueryFixtureFactory } from './GameFindQueryFixtureFactory';
import { game } from '../model/fixtures';

export const gameFindQuery: GameFindQuery = {
  id: game.id,
  round: game.round,
};

export const gameFindQueryFixtureFactory: FixtureFactory<GameFindQuery> = new GameFindQueryFixtureFactory(
  gameFindQuery,
);
