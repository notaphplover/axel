// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_SERVER_TYPES = {
  converter: {
    card: {
      POST_CARD_V1_REQUEST_TO_CARD_CREATION_QUERY_CONVERTER: Symbol(
        'PostCardV1RequestToCardCreationQueryConverter',
      ),
      POST_CARDS_SEARCHES_V1_REQUEST_TO_CARD_FIND_QUERY_CONVERTER: Symbol(
        'PostCardsSearchesV1RequestToCardFindQueryConverter',
      ),
    },
    deck: {
      GET_CARD_DECK_V1_REQUEST_TO_CARD_DECK_FIND_QUERY_CONVERTER: Symbol(
        'GetCardDeckV1RequestToCardDeckFindQueryConverter',
      ),
      POST_CARD_DECK_V1_REQUEST_TO_CARD_DECK_CREATION_QUERY_CONVERTER: Symbol(
        'PostCardDeckV1RequestToCardDeckCreationQueryConverter',
      ),
    },
    live: {
      GET_LIVE_GAME_V1_REQUEST_TO_LIVE_GAME_FIND_QUERY_CONVERTER: Symbol(
        'GetLiveGameV1RequestToLiveGameFindQueryConverter',
      ),
      POST_LIVE_GAME_V1_REQUEST_TO_LIVE_GAME_CREATION_QUERY_CONVERTER: Symbol(
        'PostLiveGameV1RequestToLiveGameCreationQueryConverter',
      ),
    },
  },
  reqHandler: {
    card: {
      POST_CARD_V1_REQUEST_HANDLER: Symbol('PostCardV1RequestHandler'),
      POST_CARDS_SEARCHES_V1_REQUEST_HANDLER: Symbol(
        'PostCardsSearchesV1RequestHandler',
      ),
    },
    deck: {
      GET_CARD_DECK_BY_ID_V1_REQUEST_HANDLER: Symbol(
        'GetCardDeckByIdV1RequestHandler',
      ),
      POST_CARD_DECK_V1_REQUEST_HANDLER: Symbol('PostCardDeckV1RequestHandler'),
    },
    live: {
      GET_LIVE_GAME_BY_ID_V1_REQUEST_HANDLER: Symbol(
        'GetLiveGameByIdV1RequestHandler',
      ),
      POST_LIVE_GAME_V1_REQUEST_HANDLER: Symbol('PostGameV1RequestHandler'),
    },
    setup: {
      PATCH_GAME_SETUP_BY_ID_V1_REQUEST_HANDLER: Symbol(
        'PatchGameSetupByIdV1RequestHandler',
      ),
      POST_GAME_SETUP_V1_REQUEST_HANDLER: Symbol(
        'PostGameSetupV1RequestHandler',
      ),
      POST_GAME_SETUPS_SEARCHES_V1_REQUEST_HANDLER: Symbol(
        'PostGameSetupsSearchesV1RequestHandler',
      ),
    },
  },
  router: {
    card: {
      CARD_ROUTER: Symbol('CardRouter'),
    },
    deck: {
      DECK_ROUTER: Symbol('DeckRouter'),
    },
    live: {
      LIVE_GAME_ROUTER: Symbol('GameRouter'),
    },
    setup: {
      GAME_SETUP_ROUTER: Symbol('GameSetupRouter'),
    },
  },
};
