import { Messenger } from '../../../../../../common/domain';
import { LiveGameRoomBaseUpdateQuery } from './LiveGameRoomBaseUpdateQuery';
import { LiveGameRoomUpdateQueryType } from './LiveGameRoomUpdateQueryType';

export interface AddPlayerToLiveGameRoomQuery
  extends LiveGameRoomBaseUpdateQuery {
  playerId: string;
  playerGategay: Messenger;
  type: LiveGameRoomUpdateQueryType.AddPlayerToLiveGameRoom;
}
