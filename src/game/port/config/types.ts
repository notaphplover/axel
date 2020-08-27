// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_PORT_TYPES = {
  api: {
    GAME_TO_GAME_API_V1_PORT: Symbol.for('GameToGameApiV1Port'),
  },
  db: {
    GAME_DB_TO_GAME_PORT: Symbol.for('GameDbToGamePort'),
    GAME_FIND_QUERY_TO_GAME_DB_FILTER_QUERY: Symbol.for(
      'GameFindQueryToGameDbFilterQueryPort',
    ),
  },
};
