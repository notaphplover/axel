import { inject, injectable } from 'inversify';
import { ArtifactCreationQuery } from '../../../../domain/query/card/ArtifactCreationQuery';
import { ArtifactDb } from '../../model/card/ArtifactDb';
import { Converter } from '../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { Model } from 'mongoose';

@injectable()
export class ArtifactCreationQueryToArtifactDbsConverter
  implements Converter<ArtifactCreationQuery, ArtifactDb[]> {
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.card.ARTIFACT_DB_MODEL)
    private readonly artifactDbModel: Model<ArtifactDb>,
  ) {}

  public transform(input: ArtifactCreationQuery): ArtifactDb[] {
    return [
      new this.artifactDbModel({
        cost: input.cost,
        detail: input.detail,
        type: input.type,
      }),
    ];
  }
}
