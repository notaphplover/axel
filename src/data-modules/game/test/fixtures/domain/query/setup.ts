import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { GameSetupFindQuery } from '../../../../domain/query/setup/GameSetupFindQuery';
import { GameSetupsCreationQuery } from '../../../../domain/query/setup/GameSetupCreationQuery';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
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
