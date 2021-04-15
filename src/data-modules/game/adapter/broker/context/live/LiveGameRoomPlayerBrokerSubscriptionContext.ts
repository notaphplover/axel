import { LiveGameRoom } from '../../../../domain/model/live/room/LiveGameRoom';
import { GameBrokerSubscriptionContextScope } from '../../GameBrokerSubscriptionContextScope';

export interface LiveGameRoomPlayerBrokerSubscriptionContext {
  readonly scope: GameBrokerSubscriptionContextScope.LiveGameRoomPlayer;
  readonly liveGameRoom: LiveGameRoom;
  readonly playerId: string;
}
