// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_API_TYPES = {
  converter: {
    GAME_TO_GAME_API_V1_CONVERTER: Symbol.for('GameToGameApiV1Converter'),
    card: {
      CARD_CREATION_QUERY_API_V1_TO_CARD_CREATION_QUERY_API_CONVERTER: Symbol.for(
        'CardCreationQueryApiV1ToCardCreationQueryConverter',
      ),
      CARD_DETAIL_API_V1_TO_CARD_DETAIL_CONVERTER: Symbol.for(
        'CardDetailApiV1ToCardDetailConverter',
      ),
      CARD_DETAIL_TO_CARD_DETAIL_API_V1_CONVERTER: Symbol.for(
        'CardDetailToCardDetailV1Converter',
      ),
      CARD_FIND_QUERY_API_V1_TO_CARD_FIND_QUERY_CONVERTER: Symbol.for(
        'CardFindQueryApiV1ToCardFindQueryConverter',
      ),
      CARD_TO_CARD_API_V1_CONVERTER: Symbol.for('CardToCardApiV1Converter'),
      CARD_TYPE_API_V1_TO_CARD_TYPE_CONVERTER: Symbol.for(
        'CardTypeApiV1ToCardTypeConverter',
      ),
      CARD_TYPE_TO_CARD_TYPE_API_V1_CONVERTER: Symbol.for(
        'CardTypeToCardTypeApiV1Converter',
      ),
      RESOURCE_API_V1_TO_RESOURCE_CONVERTER: Symbol.for(
        'ResourceApiV1ToResourceConverter',
      ),
      RESOURCE_TO_RESOURCE_API_V1_CONVERTER: Symbol.for(
        'ResourceToResourceApiV1Converter',
      ),
    },
  },
  validator: {
    GAME_CREATION_QUERY_API_V1_VALIDATOR: Symbol.for(
      'GameCreationQueryApiV1Validator',
    ),
    card: {
      CARD_CREATION_QUERY_API_V1_VALIDATOR: Symbol.for(
        'CardCreationQueryApiV1Validator',
      ),
      CARD_FIND_QUERY_API_V1_VALIDATOR: Symbol.for(
        'CardFindQueryApiV1Validator',
      ),
    },
  },
};
