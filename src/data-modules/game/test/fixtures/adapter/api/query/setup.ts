import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../../common/test';
import { GameFormatApiV1 } from '../../../../../adapter/api/model/GameFormatApiV1';
import { GameSetupCreationQueryApiV1 } from '../../../../../adapter/api/query/setup/GameSetupCreationQueryApiV1';
import { cardDeck } from '../../../domain/model/deck';
import { user } from '../../../../../../user/test/fixtures/domain/model/fixtures';

export const gameSetupCreationQueryApiV1: GameSetupCreationQueryApiV1 = {
  format: GameFormatApiV1.UNRESTRICTED,
  ownerUserId: user.id,
  playerSetups: [
    {
      deckId: cardDeck.id,
      userId: user.id,
    },
  ],
  playerSlots: 2,
};

export const gameSetupCreationQueryApiV1FixtureFactory: FixtureFactory<GameSetupCreationQueryApiV1> = new DeepCloneFixtureFactory(
  gameSetupCreationQueryApiV1,
);
