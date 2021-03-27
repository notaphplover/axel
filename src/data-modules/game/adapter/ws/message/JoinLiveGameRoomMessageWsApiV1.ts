import { MessageWsApi } from '../../../../app-ws/adapter';
import { GameMessageTypes } from './GameMessageTypes';

export interface JoinLiveGameRoomMessageWsApiV1 extends MessageWsApi {
  type: GameMessageTypes.JoinLiveGameRoom;
  liveGameId: string;
  playerId: string;
}
