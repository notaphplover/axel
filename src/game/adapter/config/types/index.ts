import { GAME_ADAPTER_API_TYPES } from "./gameAdapterApiTypes";
import { GAME_ADAPTER_DB_TYPES } from "./gameAdapterDbTypes";
import { GAME_ADAPTER_SERVER_TYPES } from "./gameAdapterServerTypes";

// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_TYPES = {
  api: GAME_ADAPTER_API_TYPES,
  db: GAME_ADAPTER_DB_TYPES,
  server: GAME_ADAPTER_SERVER_TYPES,
};

// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_PUBLIC_TYPES = {
  server: {
    router: {
      GAME_ROUTER: GAME_ADAPTER_TYPES.server.router.GAME_ROUTER,
      card: {
        CARD_ROUTER: GAME_ADAPTER_TYPES.server.router.card.CARD_ROUTER,
      },
    },
  },
};
