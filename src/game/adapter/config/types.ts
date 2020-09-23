// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_TYPES = {
  api: {
    converter: {
      GAME_TO_GAME_API_V1_CONVERTER: Symbol.for('GameToGameApiV1Converter'),
      card: {
        CARD_TO_CARD_API_V1_CONVERTER: Symbol.for('CardToCardApiV1Converter'),
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
      card: {
        CARD_CREATION_QUERY_API_V1_VALIDATOR: Symbol.for(
          'CardCreationQueryApiV1Validator',
        ),
      },
    },
  },
  db: {
    converter: {
      GAME_CREATION_QUERY_TO_GAME_DBS_CONVERTER: Symbol.for(
        'GameCreationQueryToGameDbsConverter',
      ),
      GAME_DB_TO_GAME_CONVERTER: Symbol.for('GameDbToGameConverter'),
      GAME_FIND_QUERY_TO_GAME_DB_FILTER_QUERY_CONVERTER: Symbol.for(
        'GameFindQueryToGameDbFilterQueryConverter',
      ),
      card: {
        ARTIFACT_CREATION_QUERY_TO_ARTIFACT_DBS_CONVERTER: Symbol.for(
          'ArtifactCreationQueryToArtifactDbsConverter',
        ),
        ARTIFACT_DB_TO_ARTIFACT_CONVERTER: Symbol.for(
          'ArtifactDbToArtifactConverter',
        ),
        CARD_DB_TO_CARD_CONVERTER: Symbol.for('CardDbToCardConverter'),
        CARD_FIND_QUERY_TO_CARD_DB_FILTER_QUERY_CONVERTER: Symbol.for(
          'CardFindQueryToCardDbFilterQueryConverter',
        ),
        CREATURE_CREATION_QUERY_TO_CREATURE_DBS_CONVERTER: Symbol.for(
          'CreatureCreationQueryToCreatureDbsConverter',
        ),
        CREATURE_DB_TO_CREATURE_CONVERTER: Symbol.for(
          'CreatureDbToCreatureConverter',
        ),
        ENCHANTMENT_CREATION_QUERY_TO_ENCHANTMENT_DBS_CONVERTER: Symbol.for(
          'EnchantmentCreationQueryToEnchantmentDbsConverter',
        ),
        ENCHANTMENT_DB_TO_ENCHANTMENT_CONVERTER: Symbol.for(
          'EnchantmentDbToEnchantmentConverter',
        ),
        LAND_CREATION_QUERY_TO_LAND_DBS_CONVERTER: Symbol.for(
          'LandCreationQueryToLandDbsConverter',
        ),
        LAND_DB_TO_LAND_CONVERTER: Symbol.for('LandDbToLandConverter'),
      },
    },
    model: {
      GAME_DB_MODEL: Symbol.for('gameDbModel'),
      card: {
        ARTIFACT_DB_MODEL: Symbol.for('ArtifactDbModel'),
        CARD_DB_MODEL: Symbol.for('CardDbModel'),
        CREATURE_DB_MODEL: Symbol.for('CreatureDbModel'),
        ENCHANTMENT_DB_MODEL: Symbol.for('EnchantmentDbModel'),
        LAND_DB_MODEL: Symbol.for('LandDbModel'),
      },
    },
  },
  server: {
    reqHandler: {
      GET_GAME_BY_ID_V1_REQUEST_HANDLER: Symbol.for(
        'GetGameByIdV1RequestHandler',
      ),
      POST_GAME_V1_REQUEST_HANDLER: Symbol.for('PostGameV1RequestHandler'),
    },
    router: {
      GAME_ROUTER: Symbol.for('GameRouter'),
    },
  },
  validator: {
    GAME_CREATION_QUERY_API_V1_VALIDATOR: Symbol.for(
      'GameCreationQueryApiV1Validator',
    ),
  },
};

// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_PUBLIC_TYPES = {
  server: {
    router: {
      GAME_ROUTER: GAME_ADAPTER_TYPES.server.router.GAME_ROUTER,
    },
  },
};
