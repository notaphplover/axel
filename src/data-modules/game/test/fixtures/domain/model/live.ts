import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { GameFormat } from '../../../../domain/model/GameFormat';
import { LiveGame } from '../../../../domain/model/live/LiveGame';
import { LiveGamePlayerArea } from '../../../../domain/model/live/LiveGamePlayerArea';
import { cardDeck } from './deck';

export const playerAreas: LiveGamePlayerArea = {
  battlefield: {
    permanents: [],
  },
  graveyard: {
    cards: [],
  },
  library: {
    cards: {
      references: [...cardDeck.sections.core.references],
    },
  },
  player: {
    hand: {
      cards: [],
    },
    lives: 20,
  },
};

export const liveGame: LiveGame = {
  format: GameFormat.UNRESTRICTED,
  id: '5f5cb76273fd1130685e00dc',
  playerAreas: [playerAreas],
  round: 1,
};

export const liveGameFixtureFactory: FixtureFactory<LiveGame> = new DeepCloneFixtureFactory(
  liveGame,
);
