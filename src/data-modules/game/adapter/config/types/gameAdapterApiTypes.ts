// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_API_TYPES = {
  converter: {
    GAME_FORMAT_API_V1_TO_GAME_FORMAT_CONVERTER: Symbol(
      'GameFormatApiV1ToGameFormatConverter',
    ),
    GAME_FORMAT_TO_GAME_FORMAT_API_V1_CONVERTER: Symbol(
      'GameFormatToGameFormatApiV1Converter',
    ),
    card: {
      CARD_CREATION_QUERY_API_V1_TO_CARD_CREATION_QUERY_CONVERTER: Symbol(
        'CardCreationQueryApiV1ToCardCreationQueryConverter',
      ),
      CARD_DETAIL_API_V1_TO_CARD_DETAIL_CONVERTER: Symbol(
        'CardDetailApiV1ToCardDetailConverter',
      ),
      CARD_DETAIL_TO_CARD_DETAIL_API_V1_CONVERTER: Symbol(
        'CardDetailToCardDetailV1Converter',
      ),
      CARD_FIND_QUERY_API_V1_TO_CARD_FIND_QUERY_CONVERTER: Symbol(
        'CardFindQueryApiV1ToCardFindQueryConverter',
      ),
      CARD_TO_CARD_API_V1_CONVERTER: Symbol('CardToCardApiV1Converter'),
      CARD_TYPE_API_V1_TO_CARD_TYPE_CONVERTER: Symbol(
        'CardTypeApiV1ToCardTypeConverter',
      ),
      CARD_TYPE_TO_CARD_TYPE_API_V1_CONVERTER: Symbol(
        'CardTypeToCardTypeApiV1Converter',
      ),
      RESOURCE_API_V1_TO_RESOURCE_CONVERTER: Symbol(
        'ResourceApiV1ToResourceConverter',
      ),
      RESOURCE_TO_RESOURCE_API_V1_CONVERTER: Symbol(
        'ResourceToResourceApiV1Converter',
      ),
    },
    deck: {
      CARD_DECK_CREATION_QUERY_API_V1_TO_CARD_DECK_CREATION_QUERY_CONVERTER: Symbol(
        'CardDeckCreationQueryApiV1ToCardDeckCreationQueryConverter',
      ),
      CARD_DECK_FIND_QUERY_API_V1_TO_CARD_DECK_FIND_QUERY_CONVERTER: Symbol(
        'CardDeckFindQueryApiV1ToCardDeckFindQueryConverter',
      ),
      CARD_DECK_SECTION_API_V1_TO_CARD_DECK_SECTIONS_CONVERTER: Symbol(
        'CardDeckSectionsApiV1ToCardDeckSectionsConverter',
      ),
      CARD_DECK_SECTION_TO_CARD_DECK_SECTIONS_API_V1_CONVERTER: Symbol(
        'CardDeckSectionsToCardDeckSectionsApiV1Converter',
      ),
      CARD_DECK_TO_CARD_DECK_API_V1_CONVERTER: Symbol(
        'CardDeckToCardDeckApiV1Converter',
      ),
      CARD_SET_REFERENCES_API_V1_TO_CARD_SET_REFERENCES_CONVERTER: Symbol(
        'CardSetReferencesApiV1ToCardSetReferencesConverter',
      ),
      CARD_SET_REFERENCES_TO_CARD_SET_REFERENCES_API_V1_CONVERTER: Symbol(
        'CardSetReferencesToCardSetReferencesApiV1Converter',
      ),
    },
    live: {
      LIVE_GAME_CREATION_QUERY_API_V1_TO_LIVE_GAME_CREATION_QUERY_CONVERTER: Symbol(
        'LiveGameCreationQueryApiV1ToLiveGameCreationQueryConverter',
      ),
      LIVE_GAME_FIND_QUERY_API_V1_TO_LIVE_GAME_FIND_QUERY_CONVERTER: Symbol(
        'LiveGameFindQueryApiV1ToLiveGameFindQueryConverter',
      ),
      LIVE_GAME_TO_LIVE_GAME_API_V1_CONVERTER: Symbol(
        'LiveGameToGameApiV1Converter',
      ),
    },
    setup: {
      GAME_SETUP_TO_BASIC_GAME_SETUP_API_V1_CONVERTER: Symbol(
        'GameSetupToBasicGameSetupApiV1Converter',
      ),
      GAME_SETUP_TO_EXTENDED_GAME_SETUP_API_V1_CONVERTER: Symbol(
        'GameSetupToExtendedGameSetupApiV1Converter',
      ),
      GAME_SETUP_CREATION_QUERY_API_V1_TO_GAME_SETUP_CREATION_QUERY_CONVERTER: Symbol(
        'GameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter',
      ),
      GAME_SETUP_FIND_QUERY_API_V1_TO_GAME_SETUP_FIND_QUERY_CONVERTER: Symbol(
        'GameSetupFindQueryApiV1ToGameSetupFindQueryConverter',
      ),
      GAME_SETUP_FIND_QUERY_PLAYER_SETUP_API_V1_TO_GAME_SETUP_FIND_QUERY_PLAYER_SETUP_CONVERTER: Symbol(
        'GameSetupFindQueryPlayerSetupApiV1ToGameSetupFindQueryPlayerSetupConverter',
      ),
      GAME_SETUP_UPDATE_QUERY_ADDITIONAL_PLAYER_SETUP_API_V1_ARRAY_TO_PLAYER_SETUP_ARRAY_CONVERTER: Symbol(
        'GameSetupUpdateQueryAdditionalPlayerSetupApiV1ArrayToPlayerSetupArrayConverter',
      ),
      GAME_SETUP_UPDATE_QUERY_API_V1_TO_GAME_SETUP_UPDATE_QUERY_CONVERTER: Symbol(
        'GameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter',
      ),
      PLAYER_REFERENCE_API_V1_TO_PLAYER_REFERENCE_CONVERTER: Symbol(
        'PlayerReferenceApiV1ToPlayerReferenceConverter',
      ),
    },
  },
  validator: {
    card: {
      CARD_CREATION_QUERY_API_V1_VALIDATOR: Symbol(
        'CardCreationQueryApiV1Validator',
      ),
      CARD_FIND_QUERY_API_V1_VALIDATOR: Symbol('CardFindQueryApiV1Validator'),
    },
    deck: {
      CARD_DECK_CREATION_QUERY_API_V1_VALIDATOR: Symbol(
        'CardDeckCreationQueryApiV1Validator',
      ),
      CARD_DECK_FIND_QUERY_API_V1_VALIDATOR: Symbol(
        'CardDeckFindQueryApiV1Validator',
      ),
    },
    live: {
      LIVE_GAME_CREATION_QUERY_API_V1_SEMANTIC_VALIDATOR: Symbol.for(
        'LiveGameCreationQueryApiV1SemanticValidator',
      ),
      LIVE_GAME_CREATION_QUERY_API_V1_VALIDATOR: Symbol(
        'LiveGameCreationQueryApiV1Validator',
      ),
    },
    schema: {
      query: {
        card: {
          CARD_CREATION_QUERY_API_V1_JOI_VALIDATOR_SCHEMA: Symbol(
            'cardCreationQueryApiV1JoiValidatorSchema',
          ),
          CARD_FIND_QUERY_API_V1_JOI_VALIDATOR_SCHEMA: Symbol(
            'cardFindQueryApiV1JoiValidatorSchema',
          ),
        },
        deck: {
          CARD_DECK_CREATION_QUERY_API_V1_JOI_VALIDATOR_SCHEMA: Symbol(
            'cardDeckCreationQueryApiV1JoiValidatorSchema',
          ),
          CARD_DECK_FIND_QUERY_API_V1_JOI_VALIDATOR_SCHEMA: Symbol(
            'cardDeckFindQueryApiV1JoiValidatorSchema',
          ),
        },
        setup: {
          GAME_SETUP_CREATION_QUERY_API_V1_JOY_VALIDATOR_SCHEMA: Symbol(
            'gameSetupCreationQueryApiV1JoiValidatorSchema',
          ),
          GAME_SETUP_FIND_QUERY_API_V1_JOY_VALIDATOR_SCHEMA: Symbol(
            'gameSetupFindQueryApiV1JoiValidatorSchema',
          ),
          GAME_SETUP_UPDATE_QUERY_API_V1_JOY_VALIDATOR_SCHEMA: Symbol(
            'gameSetupUpdateQueryApiV1JoiValidatorSchema',
          ),
        },
        GAME_CREATION_QUERY_API_V1_JOY_VALIDATOR_SCHEMA: Symbol(
          'gameCreationQueryApiV1JoiValidatorSchema',
        ),
      },
    },
    setup: {
      GAME_SETUP_CREATION_QUERY_API_V1_CONTEXT_BASED_VALIDATOR: Symbol(
        'GameSetupCreationQueryApiV1ContextBasedValidator',
      ),
      GAME_SETUP_CREATION_QUERY_API_V1_VALIDATOR: Symbol(
        'GameSetupCreationQueryApiV1Validator',
      ),
      GAME_SETUP_FIND_QUERY_API_V1_VALIDATOR: Symbol(
        'GameSetupFindQueryApiV1Validator',
      ),
      GAME_SETUP_UPDATE_QUERY_API_V1_CONTEXT_BASED_VALIDATOR: Symbol(
        'GameSetupUpdateQueryApiV1ContextBasedValidator',
      ),
      GAME_SETUP_UPDATE_QUERY_API_V1_VALIDATOR: Symbol(
        'GameSetupUpdateQueryApiV1Validator',
      ),
    },
  },
};
