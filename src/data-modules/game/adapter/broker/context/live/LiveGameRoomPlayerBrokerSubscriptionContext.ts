import { AppBrokerSubscriptionContext } from '../../../../../app-broker/adapter';
import { LiveGameRoom } from '../../../../domain/model/live/room/LiveGameRoom';
import { GameBrokerSubscriptionContextScope } from '../../GameBrokerSubscriptionContextScope';

export interface LiveGameRoomPlayerBrokerSubscriptionContext
  extends AppBrokerSubscriptionContext {
  readonly scope: GameBrokerSubscriptionContextScope.LiveGameRoomPlayer;
  readonly liveGameRoom: LiveGameRoom;
  readonly playerId: string;
}
