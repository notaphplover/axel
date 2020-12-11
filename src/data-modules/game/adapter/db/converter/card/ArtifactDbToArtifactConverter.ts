import { Artifact } from '../../../../domain/model/card/Artifact';
import { ArtifactDb } from '../../model/card/ArtifactDb';
import { BaseCard } from '../../../../domain/model/card/BaseCard';
import { BaseCardDbToCardConverter } from './BaseCardDbToCardConverter';
import { CardDb } from '../../model/card/CardDb';
import { CardType } from '../../../../domain/model/card/CardType';
import { Converter } from '../../../../../../common/domain';
import { injectable } from 'inversify';

@injectable()
export class ArtifactDbToArtifactConverter
  extends BaseCardDbToCardConverter<ArtifactDb, Artifact>
  implements Converter<ArtifactDb, Artifact> {
  public transform(input: ArtifactDb): Artifact {
    const baseCard: BaseCard = this.innerTransform(input as CardDb);

    return {
      cost: baseCard.cost,
      detail: baseCard.detail,
      id: baseCard.id,
      type: baseCard.type as CardType.Artifact,
    };
  }
}
