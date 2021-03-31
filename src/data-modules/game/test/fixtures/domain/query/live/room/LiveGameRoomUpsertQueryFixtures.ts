import { LiveGameRoomUpsertQuery } from '../../../../../../domain/query/live/room/LiveGameRoomUpsertQuery';
import { liveGameFixtureFactory } from '../../../model/live';

export class LiveGameRoomUpsertQueryFixtures {
  public static any(): LiveGameRoomUpsertQuery {
    return {
      liveGame: liveGameFixtureFactory.get(),
      playerGateway: {
        send: async () => undefined,
      },
      playerId: 'sample-player-id',
    };
  }
}
