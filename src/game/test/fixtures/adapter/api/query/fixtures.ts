import { FixtureFactory } from '../../../../../../common/test';
import { GameCreationQueryApiV1 } from '../../../../../adapter/api/query/GameCreationQueryApiV1';
import { GameCreationQueryApiV1FixtureFactory } from './GameCreationQueryApiV1FixtureFactory';
import { game } from '../../../domain/model/fixtures';

const gameCreationQueryApiV1: GameCreationQueryApiV1 = {
  round: game.round,
};

export const gameCreationQueryApiV1FixtureFactory: FixtureFactory<GameCreationQueryApiV1> = new GameCreationQueryApiV1FixtureFactory(
  gameCreationQueryApiV1,
);
