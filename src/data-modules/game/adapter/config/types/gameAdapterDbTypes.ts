// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_DB_TYPES = {
  collection: {
    card: {
      CARD_COLLECTION_NAME: Symbol('CardCollectionName'),
    },
    deck: {
      DECK_COLLECTION_NAME: Symbol('DeckCollectionName'),
    },
    live: {
      LIVE_GAME_COLLECTION_NAME: Symbol('LiveGameCollectionName'),
      LIVE_GAME_CONNECTIONS_COLLECTION_NAME: Symbol(
        'LiveGameConnectionsCollectionName',
      ),
    },
    setup: {
      GAME_SETUP_COLLECTION_NAME: Symbol('GameSetupCollectionName'),
    },
  },
  converter: {
    card: {
      CARD_DB_TO_CARD_CONVERTER: Symbol('CardDbToCardConverter'),
      CARD_FIND_QUERY_TO_CARD_DB_FILTER_QUERY_CONVERTER: Symbol(
        'CardFindQueryToCardDbFilterQueryConverter',
      ),
      CARD_CREATION_QUERY_TO_CARD_DBS_CONVERTER: Symbol(
        'CreatureCreationQueryToCreatureDbsConverter',
      ),
    },
    deck: {
      CARD_DECK_CREATION_QUERY_TO_CARD_DBS_CONVERTER: Symbol(
        'CardDeckCreationQueryToCardDbsConverter',
      ),
      CARD_DECK_DB_TO_CARD_DECK_CONVERTER: Symbol(
        'CardDeckDbToCardDeckConverter',
      ),
      CARD_DECK_FIND_QUERY_TO_CARD_DECK_DB_FILTER_QUERY_CONVERTER: Symbol(
        'CardDeckFindQueryToCardDeckDbFilterQueryConverter ',
      ),
    },
    live: {
      connection: {
        LIVE_GAME_CONNECTIONS_CREATION_QUERY_TO_LIVE_GAME_CONNECTIONS_CONVERTER: Symbol(
          'LiveGameConnectionsCreationQueryToLiveGameConnectionsConverter',
        ),
        LIVE_GAME_CONNECTIONS_FIND_QUERY_TO_LIVE_GAME_CONNECTIONS_DB_FILTER_QUERY_CONVERTER: Symbol(
          'LiveGameConnectionsFilterQueryToLiveGameConnectionsDbFilterQueryConverter',
        ),
        LIVE_GAME_CONNECTIONS_UPDATE_QUERY_TO_LIVE_GAME_CONNECTIONS_DB_FILTER_QUERY_CONVERTER: Symbol(
          'LiveGameConnectionsUpdateQueryToLiveGameConnectionsDbFilterQueryConverter',
        ),
        LIVE_GAME_CONNECTIONS_UPDATE_QUERY_TO_LIVE_GAME_CONNECTIONS_DB_UPDATE_QUERY_CONVERTER: Symbol(
          'LiveGameConnectionsUpdateQueryToLiveGameConnectionsDbUpdateQueryConverter',
        ),
        LIVE_GAME_CONNECTIONS_DB_TO_LIVE_GAME_CONNECTIONS_CONVERTER: Symbol(
          'LiveGameConnectionsDbToLiveGameConnectionsConverter',
        ),
      },
      LIVE_GAME_CREATION_QUERY_TO_LIVE_GAME_DBS_CONVERTER: Symbol(
        'LiveGameCreationQueryToLiveGameDbsConverter',
      ),
      LIVE_GAME_DB_TO_LIVE_GAME_CONVERTER: Symbol(
        'LiveGameDbToLiveGameConverter',
      ),
      LIVE_GAME_FIND_QUERY_TO_LIVE_GAME_DB_FILTER_QUERY_CONVERTER: Symbol(
        'LiveGameFindQueryToLiveGameDbFilterQueryConverter',
      ),
    },
    setup: {
      GAME_SETUP_DB_TO_GAME_SETUP_CONVERTER: Symbol(
        'GameSetupDbToGameSetupConverter',
      ),
      GAME_SETUP_CREATION_QUERY_TO_GAME_SETUP_DBS_CONVERTER: Symbol(
        'GameSetupCreationQueryToGameSetupDbsConverter',
      ),
      GAME_SETUP_DELETION_QUERY_TO_GAME_SETUP_DB_FILTER_CONVERTER: Symbol(
        'GameSetupDeletionQueryToGameSetupDbFilterConverter',
      ),
      GAME_SETUP_FIND_QUERY_TO_GAME_SETUP_DB_FILTER_QUERY_CONVERTER: Symbol(
        'GameSetupFindQueryToGameSetupDbFilterQueryConverter',
      ),
      GAME_SETUP_UPDATE_QUERY_TO_GAME_SETUP_DB_FILTER_QUERY_CONVERTER: Symbol(
        'GameSetupUpdateQueryToGameSetupDbFilterQueryConverter',
      ),
      GAME_SETUP_UPDATE_QUERY_TO_GAME_SETUP_DB_UPDATE_QUERY_CONVERTER: Symbol(
        'GameSetupUpdateQueryToGameSetupDbUpdateQueryConverter',
      ),
    },
  },
  initializer: {
    GAME_DB_INITIALIZER: Symbol('GameDbInitializer'),
    card: {
      CARD_DB_COLLECTION_INITIALIZER: Symbol('CardDbCollectionInitializer'),
    },
    live: {
      connection: {
        LIVE_GAME_DB_CONNECTIONS_COLLECTION_INITIALIZER: Symbol(
          'LiveGameDbCollectionsInitializer',
        ),
      },
      LIVE_GAME_DB_COLLECTION_INITIALIZER: Symbol(
        'LiveGameDbCollectionInitializer',
      ),
    },
    setup: {
      GAME_SETUP_DB_COLLECTION_INITIALIZER: Symbol(
        'GameSetupDbCollectionInitializer',
      ),
    },
  },
};
