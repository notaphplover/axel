import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../common/test';
import { Game } from '../../../../domain/model/Game';

export const game: Game = {
  id: 'sample-id',
  round: 2,
};

export const gameFixtureFactory: FixtureFactory<Game> = new DeepCloneFixtureFactory(
  game,
);
