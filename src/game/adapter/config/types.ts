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
};
