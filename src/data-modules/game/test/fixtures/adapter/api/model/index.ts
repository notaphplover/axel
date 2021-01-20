import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../../common/test';
import { LiveGameApiV1 } from '../../../../../adapter/api/model/live/LiveGameApiV1';
import { liveGame } from '../../../domain/model';

const liveGameApiV1: LiveGameApiV1 = {
  id: liveGame.id,
  round: liveGame.round,
};

export const liveGameApiV1FixtureFactory: FixtureFactory<LiveGameApiV1> = new DeepCloneFixtureFactory(
  liveGameApiV1,
);
