import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../../common/test';
import { LiveGamePlayerArea } from '../../../../../domain/model/live/LiveGamePlayerArea';
import { LiveGameConnectionsCreationQuery } from '../../../../../domain/query/live/connection/LiveGameConnectionsCreationQuery';
import { LiveGameConnectionsUpdateQuery } from '../../../../../domain/query/live/connection/LiveGameConnectionsUpdateQuery';
import { LiveGameCreationQuery } from '../../../../../domain/query/live/LiveGameCreationQuery';
import { LiveGameFindQuery } from '../../../../../domain/query/live/LiveGameFindQuery';
import { cardDeck } from '../../model/deck';
import { liveGame } from '../../model/live';
import { gameSetup } from '../../model/setup';

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

export const liveGameConnectionsCreationQuery: LiveGameConnectionsCreationQuery = {
  liveGameId: liveGame.id,
};

export const liveGameConnectionsCreationQueryFixtureFactory: FixtureFactory<LiveGameConnectionsCreationQuery> = new DeepCloneFixtureFactory(
  liveGameConnectionsCreationQuery,
);

export const liveGameConnectionsUpdateQuery: LiveGameConnectionsUpdateQuery = {
  liveGameConnection: {
    isConnected: true,
    playerId: (liveGame.playerAreas[0] as LiveGamePlayerArea).player.targetId,
  },
  liveGameId: liveGame.id,
};

export const liveGameConnectionsUpdateQueryFixtureFactory: FixtureFactory<LiveGameConnectionsUpdateQuery> = new DeepCloneFixtureFactory(
  liveGameConnectionsUpdateQuery,
);
