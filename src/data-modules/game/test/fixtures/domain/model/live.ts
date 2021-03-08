import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { GameFormat } from '../../../../domain/model/GameFormat';
import { LiveGame } from '../../../../domain/model/live/LiveGame';
import { LiveGamePlayerArea } from '../../../../domain/model/live/LiveGamePlayerArea';
import { cardDeck } from './deck';

export const playerArea: LiveGamePlayerArea = {
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
    targetId: '23ce2772-04a2-470b-ae78-3acf941a8ba6',
  },
};

export const liveGame: LiveGame = {
  format: GameFormat.UNRESTRICTED,
  id: '5f5cb76273fd1130685e00dc',
  playerAreas: [playerArea],
  round: 1,
};

export const liveGameFixtureFactory: FixtureFactory<LiveGame> = new DeepCloneFixtureFactory(
  liveGame,
);
