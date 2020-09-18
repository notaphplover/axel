import { inject, injectable } from 'inversify';
import { Artifact } from '../../../../domain/model/card/Artifact';
import { ArtifactDb } from '../../model/card/ArtifactDb';
import { Card } from '../../../../domain/model/card/Card';
import { CardDb } from '../../model/card/CardDb';
import { CardType } from '../../../../domain/model/card/CardType';
import { Converter } from '../../../../../common/domain';
import { Creature } from '../../../../domain/model/card/Creature';
import { CreatureDb } from '../../model/card/CreatureDb';
import { Enchantment } from '../../../../domain/model/card/Enchantment';
import { EnchantmentDb } from '../../model/card/EnchantmentDb';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { Land } from '../../../../domain/model/card/Land';
import { LandDb } from '../../model/card/LandDb';

@injectable()
export class CardDbToCardConverter implements Converter<CardDb, Card> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card.ARTIFACT_DB_TO_ARTIFACT_CONVERTER,
    )
    private readonly artifactDbToArtifactConverter: Converter<
      ArtifactDb,
      Artifact
    >,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card.CREATURE_DB_TO_CREATURE_CONVERTER,
    )
    private readonly creatureDbToCreatureConverter: Converter<
      CreatureDb,
      Creature
    >,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card
        .ENCHANTMENT_DB_TO_ENCHANTMENT_CONVERTER,
    )
    private readonly enchantmentDbToEnchantmentConverter: Converter<
      EnchantmentDb,
      Enchantment
    >,
    @inject(GAME_ADAPTER_TYPES.db.converter.card.LAND_DB_TO_LAND_CONVERTER)
    private readonly landDbToLandConverter: Converter<LandDb, Land>,
  ) {}

  public transform(input: CardDb): Card {
    switch (input.type) {
      case CardType.Artifact:
        return this.artifactDbToArtifactConverter.transform(
          input as ArtifactDb,
        );
      case CardType.Creature:
        return this.creatureDbToCreatureConverter.transform(
          input as CreatureDb,
        );
      case CardType.Enchantment:
        return this.enchantmentDbToEnchantmentConverter.transform(
          input as EnchantmentDb,
        );
      case CardType.Land:
        return this.landDbToLandConverter.transform(input as LandDb);
      default:
        throw new Error('Unexpected card type');
    }
  }
}
