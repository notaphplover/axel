import { LiveGame } from '../../../../domain/model/live/LiveGame';

export interface JoinLiveGameRoomMessageWsApiV1ValidationContext {
  liveGame: LiveGame;
}
