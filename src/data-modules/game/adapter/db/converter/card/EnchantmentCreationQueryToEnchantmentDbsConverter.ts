import { injectable } from 'inversify';
import mongodb from 'mongodb';

import { Converter } from '../../../../../../common/domain';
import { EnchantmentCreationQuery } from '../../../../domain/query/card/EnchantmentCreationQuery';
import { EnchantmentDb } from '../../model/card/EnchantmentDb';

@injectable()
export class EnchantmentCreationQueryToEnchantmentDbsConverter
  implements
    Converter<EnchantmentCreationQuery, mongodb.OptionalId<EnchantmentDb>[]> {
  public transform(
    input: EnchantmentCreationQuery,
  ): mongodb.OptionalId<EnchantmentDb>[] {
    return [
      {
        cost: input.cost,
        detail: input.detail,
        type: input.type,
      },
    ];
  }
}
