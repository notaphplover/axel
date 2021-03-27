import { AppWsMessage } from '../../../../app-ws/adapter';
import { GameMessageTypes } from './GameMessageTypes';

export interface JoinLiveGameRoomMessageWsApiV1 extends AppWsMessage {
  type: GameMessageTypes.JoinLiveGameRoom;
  liveGameId: string;
  playerId: string;
}
