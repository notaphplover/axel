import { interfaces } from 'inversify';

import { LiveGameRoomPlayerScopeQueryBrokerApiSubscriberHandler } from '../../../broker/handler/live/LiveGameRoomPlayerScopeQueryBrokerApiSubscriberHandler';
import { LiveGameRoomScopeQueryBrokerApiSubscriberHandler } from '../../../broker/handler/live/LiveGameRoomScopeQueryBrokerApiSubscriberHandler';
import { GAME_ADAPTER_TYPES } from '../../types';

export function bindGameAdapterBroker(bind: interfaces.Bind): void {
  bind(
    GAME_ADAPTER_TYPES.broker.handler.live
      .LIVE_GAME_ROOM_PLAYER_SCOPE_QUERY_BROKER_API_SUBSCRIBER_HANDLER,
  ).to(LiveGameRoomPlayerScopeQueryBrokerApiSubscriberHandler);

  bind(
    GAME_ADAPTER_TYPES.broker.handler.live
      .LIVE_GAME_ROOM_SCOPE_QUERY_BROKER_API_SUBSCRIBER_HANDLER,
  ).to(LiveGameRoomScopeQueryBrokerApiSubscriberHandler);
}
