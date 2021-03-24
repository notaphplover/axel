import { LiveGameRoomUpdateQueryType } from './LiveGameRoomUpdateQueryType';

export interface LiveGameRoomBaseUpdateQuery {
  liveGameId: string;
  type: LiveGameRoomUpdateQueryType;
}
