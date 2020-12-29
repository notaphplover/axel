// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_DB_TYPES = {
  collection: {
    GAME_COLLECTION_NAME: Symbol.for('GameCollectionName'),
    card: {
      CARD_COLLECTION_NAME: Symbol.for('CardCollectionName'),
    },
    deck: {
      DECK_COLLECTION_NAME: Symbol.for('DeckCollectionName'),
    },
    setup: {
      GAME_SETUP_COLLECTION_NAME: Symbol.for('GameSetupCollectionName'),
    },
  },
  converter: {
    GAME_CREATION_QUERY_TO_GAME_DBS_CONVERTER: Symbol.for(
      'GameCreationQueryToGameDbsConverter',
    ),
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
    live: {
      GAME_DB_TO_LIVE_GAME_CONVERTER: Symbol.for('GameDbToGameConverter'),
    },
    setup: {
      GAME_SETUP_DB_TO_GAME_SETUP_CONVERTER: Symbol.for(
        'GameSetupDbToGameSetupConverter',
      ),
      GAME_SETUP_CREATION_QUERY_TO_GAME_SETUP_DBS_CONVERTER: Symbol.for(
        'GameSetupCreationQueryToGameSetupDbsConverter',
      ),
      GAME_SETUP_FIND_QUERY_TO_GAME_SETUP_DB_FILTER_QUERY_CONVERTER: Symbol.for(
        'GameSetupFindQueryToGameSetupDbFilterQueryConverter',
      ),
      GAME_SETUP_UPDATE_QUERY_TO_GAME_SETUP_DB_FILTER_QUERY_CONVERTER: Symbol.for(
        'GameSetupUpdateQueryToGameSetupDbFilterQueryConverter',
      ),
      GAME_SETUP_UPDATE_QUERY_TO_GAME_SETUP_DB_UPDATE_QUERY_CONVERTER: Symbol.for(
        'GameSetupUpdateQueryToGameSetupDbUpdateQueryConverter',
      ),
    },
  },
  initializer: {
    GAME_DB_INITIALIZER: Symbol.for('GameDbInitializer'),
    card: {
      CARD_DB_COLLECTION_INITIALIZER: Symbol.for('CardDbCollectionInitializer'),
    },
    setup: {
      GAME_SETUP_DB_COLLECTION_INITIALIZER: Symbol.for(
        'GameSetupDbCollectionInitializer',
      ),
    },
  },
};
