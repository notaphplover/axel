import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../../common/test';
import { extendedGameSetup, playerSetup } from '../../../domain/model/setup';
import { BasicGameSetupApiV1 } from '../../../../../adapter/api/model/setup/BasicGameSetupApiV1';
import { ExtendedGameSetupApiV1 } from '../../../../../adapter/api/model/setup/ExtendedGameSetupApiV1';
import { GameFormatApiV1 } from '../../../../../adapter/api/model/GameFormatApiV1';
import { PlayerReferenceApiV1 } from '../../../../../adapter/api/model/setup/PlayerReferenceApiV1';
import { PlayerSetupApiV1 } from '../../../../../adapter/api/model/setup/PlayerSetupApiV1';
import { cardDeckApiV1 } from './deck';

export const playerSetupApiV1: PlayerSetupApiV1 = {
  deck: cardDeckApiV1,
  userId: playerSetup.userId,
};

export const playerReferenceApiV1: PlayerReferenceApiV1 = {
  userId: playerSetupApiV1.userId,
};

export const extendedGameSetupApiV1: ExtendedGameSetupApiV1 = {
  format: GameFormatApiV1.UNRESTRICTED,
  id: extendedGameSetup.id,
  ownerUserId: extendedGameSetup.ownerUserId,
  playerSetups: [playerSetupApiV1],
  playerSlots: extendedGameSetup.playerSlots,
};

export const extendedGameSetupApiV1FixtureFactory: FixtureFactory<ExtendedGameSetupApiV1> = new DeepCloneFixtureFactory(
  extendedGameSetupApiV1,
);

export const basicGameSetupApiV1: BasicGameSetupApiV1 = {
  format: GameFormatApiV1.UNRESTRICTED,
  id: extendedGameSetup.id,
  ownerUserId: extendedGameSetup.ownerUserId,
  playerSetups: [playerSetupApiV1],
  playerSlots: extendedGameSetup.playerSlots,
};

export const basicGameSetupApiV1FixtureFactory: FixtureFactory<BasicGameSetupApiV1> = new DeepCloneFixtureFactory(
  basicGameSetupApiV1,
);
