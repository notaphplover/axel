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
      FIND_CARDS_INTERACTOR: Symbol('FindCardsInteractor'),
    },
    deck: {
      CREATE_CARD_DECKS_INTERACTOR: Symbol('CreateCardDecksInteractor'),
      FIND_CARD_DECK_INTERACTOR: Symbol('FindCardDeckInteractor'),
      FIND_CARD_DECKS_INTERACTOR: Symbol('FindCardDecksInteractor'),
    },
    live: {
      connection: {
        CREATE_LIVE_GAMES_CONNECTIONS_INTERACTOR: Symbol(
          'CreateLiveGamesConnectionsInteractor',
        ),
      },
      room: {
        UPSERT_LIVE_GAME_ROOM_INTERACTOR: Symbol(
          'UpsertLiveGameRoomInteractor',
        ),
      },
      CREATE_LIVE_GAMES_INTERACTOR: Symbol('CreateLiveGamesInteractor'),
      FIND_GAME_INTERACTOR: Symbol('FindGameInteractor'),
    },
    setup: {
      CREATE_GAME_SETUPS_INTERACTOR: Symbol('CreateGameSetupsInteractor'),
      DELETE_GAME_SETUPS_INTERACTOR: Symbol('DeleteGameSetupsInteractor'),
      FIND_GAME_SETUPS_INTERACTOR: Symbol('FindGameSetupsInteractor'),
      UPDATE_GAME_SETUP_INTERACTOR: Symbol('UpdateGameSetupInteractor'),
    },
  },
  repository: {
    card: {
      CARD_SEARCH_REPOSITORY: Symbol('CardSearchRepository'),
      CARD_INSERT_REPOSITORY: Symbol('CreatureInsertRepository'),
    },
    deck: {
      CARD_DECK_INSERT_REPOSITORY: Symbol('CardDeckInsertRepository'),
      CARD_DECK_SEARCH_REPOSITORY: Symbol('CardDeckSearchRepository'),
    },
    live: {
      connection: {
        LIVE_GAME_CONNECTIONS_INSERT_REPOSITORY: Symbol(
          'LiveGameConnectionsInsertRepository',
        ),
        LIVE_GAME_CONNECTIONS_UPDATE_REPOSITORY: Symbol(
          'LiveGameConnectionsUpdateRepository',
        ),
      },
      room: {
        LIVE_GAME_ROOM_IN_MEMORY_REPOSITORY: Symbol(
          'LiveGameRoomInMemoryRepository',
        ),
      },
      LIVE_GAME_INSERT_REPOSITORY: Symbol('LiveGameInsertRepository'),
      LIVE_GAME_SEARCH_REPOSITORY: Symbol('LiveGameSearchRepository'),
    },
    setup: {
      GAME_SETUP_DELETE_REPOSITORY: Symbol('GameSetupDeleteRepository'),
      GAME_SETUP_INSERT_REPOSITORY: Symbol('GameSetupInsertRepository'),
      GAME_SETUP_SEARCH_REPOSITORY: Symbol('GameSetupSearchRepository'),
      GAME_SETUP_UPDATE_REPOSITORY: Symbol('GameSetupUpdateRepository'),
    },
  },
};
