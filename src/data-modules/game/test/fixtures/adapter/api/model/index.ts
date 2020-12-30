import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../../common/test';
import { LiveGameApiV1 } from '../../../../../adapter/api/model/live/LiveGameApiV1';
import { game } from '../../../domain/model';

const gameApiV1: LiveGameApiV1 = {
  id: game.id,
  round: game.round,
};

export const gameApiV1FixtureFactory: FixtureFactory<LiveGameApiV1> = new DeepCloneFixtureFactory(
  gameApiV1,
);
