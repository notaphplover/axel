import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../common/test';
import { Game, NoIdGame } from '../../../../domain/model/Game';

export const noIdGame: NoIdGame = {
  round: 2,
};

export const noIdGameFixtureFactory: FixtureFactory<NoIdGame> = new DeepCloneFixtureFactory(
  noIdGame,
);

export const game: Game = {
  id: 'sample-id',
  round: noIdGame.round,
};

export const gameFixtureFactory: FixtureFactory<Game> = new DeepCloneFixtureFactory(
  game,
);
