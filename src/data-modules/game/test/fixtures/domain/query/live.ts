import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { LiveGameCreationQuery } from '../../../../domain/query/live/LiveGameCreationQuery';
import { LiveGameFindQuery } from '../../../../domain/query/live/LiveGameFindQuery';
import { cardDeck } from '../model/deck';
import { liveGame } from '../model/live';
import { gameSetup } from '../model/setup';

export const liveGameCreationQuery: LiveGameCreationQuery = {
  deckIdToDeckMap: new Map([[cardDeck.id, cardDeck]]),
  gameSetup: gameSetup,
};

export const liveGameCreationQueryFixtureFactory: FixtureFactory<LiveGameCreationQuery> = new DeepCloneFixtureFactory(
  liveGameCreationQuery,
);

export const liveGameFindQuery: LiveGameFindQuery = {
  id: liveGame.id,
  round: liveGame.round,
};

export const liveGameFindQueryFixtureFactory: FixtureFactory<LiveGameFindQuery> = new DeepCloneFixtureFactory(
  liveGameFindQuery,
);
