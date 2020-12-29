import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { LiveGame } from '../../../../domain/model/live/LiveGame';

export const game: LiveGame = {
  id: '5f5cb76273fd1130685e00dc',
  round: 2,
};

export const gameFixtureFactory: FixtureFactory<LiveGame> = new DeepCloneFixtureFactory(
  game,
);
