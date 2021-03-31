import { GameQueryWsTypes } from '../../../../../../../adapter/ws/query/GameQueryWsTypes';
import { LiveGameRoomUpsertQueryWsApiV1 } from '../../../../../../../adapter/ws/query/LiveGameRoomUpsertQueryWsApiV1';

export class LiveGameRoomUpsertQueryWsApiV1Fixtures {
  public static any(): LiveGameRoomUpsertQueryWsApiV1 {
    return {
      id: 'sample-message-id',
      liveGameId: 'sample-live-game-id',
      playerId: 'sample-player-id',
      type: GameQueryWsTypes.JoinLiveGameRoom,
    };
  }
}
