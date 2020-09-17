import { Converter } from '../../../../../common/domain';
import { EnchantmentCreationQuery } from '../../../../domain/query/card/EnchantmentCreationQuery';
import { EnchantmentDb } from '../../model/card/EnchantmentDb';

export abstract class EnchantmentCreationQueryToEnchantmentDbsConverter
  implements Converter<EnchantmentCreationQuery, EnchantmentDb[]> {
  public abstract transform(input: EnchantmentCreationQuery): EnchantmentDb[];
}
