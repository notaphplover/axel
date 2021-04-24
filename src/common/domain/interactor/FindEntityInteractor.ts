import { SearchRepository } from '../../../layer-modules/db/domain';
import { Interactor } from './Interactor';

export class FindEntityInteractor<TEntity, TQuery>
  implements Interactor<TQuery, Promise<TEntity | null>> {
  constructor(
    private readonly entitySearchRepository: SearchRepository<TEntity, TQuery>,
  ) {}

  public async interact(query: TQuery): Promise<TEntity | null> {
    const entityFound: TEntity | null = await this.entitySearchRepository.findOne(
      query,
    );

    return entityFound;
  }
}
