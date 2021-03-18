import { AppWsMessage } from '../../../../app-ws/adapter';
import { GameMessageTypes } from './GameMessageTypes';

export interface JoinLiveGameRoomMesage extends AppWsMessage {
  type: GameMessageTypes.JoinLiveGameRoom;
  liveGameId: string;
}
