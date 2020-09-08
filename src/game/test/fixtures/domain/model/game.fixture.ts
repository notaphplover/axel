import { FixtureFactory } from '../../../../../common/test';
import { Game } from '../../../../domain/model/Game';
import { GameFixtureFactory } from './GameFixtureFactory';

const game: Game = {
  round: 2,
};

export const gameFixtureFactory: FixtureFactory<Game> = new GameFixtureFactory(
  game,
);
