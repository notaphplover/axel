import { LiveGameRoom } from '../../../../domain/model/live/room/LiveGameRoom';
import { GameBrokerSubscriptionContextScope } from '../../GameBrokerSubscriptionContextScope';

export interface LiveGameRoomBrokerSubscriptionContext {
  readonly scope: GameBrokerSubscriptionContextScope.LiveGameRoom;
  readonly liveGameRoom: LiveGameRoom;
}
