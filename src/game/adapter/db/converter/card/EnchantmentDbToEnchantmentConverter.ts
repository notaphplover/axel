import { Converter } from '../../../../../common/domain';
import { Enchantment } from '../../../../domain/model/card/Enchantment';
import { EnchantmentDb } from '../../model/card/EnchantmentDb';
import { injectable } from 'inversify';

@injectable()
export class EnchantmentDbToEnchantmentConverter
  implements Converter<EnchantmentDb, Enchantment> {
  public transform(input: EnchantmentDb): Enchantment {
    return {
      cost: input.cost,
      id: input._id.toHexString(),
      type: input.type,
    };
  }
}
