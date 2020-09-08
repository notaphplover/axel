import { FixtureFactory } from '../../../../../../common/test';
import { GameApiV1 } from '../../../../../adapter/api/model/GameApiV1';
import { GameApiV1FixtureFactory } from './GameApiV1FixtureFactory';
import { game } from '../../../domain/model/game.fixture';

const gameApiV1: GameApiV1 = {
  round: game.round,
};

export const gameApiV1FixtureFactory: FixtureFactory<GameApiV1> = new GameApiV1FixtureFactory(
  gameApiV1,
);
