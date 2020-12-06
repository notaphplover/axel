// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_DB_TYPES = {
  collection: {
    setup: {
      EXTENDED_GAME_SETUP_COLLECTION_NAME: Symbol.for(
        'ExtendedGameSetupCollectionName',
      ),
    },
  },
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
    deck: {
      CARD_DECK_CREATION_QUERY_TO_CARD_DBS_CONVERTER: Symbol.for(
        'CardDeckCreationQueryToCardDbsConverter',
      ),
      CARD_DECK_DB_TO_CARD_DECK_CONVERTER: Symbol.for(
        'CardDeckDbToCardDeckConverter',
      ),
      CARD_DECK_FIND_QUERY_TO_CARD_DECK_DB_FILTER_QUERY_CONVERTER: Symbol.for(
        'CardDeckFindQueryToCardDeckDbFilterQueryConverter ',
      ),
    },
    setup: {
      GAME_SETUP_CREATION_QUERY_TO_EXTENDED_GAME_SETUP_DBS_CONVERTER: Symbol.for(
        'GameSetupCreationQueryToExtendedGameSetupDbsConverter',
      ),
      GAME_SETUP_FIND_QUERY_TO_EXTENDED_GAME_SETUP_DB_FILTER_QUERY_CONVERTER: Symbol.for(
        'ExtendedGameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter',
      ),
      GAME_SETUP_UPDATE_QUERY_TO_EXTENDED_GAME_SETUP_DB_FILTER_QUERY_CONVERTER: Symbol.for(
        'GameSetupUpdateQueryToExtendedGameSetupDbFilterQueryConverter',
      ),
      GAME_SETUP_UPDATE_QUERY_TO_EXTENDED_GAME_SETUP_DB_UPDATE_QUERY_CONVERTER: Symbol.for(
        'GameSetupUpdateQueryToExtendedGameSetupDbUpdateQueryConverter',
      ),
      EXTENDED_GAME_SETUP_DB_TO_BASIC_GAME_SETUP_CONVERTER: Symbol.for(
        'ExtendedGameSetupDbToBasicGameSetupConverter',
      ),
      EXTENDED_GAME_SETUP_DB_TO_EXTENDED_GAME_SETUP_CONVERTER: Symbol.for(
        'ExtendedGameSetupDbToExtendedGameSetupConverter',
      ),
    },
  },
  initializer: {
    setup: {
      EXTENDED_GAME_SETUP_DB_COLLECTION_INITIALIZER: Symbol.for(
        'ExtendedGameSetupDbCollectionInitializer',
      ),
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
    deck: {
      CARD_DECK_DB_MODEL: Symbol.for('CardDeckDbModel'),
    },
    setup: {
      EXTENDED_GAME_SETUP_DB_MODEL: Symbol.for('ExtendedGameSetupDbModel'),
    },
  },
};
