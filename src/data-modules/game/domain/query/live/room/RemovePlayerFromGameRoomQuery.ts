import { LiveGameRoomBaseUpdateQuery } from './LiveGameRoomBaseUpdateQuery';
import { LiveGameRoomUpdateQueryType } from './LiveGameRoomUpdateQueryType';

export interface RemovePlayerFromGameRoomQuery
  extends LiveGameRoomBaseUpdateQuery {
  playerId: string;
  type: LiveGameRoomUpdateQueryType.RemovePlayerFromLiveGameRoom;
}
