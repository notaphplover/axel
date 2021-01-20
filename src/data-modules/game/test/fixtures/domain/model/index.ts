import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { LiveGame } from '../../../../domain/model/live/LiveGame';

export const liveGame: LiveGame = {
  id: '5f5cb76273fd1130685e00dc',
  round: 1,
};

export const liveGameFixtureFactory: FixtureFactory<LiveGame> = new DeepCloneFixtureFactory(
  liveGame,
);
