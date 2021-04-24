import { injectable } from 'inversify';

import { InsertRepository } from '../../../layer-modules/db/domain';
import { getInstanceTypeName } from '../utils/getInstanceTypeName';
import { Interactor } from './Interactor';

@injectable()
export class CreateEntityInteractor<TEntity, TQuery>
  implements Interactor<TQuery, Promise<TEntity>> {
  constructor(
    private readonly entityInsertRepository: InsertRepository<TEntity, TQuery>,
  ) {}

  public async interact(query: TQuery): Promise<TEntity> {
    const entitiesCreated: TEntity[] = await this.entityInsertRepository.insert(
      query,
    );

    if (entitiesCreated.length === 1) {
      return entitiesCreated[0] as TEntity;
    } else {
      throw new Error(
        `Expected ${this.getRepositoryName()}.insert() to create a single entity, ${entitiesCreated.length.toString()} entities were created instead`,
      );
    }
  }

  private getRepositoryName(): string {
    let repositoryName: string = getInstanceTypeName(
      this.entityInsertRepository,
    );

    if (repositoryName === '') {
      repositoryName = 'entityInsertRepository';
    }

    return repositoryName;
  }
}
