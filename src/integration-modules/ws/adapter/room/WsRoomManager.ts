import { WsRoom } from './WsRoom';

export interface WsRoomManager {
  getOrCreate(roomId: string): WsRoom;
}
