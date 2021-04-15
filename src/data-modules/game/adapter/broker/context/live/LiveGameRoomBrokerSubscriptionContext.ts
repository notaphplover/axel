import { LiveGameRoom } from '../../../../domain/model/live/room/LiveGameRoom';
import { GameBrokerSubscriptionContextScope } from '../../GameBrokerSubscriptionContextScope';

export interface LiveGameRoomBrokerSubscriptionContext {
  scope: GameBrokerSubscriptionContextScope.LiveGameRoom;
  liveGameRoom: LiveGameRoom;
}
