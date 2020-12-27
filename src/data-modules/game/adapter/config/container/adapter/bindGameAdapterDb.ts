import { ArtifactCreationQueryToArtifactDbsConverter } from '../../../db/converter/card/ArtifactCreationQueryToArtifactDbsConverter';
import { ArtifactDbToArtifactConverter } from '../../../db/converter/card/ArtifactDbToArtifactConverter';
import { BasicGameSetupDbToBasicGameSetupConverter } from '../../../db/converter/setup/BasicGameSetupDbToBasicGameSetupConverter';
import { CardDbCollectionInitializer } from '../../../db/initializer/card/CardDbCollectionInitializer';
import { CardDbToCardConverter } from '../../../db/converter/card/CardDbToCardConverter';
import { CardDeckCreationQueryToCardDeckDbsConverter } from '../../../db/converter/deck/CardDeckCreationQueryToCardDeckDbsConverter';
import { CardDeckDbToCardDeckConverter } from '../../../db/converter/deck/CardDeckDbToCardDeckConverter';
import { CardDeckFindQueryToCardDeckDbFilterQueryConverter } from '../../../db/converter/deck/CardDeckFindQueryToCardDeckDbFilterQueryConverter';
import { CardFindQueryToCardDbFilterQueryConverter } from '../../../db/converter/card/CardFindQueryToCardDbFilterQueryConverter';
import { CreatureCreationQueryToCreatureDbsConverter } from '../../../db/converter/card/CreatureCreationQueryToCreatureDbsConverter';
import { CreatureDbToCreatureConverter } from '../../../db/converter/card/CreatureDbToCreatureConverter';
import { EnchantmentCreationQueryToEnchantmentDbsConverter } from '../../../db/converter/card/EnchantmentCreationQueryToEnchantmentDbsConverter';
import { EnchantmentDbToEnchantmentConverter } from '../../../db/converter/card/EnchantmentDbToEnchantmentConverter';
import { ExtendedGameSetupCreationQueryToExtendedGameSetupDbsConverter } from '../../../db/converter/setup/GameSetupCreationQueryToExtendedGameSetupDbsConverter';
import { ExtendedGameSetupDbCollectionInitializer } from '../../../db/initializer/setup/ExtendedGameSetupDbCollectionInitializer';
import { ExtendedGameSetupDbToExtendedGameSetupConverter } from '../../../db/converter/setup/ExtendedGameSetupDbToExtendedGameSetupConverter';
import { GAME_ADAPTER_TYPES } from '../../types';
import { GameCreationQueryToGameDbsConverter } from '../../../db/converter/GameCreationQueryToGameDbsConverter';
import { GameDbCollectionName } from '../../../db/GameDbCollection';
import { GameDbInitializer } from '../../../db/initializer/GameDbInitializer';
import { GameDbToGameConverter } from '../../../db/converter/GameDbToGameConverter';
import { GameFindQueryToGameDbFilterQueryConverter } from '../../../db/converter/GameFindQueryToGameDbFilterQueryConverter';
import { GameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter } from '../../../db/converter/setup/GameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter';
import { GameSetupUpdateQueryToExtendedGameSetupDbFilterQueryConverter } from '../../../db/converter/setup/GameSetupUpdateQueryToExtendedGameSetupDbFilterQueryConverter';
import { GameSetupUpdateQueryToExtendedGameSetupDbUpdateQueryConverter } from '../../../db/converter/setup/GameSetupUpdateQueryToExtendedGameSetupDbUpdateQueryConverter';
import { LandCreationQueryToLandDbsConverter } from '../../../db/converter/card/LandCreationQueryToLandDbsConverter';
import { LandDbToLandConverter } from '../../../db/converter/card/LandDbToLandConverter';
import { interfaces } from 'inversify';

export function bindGameAdapterDb(bind: interfaces.Bind): void {
  bind(GAME_ADAPTER_TYPES.db.collection.GAME_COLLECTION_NAME).toConstantValue(
    GameDbCollectionName.Game,
  );
  bind(
    GAME_ADAPTER_TYPES.db.collection.card.CARD_COLLECTION_NAME,
  ).toConstantValue(GameDbCollectionName.Card);
  bind(
    GAME_ADAPTER_TYPES.db.collection.deck.DECK_COLLECTION_NAME,
  ).toConstantValue(GameDbCollectionName.CardDeck);
  bind(
    GAME_ADAPTER_TYPES.db.collection.setup.EXTENDED_GAME_SETUP_COLLECTION_NAME,
  ).toConstantValue(GameDbCollectionName.ExtendedGameSetup);

  bind(GAME_ADAPTER_TYPES.db.converter.GAME_DB_TO_GAME_CONVERTER).to(
    GameDbToGameConverter,
  );
  bind(
    GAME_ADAPTER_TYPES.db.converter
      .GAME_FIND_QUERY_TO_GAME_DB_FILTER_QUERY_CONVERTER,
  ).to(GameFindQueryToGameDbFilterQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.GAME_CREATION_QUERY_TO_GAME_DBS_CONVERTER,
  ).to(GameCreationQueryToGameDbsConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.card
      .ARTIFACT_CREATION_QUERY_TO_ARTIFACT_DBS_CONVERTER,
  ).to(ArtifactCreationQueryToArtifactDbsConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.card.ARTIFACT_DB_TO_ARTIFACT_CONVERTER,
  ).to(ArtifactDbToArtifactConverter);
  bind(GAME_ADAPTER_TYPES.db.converter.card.CARD_DB_TO_CARD_CONVERTER).to(
    CardDbToCardConverter,
  );
  bind(
    GAME_ADAPTER_TYPES.db.converter.card
      .CARD_FIND_QUERY_TO_CARD_DB_FILTER_QUERY_CONVERTER,
  ).to(CardFindQueryToCardDbFilterQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.card
      .CREATURE_CREATION_QUERY_TO_CREATURE_DBS_CONVERTER,
  ).to(CreatureCreationQueryToCreatureDbsConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.card.CREATURE_DB_TO_CREATURE_CONVERTER,
  ).to(CreatureDbToCreatureConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.card
      .ENCHANTMENT_CREATION_QUERY_TO_ENCHANTMENT_DBS_CONVERTER,
  ).to(EnchantmentCreationQueryToEnchantmentDbsConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.card
      .ENCHANTMENT_DB_TO_ENCHANTMENT_CONVERTER,
  ).to(EnchantmentDbToEnchantmentConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.card
      .LAND_CREATION_QUERY_TO_LAND_DBS_CONVERTER,
  ).to(LandCreationQueryToLandDbsConverter);
  bind(GAME_ADAPTER_TYPES.db.converter.card.LAND_DB_TO_LAND_CONVERTER).to(
    LandDbToLandConverter,
  );

  bind(
    GAME_ADAPTER_TYPES.db.converter.deck
      .CARD_DECK_CREATION_QUERY_TO_CARD_DBS_CONVERTER,
  ).to(CardDeckCreationQueryToCardDeckDbsConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.deck.CARD_DECK_DB_TO_CARD_DECK_CONVERTER,
  ).to(CardDeckDbToCardDeckConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.deck
      .CARD_DECK_FIND_QUERY_TO_CARD_DECK_DB_FILTER_QUERY_CONVERTER,
  ).to(CardDeckFindQueryToCardDeckDbFilterQueryConverter);

  bind(
    GAME_ADAPTER_TYPES.db.converter.setup
      .GAME_SETUP_CREATION_QUERY_TO_EXTENDED_GAME_SETUP_DBS_CONVERTER,
  ).to(ExtendedGameSetupCreationQueryToExtendedGameSetupDbsConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.setup
      .BASIC_GAME_SETUP_DB_TO_BASIC_GAME_SETUP_CONVERTER,
  ).to(BasicGameSetupDbToBasicGameSetupConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.setup
      .EXTENDED_GAME_SETUP_DB_TO_EXTENDED_GAME_SETUP_CONVERTER,
  ).to(ExtendedGameSetupDbToExtendedGameSetupConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.setup
      .GAME_SETUP_FIND_QUERY_TO_EXTENDED_GAME_SETUP_DB_FILTER_QUERY_CONVERTER,
  ).to(GameSetupFindQueryToExtendedGameSetupDbFilterQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.setup
      .GAME_SETUP_UPDATE_QUERY_TO_EXTENDED_GAME_SETUP_DB_FILTER_QUERY_CONVERTER,
  ).to(GameSetupUpdateQueryToExtendedGameSetupDbFilterQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.setup
      .GAME_SETUP_UPDATE_QUERY_TO_EXTENDED_GAME_SETUP_DB_UPDATE_QUERY_CONVERTER,
  ).to(GameSetupUpdateQueryToExtendedGameSetupDbUpdateQueryConverter);

  bind(GAME_ADAPTER_TYPES.db.initializer.GAME_DB_INITIALIZER).to(
    GameDbInitializer,
  );
  bind(
    GAME_ADAPTER_TYPES.db.initializer.card.CARD_DB_COLLECTION_INITIALIZER,
  ).to(CardDbCollectionInitializer);
  bind(
    GAME_ADAPTER_TYPES.db.initializer.setup
      .EXTENDED_GAME_SETUP_DB_COLLECTION_INITIALIZER,
  ).to(ExtendedGameSetupDbCollectionInitializer);
}
