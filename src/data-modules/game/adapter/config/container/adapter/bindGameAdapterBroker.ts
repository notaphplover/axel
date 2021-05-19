import { interfaces } from 'inversify';

import { LiveGameRoomPlayerScopeBrokerQueryHandler } from '../../../../domain/handler/live/LiveGameRoomPlayerScopeBrokerQueryHandler';
import { LiveGameRoomScopeQueryBrokerQueryHandler } from '../../../../domain/handler/live/LiveGameRoomScopeQueryBrokerQueryHandler';
import { GAME_ADAPTER_TYPES } from '../../types';

export function bindGameAdapterBroker(bind: interfaces.Bind): void {
  bind(
    GAME_ADAPTER_TYPES.broker.handler.live
      .LIVE_GAME_ROOM_PLAYER_SCOPE_BROKER_QUERY_HANDLER,
  ).to(LiveGameRoomPlayerScopeBrokerQueryHandler);

  bind(
    GAME_ADAPTER_TYPES.broker.handler.live
      .LIVE_GAME_ROOM_SCOPE_BROKER_QUERY_HANDLER,
  ).to(LiveGameRoomScopeQueryBrokerQueryHandler);
}
