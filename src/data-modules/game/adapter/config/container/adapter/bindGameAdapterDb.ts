import { ArtifactCreationQueryToArtifactDbsConverter } from '../../../db/converter/card/ArtifactCreationQueryToArtifactDbsConverter';
import { ArtifactDbToArtifactConverter } from '../../../db/converter/card/ArtifactDbToArtifactConverter';
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
import { GAME_ADAPTER_TYPES } from '../../types';
import { GameDbCollectionName } from '../../../db/GameDbCollection';
import { GameDbInitializer } from '../../../db/initializer/GameDbInitializer';
import { GameSetupCreationQueryToGameSetupDbsConverter } from '../../../db/converter/setup/GameSetupCreationQueryToGameSetupDbsConverter';
import { GameSetupDbCollectionInitializer } from '../../../db/initializer/setup/GameSetupDbCollectionInitializer';
import { GameSetupDbToGameSetupConverter } from '../../../db/converter/setup/GameSetupDbToGameSetupConverter';
import { GameSetupFindQueryToGameSetupDbFilterQueryConverter } from '../../../db/converter/setup/GameSetupFindQueryToGameSetupDbFilterQueryConverter';
import { GameSetupUpdateQueryToGameSetupDbFilterQueryConverter } from '../../../db/converter/setup/GameSetupUpdateQueryToGameSetupDbFilterQueryConverter';
import { GameSetupUpdateQueryToGameSetupDbUpdateQueryConverter } from '../../../db/converter/setup/GameSetupUpdateQueryToGameSetupDbUpdateQueryConverter';
import { LandCreationQueryToLandDbsConverter } from '../../../db/converter/card/LandCreationQueryToLandDbsConverter';
import { LandDbToLandConverter } from '../../../db/converter/card/LandDbToLandConverter';
import { LiveGameCreationQueryToLiveGameDbsConverter } from '../../../db/converter/live/LiveGameCreationQueryToLiveGameDbsConverter';
import { LiveGameDbToLiveGameConverter } from '../../../db/converter/live/GameDbToLiveGameConverter';
import { LiveGameFindQueryToLiveGameDbFilterQueryConverter } from '../../../db/converter/live/LiveGameFindQueryToLiveGameDbFilterQueryConverter';
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
    GAME_ADAPTER_TYPES.db.collection.setup.GAME_SETUP_COLLECTION_NAME,
  ).toConstantValue(GameDbCollectionName.GameSetup);

  bind(
    GAME_ADAPTER_TYPES.db.converter.live.LIVE_GAME_DB_TO_LIVE_GAME_CONVERTER,
  ).to(LiveGameDbToLiveGameConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.live
      .LIVE_GAME_FIND_QUERY_TO_LIVE_GAME_DB_FILTER_QUERY_CONVERTER,
  ).to(LiveGameFindQueryToLiveGameDbFilterQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.live
      .LIVE_GAME_CREATION_QUERY_TO_LIVE_GAME_DBS_CONVERTER,
  ).to(LiveGameCreationQueryToLiveGameDbsConverter);
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
      .GAME_SETUP_CREATION_QUERY_TO_GAME_SETUP_DBS_CONVERTER,
  ).to(GameSetupCreationQueryToGameSetupDbsConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.setup.GAME_SETUP_DB_TO_GAME_SETUP_CONVERTER,
  ).to(GameSetupDbToGameSetupConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.setup
      .GAME_SETUP_FIND_QUERY_TO_GAME_SETUP_DB_FILTER_QUERY_CONVERTER,
  ).to(GameSetupFindQueryToGameSetupDbFilterQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.setup
      .GAME_SETUP_UPDATE_QUERY_TO_GAME_SETUP_DB_FILTER_QUERY_CONVERTER,
  ).to(GameSetupUpdateQueryToGameSetupDbFilterQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.setup
      .GAME_SETUP_UPDATE_QUERY_TO_GAME_SETUP_DB_UPDATE_QUERY_CONVERTER,
  ).to(GameSetupUpdateQueryToGameSetupDbUpdateQueryConverter);

  bind(GAME_ADAPTER_TYPES.db.initializer.GAME_DB_INITIALIZER).to(
    GameDbInitializer,
  );
  bind(
    GAME_ADAPTER_TYPES.db.initializer.card.CARD_DB_COLLECTION_INITIALIZER,
  ).to(CardDbCollectionInitializer);
  bind(
    GAME_ADAPTER_TYPES.db.initializer.setup
      .GAME_SETUP_DB_COLLECTION_INITIALIZER,
  ).to(GameSetupDbCollectionInitializer);
}
