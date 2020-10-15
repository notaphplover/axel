import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { GameSetupCreationQuery } from '../../../../domain/query/setup/GameSetupCreationQuery';
import { gameSetup } from '../model/setup';

export const gameSetupCreationQuery: GameSetupCreationQuery = {
  format: gameSetup.format,
  playerSetups: gameSetup.playerSetups,
  playerSlots: gameSetup.playerSlots,
};

export const gameSetupCreationQueryFixtureFactory: FixtureFactory<GameSetupCreationQuery> = new DeepCloneFixtureFactory(
  gameSetupCreationQuery,
);
