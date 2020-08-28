// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_TYPES = {
  db: {
    model: {
      GAME_DB_MODEL: Symbol.for('gameDbModel'),
    },
    repository: {
      GAME_DB_SEARCH_REPOSITORY: Symbol.for('GameDbSearchReporitory'),
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
