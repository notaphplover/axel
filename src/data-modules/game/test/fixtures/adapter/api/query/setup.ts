import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../../common/test';
import {
  gameSetupFindQuery,
  gameSetupUpdateQuery,
} from '../../../domain/query/setup';
import { GameFormatApiV1 } from '../../../../../adapter/api/model/GameFormatApiV1';
import { GameSetupCreationQueryApiV1 } from '../../../../../adapter/api/query/setup/GameSetupCreationQueryApiV1';
import { GameSetupFindQueryApiV1 } from '../../../../../adapter/api/query/setup/GameSetupFindQueryApiV1';
import { GameSetupFindQueryPlayerSetupApiV1 } from '../../../../../adapter/api/query/setup/GameSetupFindQueryPlayerSetupApiV1';
import { GameSetupUpdateQueryApiV1 } from '../../../../../adapter/api/query/setup/GameSetupUpdateQueryApiV1';
import { cardDeck } from '../../../domain/model/deck';
import { gameSetup } from '../../../domain/model/setup';

export const gameSetupCreationQueryApiV1: GameSetupCreationQueryApiV1 = {
  format: GameFormatApiV1.UNRESTRICTED,
  ownerUserId: gameSetup.ownerUserId,
  playerSetups: [
    {
      deckId: cardDeck.id,
      userId: gameSetup.ownerUserId,
    },
  ],
  playerSlots: 2,
};

export const gameSetupCreationQueryApiV1FixtureFactory: FixtureFactory<GameSetupCreationQueryApiV1> = new DeepCloneFixtureFactory(
  gameSetupCreationQueryApiV1,
);

export const gameSetupFindQueryPlayerSetupApiV1: GameSetupFindQueryPlayerSetupApiV1 = {
  userId: gameSetupFindQuery.ownerUserId,
};

export const gameSetupFindQueryApiV1: Required<GameSetupFindQueryApiV1> = {
  format: GameFormatApiV1.UNRESTRICTED,
  id: gameSetupFindQuery.id,
  limit: gameSetupFindQuery.limit,
  offset: gameSetupFindQuery.offset,
  ownerUserId: gameSetupFindQuery.ownerUserId,
  playerSetups: [gameSetupFindQueryPlayerSetupApiV1],
  playerSlots: gameSetupFindQuery.playerSlots,
};

export const gameSetupFindQueryApiV1FixtureFactory: FixtureFactory<GameSetupFindQueryApiV1> = new DeepCloneFixtureFactory(
  gameSetupFindQueryApiV1,
);

export const gameSetupUpdateQueryApiV1: GameSetupUpdateQueryApiV1 = {
  id: gameSetupUpdateQuery.id,
  additionalPlayerSetups: [
    {
      deckId: cardDeck.id,
      userId: gameSetup.ownerUserId,
    },
  ],
  removePlayerSetups: [
    {
      userId: gameSetup.ownerUserId,
    },
  ],
};

export const gameSetupUpdateQueryApiV1FixtureFactory: FixtureFactory<GameSetupUpdateQueryApiV1> = new DeepCloneFixtureFactory(
  gameSetupUpdateQueryApiV1,
);
