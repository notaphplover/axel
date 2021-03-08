import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../../common/test';
import { GameFormatApiV1 } from '../../../../../adapter/api/model/GameFormatApiV1';
import { LiveGameApiV1 } from '../../../../../adapter/api/model/live/LiveGameApiV1';
import { LiveGamePlayerAreaApiV1 } from '../../../../../adapter/api/model/live/LiveGamePlayerAreaApiV1';
import { liveGame, playerArea } from '../../../domain/model/live';
import { cardDeckApiV1 } from './deck';

export const playerAreaApiV1: LiveGamePlayerAreaApiV1 = {
  battlefield: {
    permanents: [],
  },
  graveyard: {
    cards: [],
  },
  library: {
    cards: {
      references: [...cardDeckApiV1.sections.core.references],
    },
  },
  player: {
    hand: {
      cards: [],
    },
    lives: playerArea.player.lives,
    targetId: playerArea.player.targetId,
  },
};

const liveGameApiV1: LiveGameApiV1 = {
  format: GameFormatApiV1.UNRESTRICTED,
  id: liveGame.id,
  playerAreas: [playerAreaApiV1],
  round: liveGame.round,
};

export const liveGameApiV1FixtureFactory: FixtureFactory<LiveGameApiV1> = new DeepCloneFixtureFactory(
  liveGameApiV1,
);
