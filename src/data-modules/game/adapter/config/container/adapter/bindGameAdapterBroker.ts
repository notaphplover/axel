import { interfaces } from 'inversify';

import { LiveGameRoomScopeQueryBrokerApiSubscriberHandler } from '../../../broker/handler/live/LiveGameRoomScopeQueryBrokerApiSubscriberHandler';
import { GAME_ADAPTER_TYPES } from '../../types';

export function bindGameAdapterBroker(bind: interfaces.Bind): void {
  bind(
    GAME_ADAPTER_TYPES.broker.handler.live
      .LIVE_GAME_ROOM_SCOPE_QUERY_BROKER_API_SUBSCRIBER_HANDLER,
  ).to(LiveGameRoomScopeQueryBrokerApiSubscriberHandler);
}
