import { injectable } from 'inversify';

import { SearchRepository } from '../../../layer-modules/db/domain';
import { Interactor } from './Interactor';

@injectable()
export class FindEntitiesInteractor<TEntity, TQuery>
  implements Interactor<TQuery, Promise<TEntity[]>>
{
  constructor(
    private readonly entitySearchRepository: SearchRepository<TEntity, TQuery>,
  ) {}

  public async interact(query: TQuery): Promise<TEntity[]> {
    const entitiesFound: TEntity[] = await this.entitySearchRepository.find(
      query,
    );

    return entitiesFound;
  }
}
