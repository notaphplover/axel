import { GAME_ADAPTER_API_TYPES } from './gameAdapterApiTypes';
import { GAME_ADAPTER_DB_TYPES } from './gameAdapterDbTypes';
import { GAME_ADAPTER_SERVER_TYPES } from './gameAdapterServerTypes';
import { GAME_ADAPTER_WS_TYPES } from './gameAdapterWsTypes';

// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_TYPES = {
  api: GAME_ADAPTER_API_TYPES,
  db: GAME_ADAPTER_DB_TYPES,
  server: GAME_ADAPTER_SERVER_TYPES,
  ws: GAME_ADAPTER_WS_TYPES,
};

// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_PUBLIC_TYPES = {
  db: {
    initializer: {
      GAME_DB_INITIALIZER:
        GAME_ADAPTER_TYPES.db.initializer.GAME_DB_INITIALIZER,
    },
  },
  server: {
    router: {
      GAME_ROUTER: GAME_ADAPTER_TYPES.server.router.live.LIVE_GAME_ROUTER,
      card: {
        CARD_ROUTER: GAME_ADAPTER_TYPES.server.router.card.CARD_ROUTER,
      },
      deck: {
        DECK_ROUTER: GAME_ADAPTER_TYPES.server.router.deck.DECK_ROUTER,
      },
      setup: {
        GAME_SETUP_ROUTER:
          GAME_ADAPTER_TYPES.server.router.setup.GAME_SETUP_ROUTER,
      },
    },
  },
  ws: {
    msgHandler: {
      LIVE_GAME_ROOM_UPSERT_QUERY_WS_API_V1_HANDLER:
        GAME_ADAPTER_TYPES.ws.msgHandler
          .LIVE_GAME_ROOM_UPSERT_QUERY_WS_API_V1_HANDLER,
    },
  },
};
