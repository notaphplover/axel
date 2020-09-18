import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../common/domain';
import { Enchantment } from '../../../../domain/model/card/Enchantment';
import { EnchantmentCreationQuery } from '../../../../domain/query/card/EnchantmentCreationQuery';
import { EnchantmentDb } from '../../model/card/EnchantmentDb';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { Model } from 'mongoose';
import { MongooseInsertRepository } from '../../../../../layer-modules/db/adapter';

@injectable()
export class EnchantmentDbInsertRepository extends MongooseInsertRepository<
  Enchantment,
  EnchantmentCreationQuery,
  EnchantmentDb
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.card.ENCHANTMENT_DB_MODEL)
    model: Model<EnchantmentDb>,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card
        .ENCHANTMENT_DB_TO_ENCHANTMENT_CONVERTER,
    )
    enchantmentDbToEnchantmentConverter: Converter<EnchantmentDb, Enchantment>,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card
        .ENCHANTMENT_CREATION_QUERY_TO_ENCHANTMENT_DBS_CONVERTER,
    )
    enchantmentCreationQueryToEnchantmentDbsConverter: Converter<
      EnchantmentCreationQuery,
      EnchantmentDb[]
    >,
  ) {
    super(
      model,
      enchantmentDbToEnchantmentConverter,
      enchantmentCreationQueryToEnchantmentDbsConverter,
    );
  }
}
