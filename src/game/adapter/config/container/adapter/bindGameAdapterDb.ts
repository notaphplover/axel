import { ArtifactCreationQueryToArtifactDbsConverter } from '../../../db/converter/card/ArtifactCreationQueryToArtifactDbsConverter';
import { ArtifactDbToArtifactConverter } from '../../../db/converter/card/ArtifactDbToArtifactConverter';
import { CardDbToCardConverter } from '../../../db/converter/card/CardDbToCardConverter';
import { CardDeckCreationQueryToCardDeckDbsConverter } from '../../../db/converter/card/CardDeckCreationQueryToCardDeckDbsConverter';
import { CardDeckDbToCardDeckConverter } from '../../../db/converter/card/CardDeckDbToCardDeckConverter';
import { CardDeckFindQueryToCardDeckDbFilterQueryConverter } from '../../../db/converter/card/CardDeckFindQueryToCardDeckDbFilterQueryConverter';
import { CardFindQueryToCardDbFilterQueryConverter } from '../../../db/converter/card/CardFindQueryToCardDbFilterQueryConverter';
import { CreatureCreationQueryToCreatureDbsConverter } from '../../../db/converter/card/CreatureCreationQueryToCreatureDbsConverter';
import { CreatureDbToCreatureConverter } from '../../../db/converter/card/CreatureDbToCreatureConverter';
import { EnchantmentCreationQueryToEnchantmentDbsConverter } from '../../../db/converter/card/EnchantmentCreationQueryToEnchantmentDbsConverter';
import { EnchantmentDbToEnchantmentConverter } from '../../../db/converter/card/EnchantmentDbToEnchantmentConverter';
import { GAME_ADAPTER_TYPES } from '../../types';
import { GameCreationQueryToGameDbsConverter } from '../../../db/converter/GameCreationQueryToGameDbsConverter';
import { GameDbToGameConverter } from '../../../db/converter/GameDbToGameConverter';
import { GameFindQueryToGameDbFilterQueryConverter } from '../../../db/converter/GameFindQueryToGameDbFilterQueryConverter';
import { LandCreationQueryToLandDbsConverter } from '../../../db/converter/card/LandCreationQueryToLandDbsConverter';
import { LandDbToLandConverter } from '../../../db/converter/card/LandDbToLandConverter';
import { artifactDbModel } from '../../../db/model/card/ArtifactDb';
import { cardDbModel } from '../../../db/model/card/CardDb';
import { cardDeckDbModel } from '../../../db/model/card/CardDeckDb';
import { creatureDbModel } from '../../../db/model/card/CreatureDb';
import { enchantmentDbModel } from '../../../db/model/card/EnchantmentDb';
import { gameDbModel } from '../../../db/model/GameDb';
import { interfaces } from 'inversify';
import { landDbModel } from '../../../db/model/card/LandDb';

export function bindGameAdapterDb(bind: interfaces.Bind): void {
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
      .CARD_DECK_CREATION_QUERY_TO_CARD_DBS_CONVERTER,
  ).to(CardDeckCreationQueryToCardDeckDbsConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.card.CARD_DECK_DB_TO_CARD_DECK_CONVERTER,
  ).to(CardDeckDbToCardDeckConverter);
  bind(
    GAME_ADAPTER_TYPES.db.converter.card
      .CARD_DECK_FIND_QUERY_TO_CARD_DECK_DB_FILTER_QUERY_CONVERTER,
  ).to(CardDeckFindQueryToCardDeckDbFilterQueryConverter);
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

  bind(GAME_ADAPTER_TYPES.db.model.GAME_DB_MODEL).toConstantValue(gameDbModel);
  bind(GAME_ADAPTER_TYPES.db.model.card.ARTIFACT_DB_MODEL).toConstantValue(
    artifactDbModel,
  );
  bind(GAME_ADAPTER_TYPES.db.model.card.CARD_DB_MODEL).toConstantValue(
    cardDbModel,
  );
  bind(GAME_ADAPTER_TYPES.db.model.card.CARD_DECK_DB_MODEL).toConstantValue(
    cardDeckDbModel,
  );
  bind(GAME_ADAPTER_TYPES.db.model.card.CREATURE_DB_MODEL).toConstantValue(
    creatureDbModel,
  );
  bind(GAME_ADAPTER_TYPES.db.model.card.ENCHANTMENT_DB_MODEL).toConstantValue(
    enchantmentDbModel,
  );

  bind(GAME_ADAPTER_TYPES.db.model.card.LAND_DB_MODEL).toConstantValue(
    landDbModel,
  );
}
