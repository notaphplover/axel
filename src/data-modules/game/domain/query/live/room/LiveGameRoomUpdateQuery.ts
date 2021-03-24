import { AddPlayerToLiveGameRoomQuery } from './AddPlayerToLiveGameRoomQuery';
import { RemovePlayerFromGameRoomQuery } from './RemovePlayerFromGameRoomQuery';

export type LiveGameRoomUpdateQuery =
  | AddPlayerToLiveGameRoomQuery
  | RemovePlayerFromGameRoomQuery;
