import { Game, NoIdGame } from '../../../../domain/model/Game';
import { FixtureFactory } from '../../../../../common/test';
import { GameFixtureFactory } from './GameFixtureFactory';
import { NoIdGameFixtureFactory } from './NoIdGameFixtureFactory';

export const noIdGame: NoIdGame = {
  round: 2,
};

export const noIdGameFixtureFactory: FixtureFactory<NoIdGame> = new NoIdGameFixtureFactory(
  noIdGame,
);

export const game: Game = {
  id: 'sample-id',
  round: noIdGame.round,
};

export const gameFixtureFactory: FixtureFactory<Game> = new GameFixtureFactory(
  game,
);
