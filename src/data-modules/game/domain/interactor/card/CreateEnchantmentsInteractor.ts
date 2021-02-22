import { inject, injectable } from 'inversify';

import { Interactor } from '../../../../../common/domain';
import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { Enchantment } from '../../model/card/Enchantment';
import { EnchantmentCreationQuery } from '../../query/card/EnchantmentCreationQuery';

@injectable()
export class CreateEnchantmentsInteractor
  implements Interactor<EnchantmentCreationQuery, Promise<Enchantment[]>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.card.ENCHANTMENT_INSERT_REPOSITORY)
    private readonly enchantmentInsertRepository: InsertRepository<
      Enchantment,
      EnchantmentCreationQuery
    >,
  ) {}

  public async interact(
    query: EnchantmentCreationQuery,
  ): Promise<Enchantment[]> {
    return this.enchantmentInsertRepository.insert(query);
  }
}
