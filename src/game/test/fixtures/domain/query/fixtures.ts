import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../common/test';
import { GameCreationQuery } from '../../../../domain/query/GameCreationQuery';
import { GameFindQuery } from '../../../../domain/query/GameFindQuery';
import { game } from '../model/fixtures';

export const gameCreationQuery: GameCreationQuery = {
  round: game.round,
};

export const gameCreationQueryFixtureFactory: FixtureFactory<GameCreationQuery> = new DeepCloneFixtureFactory(
  gameCreationQuery,
);

export const gameFindQuery: GameFindQuery = {
  id: game.id,
  round: game.round,
};

export const gameFindQueryFixtureFactory: FixtureFactory<GameFindQuery> = new DeepCloneFixtureFactory(
  gameFindQuery,
);
