import { Messenger } from '../../../../../../common/domain';
import { LiveGame } from '../../../model/live/LiveGame';

export interface UpsertLiveGameRoomQuery {
  liveGame: LiveGame;
  playerGateway: Messenger;
  playerId: string;
}
