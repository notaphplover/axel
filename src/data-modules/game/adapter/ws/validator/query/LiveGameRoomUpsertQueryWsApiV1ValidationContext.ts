import { Messenger } from '../../../../../../common/domain';
import { User } from '../../../../../user/domain';
import { LiveGame } from '../../../../domain/model/live/LiveGame';

export interface LiveGameRoomUpsertQueryWsApiV1ValidationContext {
  playerGateway: Messenger;
  liveGame: LiveGame;
  user: User;
}
