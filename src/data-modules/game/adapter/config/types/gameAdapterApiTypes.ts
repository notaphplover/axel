// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_API_TYPES = {
  converter: {
    GAME_FORMAT_API_V1_TO_GAME_FORMAT_CONVERTER: Symbol.for(
      'GameFormatApiV1ToGameFormatConverter',
    ),
    GAME_FORMAT_TO_GAME_FORMAT_API_V1_CONVERTER: Symbol.for(
      'GameFormatToGameFormatApiV1Converter',
    ),
    GAME_TO_GAME_API_V1_CONVERTER: Symbol.for('GameToGameApiV1Converter'),
    card: {
      CARD_CREATION_QUERY_API_V1_TO_CARD_CREATION_QUERY_CONVERTER: Symbol.for(
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
    deck: {
      CARD_DECK_CREATION_QUERY_API_V1_TO_CARD_DECK_CREATION_QUERY_CONVERTER: Symbol.for(
        'CardDeckCreationQueryApiV1ToCardDeckCreationQueryConverter',
      ),
      CARD_DECK_SECTION_API_V1_TO_CARD_DECK_SECTIONS_CONVERTER: Symbol.for(
        'CardDeckSectionsApiV1ToCardDeckSectionsConverter',
      ),
      CARD_DECK_SECTION_TO_CARD_DECK_SECTIONS_API_V1_CONVERTER: Symbol.for(
        'CardDeckSectionsToCardDeckSectionsApiV1Converter',
      ),
      CARD_DECK_TO_CARD_DECK_API_V1_CONVERTER: Symbol.for(
        'CardDeckToCardDeckApiV1Converter',
      ),
      CARD_SET_REFERENCES_API_V1_TO_CARD_SET_REFERENCES_CONVERTER: Symbol.for(
        'CardSetReferencesApiV1ToCardSetReferencesConverter',
      ),
      CARD_SET_REFERENCES_TO_CARD_SET_REFERENCES_API_V1_CONVERTER: Symbol.for(
        'CardSetReferencesToCardSetReferencesApiV1Converter',
      ),
    },
    setup: {
      EXTENDED_GAME_SETUP_TO_EXTENDED_GAME_SETUP_API_V1_CONVERTER: Symbol.for(
        'ExtendedGameSetupToExtendedGameSetupApiV1Converter',
      ),
      GAME_SETUP_CREATION_QUERY_API_V1_TO_GAME_SETUP_CREATION_QUERY_CONVERTER: Symbol.for(
        'GameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter',
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
    deck: {
      CARD_DECK_CREATION_QUERY_API_V1_VALIDATOR: Symbol.for(
        'CardDeckCreationQueryApiV1Validator',
      ),
    },
    schema: {
      query: {
        card: {
          CARD_FIND_QUERY_API_V1_JOI_VALIDATOR_SCHEMA: Symbol.for(
            'cardFindQueryApiV1JoyValidatorSchema',
          ),
        },
        setup: {
          GAME_SETUP_CREATION_QUERY_API_V1_JOY_VALIDATOR_SCHEMA: Symbol.for(
            'gameSetupCreationQueryApiV1JoyValidatorSchema',
          ),
        },
      },
    },
    setup: {
      GAME_SETUP_CREATION_QUERY_API_V1_VALIDATOR: Symbol.for(
        'GameSetupCreationQueryApiV1Validator',
      ),
    },
  },
};
