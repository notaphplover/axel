import { Messenger } from '../../../../../../common/domain';
import { LiveGame } from '../../../../domain/model/live/LiveGame';

export interface JoinLiveGameRoomMessageWsApiV1ValidationContext {
  playerGateway: Messenger;
  liveGame: LiveGame;
}
