import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../../common/test';
import { GameFormatApiV1 } from '../../../../../adapter/api/model/GameFormatApiV1';
import { BasicGameSetupApiV1 } from '../../../../../adapter/api/model/setup/BasicGameSetupApiV1';
import { ExtendedGameSetupApiV1 } from '../../../../../adapter/api/model/setup/ExtendedGameSetupApiV1';
import { PlayerReferenceApiV1 } from '../../../../../adapter/api/model/setup/PlayerReferenceApiV1';
import { PlayerSetupApiV1 } from '../../../../../adapter/api/model/setup/PlayerSetupApiV1';
import { gameSetup, playerSetup } from '../../../domain/model/setup';
import { cardDeckApiV1 } from './deck';

export const playerSetupApiV1: PlayerSetupApiV1 = {
  deckId: cardDeckApiV1.id,
  userId: playerSetup.userId,
};

export const playerReferenceApiV1: PlayerReferenceApiV1 = {
  userId: playerSetupApiV1.userId,
};

export const gameSetupApiV1: ExtendedGameSetupApiV1 = {
  format: GameFormatApiV1.UNRESTRICTED,
  id: gameSetup.id,
  ownerUserId: gameSetup.ownerUserId,
  playerSetups: [playerSetupApiV1],
  playerSlots: gameSetup.playerSlots,
};

export const extendedGameSetupApiV1FixtureFactory: FixtureFactory<ExtendedGameSetupApiV1> =
  new DeepCloneFixtureFactory(gameSetupApiV1);

export const basicGameSetupApiV1: BasicGameSetupApiV1 = {
  format: GameFormatApiV1.UNRESTRICTED,
  id: gameSetup.id,
  ownerUserId: gameSetup.ownerUserId,
  playerSetups: [playerSetupApiV1],
  playerSlots: gameSetup.playerSlots,
};

export const basicGameSetupApiV1FixtureFactory: FixtureFactory<BasicGameSetupApiV1> =
  new DeepCloneFixtureFactory(basicGameSetupApiV1);
