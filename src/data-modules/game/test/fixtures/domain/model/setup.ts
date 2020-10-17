import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { ExtendedGameSetup } from '../../../../domain/model/setup/ExtendedGameSetup';
import { GameFormat } from '../../../../domain/model/GameFormat';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { cardDeck } from './deck';
import { user } from '../../../../../user/test/fixtures/domain/model/fixtures';

export const playerSetup: PlayerSetup = {
  deck: cardDeck,
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
