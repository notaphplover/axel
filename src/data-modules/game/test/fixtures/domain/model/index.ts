import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { Game } from '../../../../domain/model/Game';

export const game: Game = {
  id: '5f5cb76273fd1130685e00dc',
  round: 2,
};

export const gameFixtureFactory: FixtureFactory<Game> = new DeepCloneFixtureFactory(
  game,
);
