// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_TYPES = {
  api: {
    converter: {
      GAME_TO_GAME_API_V1_CONVERTER: Symbol.for('GameToGameApiV1Converter'),
    },
  },
  db: {
    converter: {
      GAME_DB_TO_GAME_CONVERTER: Symbol.for('GameDbToGameConverter'),
      GAME_TO_GAME_DB_CONVERTER: Symbol.for('GameToGameDbConverter'),
      GAME_FIND_QUERY_TO_GAME_DB_FILTER_QUERY_CONVERTER: Symbol.for(
        'GameFindQueryToGameDbFilterQueryConverter',
      ),
    },
    model: {
      GAME_DB_MODEL: Symbol.for('gameDbModel'),
    },
  },
  server: {
    reqHandler: {
      GET_GAME_BY_ID_V1_REQUEST_HANDLER: Symbol.for(
        'GetGameByIdV1RequestHandler',
      ),
    },
    router: {
      GAME_ROUTER: Symbol.for('GameRouter'),
    },
  },
};

// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_PUBLIC_TYPES = {
  server: {
    router: {
      GAME_ROUTER: GAME_ADAPTER_TYPES.server.router.GAME_ROUTER,
    },
  },
};
