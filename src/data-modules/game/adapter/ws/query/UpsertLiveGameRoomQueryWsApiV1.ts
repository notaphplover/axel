import { QueryWsApi } from '../../../../app-ws/adapter';
import { GameQueryWsTypes } from './GameQueryWsTypes';

export interface UpsertLiveGameRoomQueryWsApiV1 extends QueryWsApi {
  type: GameQueryWsTypes.JoinLiveGameRoom;
  liveGameId: string;
  playerId: string;
}
