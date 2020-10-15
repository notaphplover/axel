import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../../common/test';
import { GameApiV1 } from '../../../../../adapter/api/model/GameApiV1';
import { game } from '../../../domain/model';

const gameApiV1: GameApiV1 = {
  id: game.id,
  round: game.round,
};

export const gameApiV1FixtureFactory: FixtureFactory<GameApiV1> = new DeepCloneFixtureFactory(
  gameApiV1,
);
