// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_DOMAIN_TYPES = {
  interactor: {
    CREATE_GAMES_INTERACTOR: Symbol.for('CreateGamesInteractor'),
    FIND_GAME_INTERACTOR: Symbol.for('FindGameInteractor'),
  },
  repository: {
    GAME_INSERT_REPOSITORY: Symbol.for('GameInsertRepository'),
    GAME_SEARCH_REPOSITORY: Symbol.for('GameSearchRepository'),
    card: {
      ARTIFACT_INSERT_REPOSITORY: Symbol.for('ArtifactInsertRepository'),
      CREATURE_INSERT_REPOSITORY: Symbol.for('CreatureInsertRepository'),
      ENCHANTMENT_INSERT_REPOSITORY: Symbol.for('EnchantmentInsertRepository'),
      LAND_INSERT_REPOSITORY: Symbol.for('LandInsertRepository'),
    },
  },
};
