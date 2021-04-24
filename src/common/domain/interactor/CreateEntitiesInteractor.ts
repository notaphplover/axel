import { Interactor } from '..';
import { InsertRepository } from '../../../layer-modules/db/domain';

export class CreateEntitiesInteractor<TEntity, TQuery>
  implements Interactor<TQuery, Promise<TEntity[]>> {
  constructor(
    private readonly entityInsertRepository: InsertRepository<TEntity, TQuery>,
  ) {}

  public async interact(query: TQuery): Promise<TEntity[]> {
    const entitiesCreated: TEntity[] = await this.entityInsertRepository.insert(
      query,
    );

    return entitiesCreated;
  }
}
