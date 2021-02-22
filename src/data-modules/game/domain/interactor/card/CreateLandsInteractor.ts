import { inject, injectable } from 'inversify';

import { Interactor } from '../../../../../common/domain';
import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { Land } from '../../model/card/Land';
import { LandCreationQuery } from '../../query/card/LandCreationQuery';

@injectable()
export class CreateLandsInteractor
  implements Interactor<LandCreationQuery, Promise<Land[]>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.card.LAND_INSERT_REPOSITORY)
    private readonly landInsertRepository: InsertRepository<
      Land,
      LandCreationQuery
    >,
  ) {}

  public async interact(query: LandCreationQuery): Promise<Land[]> {
    return this.landInsertRepository.insert(query);
  }
}
