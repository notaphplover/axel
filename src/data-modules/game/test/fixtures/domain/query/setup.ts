import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { GameSetupFindQuery } from '../../../../domain/query/setup/GameSetupFindQuery';
import { GameSetupUpdateQuery } from '../../../../domain/query/setup/GameSetupUpdateQuery';
import { GameSetupsCreationQuery } from '../../../../domain/query/setup/GameSetupCreationQuery';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { extendedGameSetup } from '../model/setup';

export const gameSetupsCreationQuery: GameSetupsCreationQuery = {
  format: extendedGameSetup.format,
  ownerUserId: extendedGameSetup.ownerUserId,
  playerSetups: extendedGameSetup.playerSetups,
  playerSlots: extendedGameSetup.playerSlots,
};

export const gameSetupsCreationQueryFixtureFactory: FixtureFactory<GameSetupsCreationQuery> = new DeepCloneFixtureFactory(
  gameSetupsCreationQuery,
);

export const gameSetupUpdateQuery: GameSetupUpdateQuery = {
  additionalPlayerSetups: extendedGameSetup.playerSetups,
  id: extendedGameSetup.id,
  removePlayerSetups: extendedGameSetup.playerSetups.map(
    (playerSetup: PlayerSetup) => {
      return { userId: playerSetup.userId };
    },
  ),
};

export const gameSetupUpdateQueryFixtureFactory: FixtureFactory<GameSetupUpdateQuery> = new DeepCloneFixtureFactory(
  gameSetupUpdateQuery,
);

export const gameSetupFindQuery: Required<GameSetupFindQuery> = {
  format: extendedGameSetup.format,
  id: extendedGameSetup.id,
  limit: 1,
  offset: 0,
  ownerUserId: extendedGameSetup.ownerUserId,
  playerSetups: extendedGameSetup.playerSetups.map(
    (playerSetup: PlayerSetup) => {
      return { userId: playerSetup.userId };
    },
  ),
  playerSlots: extendedGameSetup.playerSlots,
};

export const gameSetupFindQueryFixtureFactory: FixtureFactory<GameSetupFindQuery> = new DeepCloneFixtureFactory(
  gameSetupFindQuery,
);

export const extendedGameSetupFindQueryFixtureFactory: FixtureFactory<GameSetupFindQuery> = new DeepCloneFixtureFactory(
  gameSetupFindQuery,
);
