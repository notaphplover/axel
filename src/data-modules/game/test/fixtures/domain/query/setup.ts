import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { GameSetupsCreationQuery } from '../../../../domain/query/setup/GameSetupCreationQuery';
import { GameSetupDeletionQuery } from '../../../../domain/query/setup/GameSetupDeletionQuery';
import { GameSetupFindQuery } from '../../../../domain/query/setup/GameSetupFindQuery';
import { GameSetupUpdateQuery } from '../../../../domain/query/setup/GameSetupUpdateQuery';
import { gameSetup } from '../model/setup';

export const gameSetupsCreationQuery: GameSetupsCreationQuery = {
  format: gameSetup.format,
  ownerUserId: gameSetup.ownerUserId,
  playerSetups: gameSetup.playerSetups,
  playerSlots: gameSetup.playerSlots,
};

export const gameSetupsCreationQueryFixtureFactory: FixtureFactory<GameSetupsCreationQuery> = new DeepCloneFixtureFactory(
  gameSetupsCreationQuery,
);

export const gameSetupDeletionQuery: GameSetupDeletionQuery = {
  id: gameSetup.id,
};

export const gameSetupDeletionQueryFixtureFactory: FixtureFactory<GameSetupDeletionQuery> = new DeepCloneFixtureFactory(
  gameSetupDeletionQuery,
);

export const gameSetupUpdateQuery: GameSetupUpdateQuery = {
  additionalPlayerSetups: gameSetup.playerSetups,
  id: gameSetup.id,
  removePlayerSetups: gameSetup.playerSetups.map((playerSetup: PlayerSetup) => {
    return { userId: playerSetup.userId };
  }),
};

export const gameSetupUpdateQueryFixtureFactory: FixtureFactory<GameSetupUpdateQuery> = new DeepCloneFixtureFactory(
  gameSetupUpdateQuery,
);

export const gameSetupFindQuery: Required<GameSetupFindQuery> = {
  format: gameSetup.format,
  id: gameSetup.id,
  limit: 1,
  offset: 0,
  ownerUserId: gameSetup.ownerUserId,
  playerSetups: gameSetup.playerSetups.map((playerSetup: PlayerSetup) => {
    return { userId: playerSetup.userId };
  }),
  playerSlots: gameSetup.playerSlots,
};

export const gameSetupFindQueryFixtureFactory: FixtureFactory<GameSetupFindQuery> = new DeepCloneFixtureFactory(
  gameSetupFindQuery,
);
