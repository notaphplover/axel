import { FixtureFactory } from '../../../../../common/test';
import { GameCreationQuery } from '../../../../domain/query/GameCreationQuery';
import { GameCreationQueryFixtureFactory } from './GameCreationQueryFixtureFactory';
import { GameFindQuery } from '../../../../domain/query/GameFindQuery';
import { GameFindQueryFixtureFactory } from './GameFindQueryFixtureFactory';
import { game } from '../model/fixtures';

export const gameCreationQuery: GameCreationQuery = {
  round: game.round,
};

export const gameCreationQueryFixtureFactory: FixtureFactory<GameCreationQuery> = new GameCreationQueryFixtureFactory(
  gameCreationQuery,
);

export const gameFindQuery: GameFindQuery = {
  id: game.id,
  round: game.round,
};

export const gameFindQueryFixtureFactory: FixtureFactory<GameFindQuery> = new GameFindQueryFixtureFactory(
  gameFindQuery,
);
