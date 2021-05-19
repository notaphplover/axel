import { AppBrokerSubscriptionContext } from '../../../../../app-broker/adapter';
import { LiveGameRoom } from '../../live/room/LiveGameRoom';
import { GameBrokerSubscriptionContextScope } from '../GameBrokerSubscriptionContextScope';

export interface LiveGameRoomBrokerSubscriptionContext
  extends AppBrokerSubscriptionContext {
  readonly scope: GameBrokerSubscriptionContextScope.LiveGameRoom;
  readonly liveGameRoom: LiveGameRoom;
}
