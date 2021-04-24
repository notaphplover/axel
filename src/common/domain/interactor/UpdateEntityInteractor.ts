import { UpdateRepository } from '../../../layer-modules/db/domain';
import { Interactor } from './Interactor';

export class UpdateEntityInteractor<TEntity, TQuery>
  implements Interactor<TQuery, Promise<TEntity | null>> {
  constructor(
    private readonly entityUpdateRepository: UpdateRepository<TEntity, TQuery>,
  ) {}

  public async interact(query: TQuery): Promise<TEntity | null> {
    const entityUpdated: TEntity | null = await this.entityUpdateRepository.updateOneAndSelect(
      query,
    );

    return entityUpdated;
  }
}
