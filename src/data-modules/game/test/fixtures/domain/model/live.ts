import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { ResourceType } from '../../../../domain/model/card/ResourceType';
import { GameFormat } from '../../../../domain/model/GameFormat';
import { GameState } from '../../../../domain/model/live/GameState';
import { LiveGame } from '../../../../domain/model/live/LiveGame';
import { LiveGamePlayerArea } from '../../../../domain/model/live/LiveGamePlayerArea';
import { cardDeck } from './deck';
import { playerSetup } from './setup';

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
    manaPool: {
      [ResourceType.Black]: 0,
      [ResourceType.Blue]: 0,
      [ResourceType.Green]: 0,
      [ResourceType.Red]: 0,
      [ResourceType.Uncolored]: 0,
      [ResourceType.White]: 0,
    },
    targetId: '23ce2772-04a2-470b-ae78-3acf941a8ba6',
    userId: playerSetup.userId,
  },
};

export const liveGame: LiveGame = {
  format: GameFormat.UNRESTRICTED,
  id: '5f5cb76273fd1130685e00dc',
  playerAreas: [playerArea],
  round: 1,
  state: GameState.NOT_STARTED,
};

export const liveGameFixtureFactory: FixtureFactory<LiveGame> = new DeepCloneFixtureFactory(
  liveGame,
);
