// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_TYPES = {
  api: {
    converter: {
      GAME_TO_GAME_API_V1_CONVERTER: Symbol.for('GameToGameApiV1Converter'),
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
