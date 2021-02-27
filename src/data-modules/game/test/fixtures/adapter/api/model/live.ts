import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../../common/test';
import { GameFormatApiV1 } from '../../../../../adapter/api/model/GameFormatApiV1';
import { LiveGameApiV1 } from '../../../../../adapter/api/model/live/LiveGameApiV1';
import { liveGame } from '../../../domain/model/live';

const liveGameApiV1: LiveGameApiV1 = {
  format: GameFormatApiV1.UNRESTRICTED,
  id: liveGame.id,
  round: liveGame.round,
};

export const liveGameApiV1FixtureFactory: FixtureFactory<LiveGameApiV1> = new DeepCloneFixtureFactory(
  liveGameApiV1,
);
