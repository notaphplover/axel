import { Converter } from '../../../../../common/domain';
import { EnchantmentCreationQuery } from '../../../../domain/query/card/EnchantmentCreationQuery';
import { EnchantmentDb } from '../../model/card/EnchantmentDb';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { Model } from 'mongoose';
import { inject } from 'inversify';

export class EnchantmentCreationQueryToEnchantmentDbsConverter
  implements Converter<EnchantmentCreationQuery, EnchantmentDb[]> {
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.card.ENCHANTMENT_DB_MODEL)
    private readonly enchantmentDbModel: Model<EnchantmentDb>,
  ) {}

  public transform(input: EnchantmentCreationQuery): EnchantmentDb[] {
    return [
      new this.enchantmentDbModel({
        cost: input.cost,
        type: input.type,
      }),
    ];
  }
}
