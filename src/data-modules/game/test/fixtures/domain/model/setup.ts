import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { GameFormat } from '../../../../domain/model/GameFormat';
import { GameSetup } from '../../../../domain/model/setup/GameSetup';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { cardDeck } from './deck';
import { user } from '../../../../../user/test/fixtures/domain/model/fixtures';

export const playerSetup: PlayerSetup = {
  deckId: cardDeck.id,
  userId: user.id,
};

export const playerSetupFixtureFactory: FixtureFactory<PlayerSetup> = new DeepCloneFixtureFactory(
  playerSetup,
);

export const gameSetup: GameSetup = {
  format: GameFormat.UNRESTRICTED,
  id: '5f5cf46243fda130685e00dc',
  ownerUserId: user.id,
  playerSetups: [playerSetup],
  playerSlots: 1,
};

export const gameSetupFixtureFactory: FixtureFactory<GameSetup> = new DeepCloneFixtureFactory(
  gameSetup,
);
