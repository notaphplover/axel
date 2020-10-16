import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { GameSetupCreationQuery } from '../../../../domain/query/setup/GameSetupCreationQuery';
import { GameSetupFindQuery } from '../../../../domain/query/setup/GameSetupFindQuery';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { gameSetup } from '../model/setup';

export const gameSetupCreationQuery: GameSetupCreationQuery = {
  format: gameSetup.format,
  ownerUserId: gameSetup.ownerUserId,
  playerSetups: gameSetup.playerSetups,
  playerSlots: gameSetup.playerSlots,
};

export const gameSetupCreationQueryFixtureFactory: FixtureFactory<GameSetupCreationQuery> = new DeepCloneFixtureFactory(
  gameSetupCreationQuery,
);

export const gameSetupFindQuery: GameSetupFindQuery = {
  format: gameSetup.format,
  id: gameSetup.id,
  ownerUserId: gameSetup.ownerUserId,
  playerSetups: gameSetup.playerSetups.map((playerSetup: PlayerSetup) => {
    return { userId: playerSetup.userId };
  }),
  playerSlots: gameSetup.playerSlots,
};

export const gameSetupFindQueryFixtureFactory: FixtureFactory<GameSetupFindQuery> = new DeepCloneFixtureFactory(
  gameSetupFindQuery,
);
