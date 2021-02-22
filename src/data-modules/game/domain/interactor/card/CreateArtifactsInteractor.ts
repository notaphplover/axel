import { inject, injectable } from 'inversify';

import { Interactor } from '../../../../../common/domain';
import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { Artifact } from '../../model/card/Artifact';
import { ArtifactCreationQuery } from '../../query/card/ArtifactCreationQuery';

@injectable()
export class CreateArtifactsInteractor
  implements Interactor<ArtifactCreationQuery, Promise<Artifact[]>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.repository.card.ARTIFACT_INSERT_REPOSITORY)
    private readonly artifactInsertRepository: InsertRepository<
      Artifact,
      ArtifactCreationQuery
    >,
  ) {}

  public async interact(query: ArtifactCreationQuery): Promise<Artifact[]> {
    return this.artifactInsertRepository.insert(query);
  }
}
