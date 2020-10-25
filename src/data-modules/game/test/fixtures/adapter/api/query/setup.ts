import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../../common/test';
import { GameFormatApiV1 } from '../../../../../adapter/api/model/GameFormatApiV1';
import { GameSetupCreationQueryApiV1 } from '../../../../../adapter/api/query/setup/GameSetupCreationQueryApiV1';
import { GameSetupFindQueryApiV1 } from '../../../../../adapter/api/query/setup/GameSetupFindQueryApiV1';
import { GameSetupFindQueryPlayerSetupApiV1 } from '../../../../../adapter/api/query/setup/GameSetupFindQueryPlayerSetupApiV1';
import { cardDeck } from '../../../domain/model/deck';
import { extendedGameSetup } from '../../../domain/model/setup';

export const gameSetupCreationQueryApiV1: GameSetupCreationQueryApiV1 = {
  format: GameFormatApiV1.UNRESTRICTED,
  ownerUserId: extendedGameSetup.ownerUserId,
  playerSetups: [
    {
      deckId: cardDeck.id,
      userId: extendedGameSetup.ownerUserId,
    },
  ],
  playerSlots: 2,
};

export const gameSetupCreationQueryApiV1FixtureFactory: FixtureFactory<GameSetupCreationQueryApiV1> = new DeepCloneFixtureFactory(
  gameSetupCreationQueryApiV1,
);

export const gameSetupFindQueryPlayerSetupApiV1: GameSetupFindQueryPlayerSetupApiV1 = {
  userId: extendedGameSetup.ownerUserId,
};

export const gameSetupFindQueryApiV1: GameSetupFindQueryApiV1 = {
  format: GameFormatApiV1.UNRESTRICTED,
  id: extendedGameSetup.id,
  ownerUserId: extendedGameSetup.ownerUserId,
  playerSetups: [gameSetupFindQueryPlayerSetupApiV1],
  playerSlots: extendedGameSetup.playerSlots,
};

export const gameSetupFindQueryApiV1FixtureFactory: FixtureFactory<GameSetupFindQueryApiV1> = new DeepCloneFixtureFactory(
  gameSetupFindQueryApiV1,
);
