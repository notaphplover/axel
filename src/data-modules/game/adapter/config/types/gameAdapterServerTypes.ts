// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_SERVER_TYPES = {
  reqHandler: {
    GET_GAME_BY_ID_V1_REQUEST_HANDLER: Symbol.for(
      'GetGameByIdV1RequestHandler',
    ),
    POST_GAME_V1_REQUEST_HANDLER: Symbol.for('PostGameV1RequestHandler'),
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
    GAME_ROUTER: Symbol.for('GameRouter'),
    card: {
      CARD_ROUTER: Symbol.for('CardRouter'),
    },
    deck: {
      DECK_ROUTER: Symbol.for('DeckRouter'),
    },
    setup: {
      GAME_SETUP_ROUTER: Symbol.for('GameSetupRouter'),
    },
  },
};
