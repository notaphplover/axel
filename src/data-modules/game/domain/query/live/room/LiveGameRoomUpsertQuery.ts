import { Messenger } from '../../../../../../common/domain';
import { LiveGame } from '../../../model/live/LiveGame';

export interface LiveGameRoomUpsertQuery {
  liveGame: LiveGame;
  playerGateway: Messenger;
  playerId: string;
}
