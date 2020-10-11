import { inject, injectable } from 'inversify';
import { Artifact } from '../../../../domain/model/card/Artifact';
import { ArtifactCreationQuery } from '../../../../domain/query/card/ArtifactCreationQuery';
import { ArtifactDb } from '../../model/card/ArtifactDb';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { Model } from 'mongoose';
import { MongooseInsertRepository } from '../../../../../../layer-modules/db/adapter';

@injectable()
export class ArtifactDbInsertRepository extends MongooseInsertRepository<
  Artifact,
  ArtifactCreationQuery,
  ArtifactDb
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.card.ARTIFACT_DB_MODEL)
    model: Model<ArtifactDb>,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card.ARTIFACT_DB_TO_ARTIFACT_CONVERTER,
    )
    artifactDbToArtifactConverter: Converter<ArtifactDb, Artifact>,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card
        .ARTIFACT_CREATION_QUERY_TO_ARTIFACT_DBS_CONVERTER,
    )
    artifactCreationQueryToArtifactDbsConverter: Converter<
      ArtifactCreationQuery,
      ArtifactDb[]
    >,
  ) {
    super(
      model,
      artifactDbToArtifactConverter,
      artifactCreationQueryToArtifactDbsConverter,
    );
  }
}
