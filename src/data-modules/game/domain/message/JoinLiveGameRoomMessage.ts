import { Messenger } from '../../../../common/domain';
import { LiveGame } from '../model/live/LiveGame';

export interface JoinLiveGameRoomMessage {
  liveGame: LiveGame;
  playerGateway: Messenger;
  playerId: string;
}
