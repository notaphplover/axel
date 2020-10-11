import { BaseCard } from '../../../../domain/model/card/BaseCard';
import { BaseCardDbToCardConverter } from './BaseCardDbToCardConverter';
import { CardType } from '../../../../domain/model/card/CardType';
import { Converter } from '../../../../../../common/domain';
import { Enchantment } from '../../../../domain/model/card/Enchantment';
import { EnchantmentDb } from '../../model/card/EnchantmentDb';
import { injectable } from 'inversify';

@injectable()
export class EnchantmentDbToEnchantmentConverter
  extends BaseCardDbToCardConverter
  implements Converter<EnchantmentDb, Enchantment> {
  public transform(input: EnchantmentDb): Enchantment {
    const baseCard: BaseCard = super.transform(input);

    return {
      cost: baseCard.cost,
      detail: baseCard.detail,
      id: baseCard.id,
      type: baseCard.type as CardType.Enchantment,
    };
  }
}
