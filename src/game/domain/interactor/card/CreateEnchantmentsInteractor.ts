import { inject, injectable } from 'inversify';
import { Enchantment } from '../../model/card/Enchantment';
import { EnchantmentCreationQuery } from '../../query/card/EnchantmentCreationQuery';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { InsertRepository } from '../../../../layer-modules/db/domain';
import { Interactor } from '../../../../common/domain';

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
