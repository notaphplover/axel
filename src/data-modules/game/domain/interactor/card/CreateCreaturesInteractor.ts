import { inject, injectable } from 'inversify';

import { Interactor } from '../../../../../common/domain';
import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { Creature } from '../../model/card/Creature';
import { CreatureCreationQuery } from '../../query/card/CreatureCreationQuery';

@injectable()
export class CreateCreaturesInteractor
  implements Interactor<CreatureCreationQuery, Promise<Creature[]>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.card.CREATURE_INSERT_REPOSITORY)
    private readonly creatureInsertRepository: InsertRepository<
      Creature,
      CreatureCreationQuery
    >,
  ) {}

  public async interact(query: CreatureCreationQuery): Promise<Creature[]> {
    return this.creatureInsertRepository.insert(query);
  }
}
