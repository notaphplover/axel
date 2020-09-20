// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_DOMAIN_TYPES = {
  interactor: {
    CREATE_GAMES_INTERACTOR: Symbol.for('CreateGamesInteractor'),
    FIND_GAME_INTERACTOR: Symbol.for('FindGameInteractor'),
    card: {
      FIND_CARDS_INTERACTOR: Symbol.for('FindCardsInteractor'),
    },
  },
  repository: {
    GAME_INSERT_REPOSITORY: Symbol.for('GameInsertRepository'),
    GAME_SEARCH_REPOSITORY: Symbol.for('GameSearchRepository'),
    card: {
      ARTIFACT_INSERT_REPOSITORY: Symbol.for('ArtifactInsertRepository'),
      CARD_SEARCH_REPOSITORY: Symbol.for('CardSearchRepository'),
      CREATURE_INSERT_REPOSITORY: Symbol.for('CreatureInsertRepository'),
      ENCHANTMENT_INSERT_REPOSITORY: Symbol.for('EnchantmentInsertRepository'),
      LAND_INSERT_REPOSITORY: Symbol.for('LandInsertRepository'),
    },
  },
};
