import { Artifact } from '../../../../domain/model/card/Artifact';
import { ArtifactDb } from '../../model/card/ArtifactDb';
import { Converter } from '../../../../../common/domain';
import { injectable } from 'inversify';

@injectable()
export class ArtifactDbToArtifactConverter
  implements Converter<ArtifactDb, Artifact> {
  public transform(input: ArtifactDb): Artifact {
    return {
      cost: input.cost,
      id: input._id.toHexString(),
      type: input.type,
    };
  }
}
