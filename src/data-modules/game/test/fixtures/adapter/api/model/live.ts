import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../../common/test';
import { ResourceTypeApiV1 } from '../../../../../adapter/api/model/card/ResourceTypeApiV1';
import { GameFormatApiV1 } from '../../../../../adapter/api/model/GameFormatApiV1';
import { GameStateApiV1 } from '../../../../../adapter/api/model/live/GameStateApiV1';
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
    manaPool: {
      [ResourceTypeApiV1.Black]: 0,
      [ResourceTypeApiV1.Blue]: 0,
      [ResourceTypeApiV1.Green]: 0,
      [ResourceTypeApiV1.Red]: 0,
      [ResourceTypeApiV1.Uncolored]: 0,
      [ResourceTypeApiV1.White]: 0,
    },
    targetId: playerArea.player.targetId,
  },
};

const liveGameApiV1: LiveGameApiV1 = {
  format: GameFormatApiV1.UNRESTRICTED,
  id: liveGame.id,
  playerAreas: [playerAreaApiV1],
  round: liveGame.round,
  state: GameStateApiV1.NOT_STARTED,
};

export const liveGameApiV1FixtureFactory: FixtureFactory<LiveGameApiV1> = new DeepCloneFixtureFactory(
  liveGameApiV1,
);
