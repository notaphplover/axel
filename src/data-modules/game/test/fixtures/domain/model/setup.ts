import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { BasicGameSetup } from '../../../../domain/model/setup/BasicGameSetup';
import { ExtendedGameSetup } from '../../../../domain/model/setup/ExtendedGameSetup';
import { GameFormat } from '../../../../domain/model/GameFormat';
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

export const extendedGameSetup: ExtendedGameSetup = {
  format: GameFormat.UNRESTRICTED,
  id: '5f5cf46243fda130685e00dc',
  ownerUserId: user.id,
  playerSetups: [playerSetup],
  playerSlots: 1,
};

export const extendedGameSetupFixtureFactory: FixtureFactory<ExtendedGameSetup> = new DeepCloneFixtureFactory(
  extendedGameSetup,
);

export const basicGameSetup: BasicGameSetup = {
  format: extendedGameSetup.format,
  id: extendedGameSetup.id,
  ownerUserId: extendedGameSetup.ownerUserId,
  playerSetups: extendedGameSetup.playerSetups.map(
    (playerSetup: PlayerSetup) => {
      return { userId: playerSetup.userId };
    },
  ),
  playerSlots: extendedGameSetup.playerSlots,
};

export const basicGameSetupFixtureFactory: FixtureFactory<BasicGameSetup> = new DeepCloneFixtureFactory(
  basicGameSetup,
);
