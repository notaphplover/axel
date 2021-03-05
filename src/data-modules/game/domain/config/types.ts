// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_DOMAIN_TYPES = {
  converter: {
    setup: {
      PLAYER_SETUP_TO_PLAYER_REFERENCE_CONVERTER: Symbol(
        'PlayerSetupToPlayerReferenceConverter',
      ),
    },
  },
  interactor: {
    card: {
      CREATE_CARDS_INTERACTOR: Symbol('CreateCardsInteractor'),
      CREATE_CREATURES_INTERACTOR: Symbol('CreateCreaturesInteractor'),
      FIND_CARDS_INTERACTOR: Symbol('FindCardsInteractor'),
    },
    deck: {
      CREATE_CARD_DECKS_INTERACTOR: Symbol('CreateCardDecksInteractor'),
      FIND_CARD_DECK_INTERACTOR: Symbol('FindCardDeckInteractor'),
      FIND_CARD_DECKS_INTERACTOR: Symbol('FindCardDecksInteractor'),
    },
    live: {
      CREATE_LIVE_GAMES_INTERACTOR: Symbol('CreateLiveGamesInteractor'),
      FIND_GAME_INTERACTOR: Symbol('FindGameInteractor'),
    },
    setup: {
      CREATE_GAME_SETUPS_INTERACTOR: Symbol('CreateGameSetupsInteractor'),
      FIND_GAME_SETUPS_INTERACTOR: Symbol('FindGameSetupsInteractor'),
      UPDATE_GAME_SETUP_INTERACTOR: Symbol('UpdateGameSetupInteractor'),
    },
  },
  repository: {
    card: {
      CARD_SEARCH_REPOSITORY: Symbol('CardSearchRepository'),
      CREATURE_INSERT_REPOSITORY: Symbol('CreatureInsertRepository'),
    },
    deck: {
      CARD_DECK_INSERT_REPOSITORY: Symbol('CardDeckInsertRepository'),
      CARD_DECK_SEARCH_REPOSITORY: Symbol('CardDeckSearchRepository'),
    },
    live: {
      LIVE_GAME_INSERT_REPOSITORY: Symbol('LiveGameInsertRepository'),
      LIVE_GAME_SEARCH_REPOSITORY: Symbol('LiveGameSearchRepository'),
    },
    setup: {
      GAME_SETUP_INSERT_REPOSITORY: Symbol('GameSetupInsertRepository'),
      GAME_SETUP_SEARCH_REPOSITORY: Symbol('GameSetupSearchRepository'),
      GAME_SETUP_UPDATE_REPOSITORY: Symbol('GameSetupUpdateRepository'),
    },
  },
};
