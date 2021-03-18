import { AppWsMessage } from '../../../../app/adapter/ws/model/AppWsMessage';
import { GameMessageTypes } from './GameMessageTypes';

export interface JoinLiveGameRoomMesage extends AppWsMessage {
  type: GameMessageTypes.JoinLiveGameRoom;
  liveGameId: string;
}
