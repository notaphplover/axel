// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_DOMAIN_TYPES = {
  interactor: {
    CREATE_GAMES_INTERACTOR: Symbol.for('CreateGamesInteractor'),
    FIND_GAME_INTERACTOR: Symbol.for('FindGameInteractor'),
    card: {
      CREATE_ARTIFACTS_INTERACTOR: Symbol.for('CreateArtifactsInteractor'),
      CREATE_CARD_DECKS_INTERACTOR: Symbol.for('CreateCardDecksInteractor'),
      CREATE_CARDS_INTERACTOR: Symbol.for('CreateCardsInteractor'),
      CREATE_CREATURES_INTERACTOR: Symbol.for('CreateCreaturesInteractor'),
      CREATE_ENCHANTMENTS_INTERACTOR: Symbol.for(
        'CreateEnchantmentsInteractor',
      ),
      CREATE_LANDS_INTERACTOR: Symbol.for('CreateLandsInteractor'),
      FIND_CARDS_INTERACTOR: Symbol.for('FindCardsInteractor'),
    },
  },
  repository: {
    GAME_INSERT_REPOSITORY: Symbol.for('GameInsertRepository'),
    GAME_SEARCH_REPOSITORY: Symbol.for('GameSearchRepository'),
    card: {
      ARTIFACT_INSERT_REPOSITORY: Symbol.for('ArtifactInsertRepository'),
      CARD_DECK_INSERT_REPOSITORY: Symbol.for('CardDeckInsertRepository'),
      CARD_DECK_SEARCH_REPOSITORY: Symbol.for('CardDeckSearchRepository'),
      CARD_SEARCH_REPOSITORY: Symbol.for('CardSearchRepository'),
      CREATURE_INSERT_REPOSITORY: Symbol.for('CreatureInsertRepository'),
      ENCHANTMENT_INSERT_REPOSITORY: Symbol.for('EnchantmentInsertRepository'),
      LAND_INSERT_REPOSITORY: Symbol.for('LandInsertRepository'),
    },
  },
};
