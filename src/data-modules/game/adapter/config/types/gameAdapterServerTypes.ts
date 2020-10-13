// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_SERVER_TYPES = {
  reqHandler: {
    GET_GAME_BY_ID_V1_REQUEST_HANDLER: Symbol.for(
      'GetGameByIdV1RequestHandler',
    ),
    POST_GAME_V1_REQUEST_HANDLER: Symbol.for('PostGameV1RequestHandler'),
    card: {
      GET_CARDS_V1_REQUEST_HANDLER: Symbol.for('GetCardsV1RequestHandler'),
      POST_CARD_V1_REQUEST_HANDLER: Symbol.for('PostCardV1RequestHandler'),
    },
    deck: {
      GET_CARD_DECK_BY_ID_V1_REQUEST_HANDLER: Symbol.for(
        'GetCardDeckByIdV1RequestHandler',
      ),
      POST_CARD_DECK_V1_REQUEST_HANDLER: Symbol.for(
        'PostCardDeckV1RequestHandler',
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
  },
};
