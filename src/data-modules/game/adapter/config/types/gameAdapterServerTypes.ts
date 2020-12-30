// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_SERVER_TYPES = {
  reqHandler: {
    card: {
      POST_CARD_V1_REQUEST_HANDLER: Symbol.for('PostCardV1RequestHandler'),
      POST_CARDS_SEARCHES_V1_REQUEST_HANDLER: Symbol.for(
        'PostCardsSearchesV1RequestHandler',
      ),
    },
    deck: {
      GET_CARD_DECK_BY_ID_V1_REQUEST_HANDLER: Symbol.for(
        'GetCardDeckByIdV1RequestHandler',
      ),
      POST_CARD_DECK_V1_REQUEST_HANDLER: Symbol.for(
        'PostCardDeckV1RequestHandler',
      ),
    },
    live: {
      GET_LIVE_GAME_BY_ID_V1_REQUEST_HANDLER: Symbol.for(
        'GetLiveGameByIdV1RequestHandler',
      ),
      POST_LIVE_GAME_V1_REQUEST_HANDLER: Symbol.for('PostGameV1RequestHandler'),
    },
    setup: {
      PATCH_GAME_SETUP_BY_ID_V1_REQUEST_HANDLER: Symbol.for(
        'PatchGameSetupByIdV1RequestHandler',
      ),
      POST_GAME_SETUP_V1_REQUEST_HANDLER: Symbol.for(
        'PostGameSetupV1RequestHandler',
      ),
      POST_GAME_SETUPS_SEARCHES_V1_REQUEST_HANDLER: Symbol.for(
        'PostGameSetupsSearchesV1RequestHandler',
      ),
    },
  },
  router: {
    card: {
      CARD_ROUTER: Symbol.for('CardRouter'),
    },
    deck: {
      DECK_ROUTER: Symbol.for('DeckRouter'),
    },
    live: {
      LIVE_GAME_ROUTER: Symbol.for('GameRouter'),
    },
    setup: {
      GAME_SETUP_ROUTER: Symbol.for('GameSetupRouter'),
    },
  },
};
