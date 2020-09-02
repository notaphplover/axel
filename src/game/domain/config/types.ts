// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_DOMAIN_TYPES = {
  converter: {
    GAME_CREATION_QUERY_TO_GAMES_CONVERTER: Symbol.for(
      'GameCreationQueryToGamesConverter',
    ),
  },
  interactor: {
    FIND_GAME_INTERACTOR: Symbol.for('FindGameInteractor'),
  },
  repository: {
    GAME_INSERT_REPOSITORY: Symbol.for('GameInsertRepository'),
    GAME_SEARCH_REPOSITORY: Symbol.for('GameSearchRepository'),
  },
};
