import { injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { BaseCard } from '../../../../domain/model/card/BaseCard';
import { CardType } from '../../../../domain/model/card/CardType';
import { Enchantment } from '../../../../domain/model/card/Enchantment';
import { EnchantmentDb } from '../../model/card/EnchantmentDb';
import { BaseCardDbToCardConverter } from './BaseCardDbToCardConverter';

@injectable()
export class EnchantmentDbToEnchantmentConverter
  extends BaseCardDbToCardConverter<EnchantmentDb, Enchantment>
  implements Converter<EnchantmentDb, Enchantment> {
  public transform(input: EnchantmentDb): Enchantment {
    const baseCard: BaseCard = this.innerTransform(input);

    return {
      cost: baseCard.cost,
      detail: baseCard.detail,
      id: baseCard.id,
      subtypes: baseCard.subtypes,
      supertypes: baseCard.supertypes,
      type: baseCard.type as CardType.Enchantment,
    };
  }
}
