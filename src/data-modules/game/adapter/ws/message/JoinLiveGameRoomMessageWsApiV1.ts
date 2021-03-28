import { QueryWsApi } from '../../../../app-ws/adapter';
import { GameMessageTypes } from './GameMessageTypes';

export interface JoinLiveGameRoomMessageWsApiV1 extends QueryWsApi {
  type: GameMessageTypes.JoinLiveGameRoom;
  liveGameId: string;
  playerId: string;
}
