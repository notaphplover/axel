import { injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { Artifact } from '../../../../domain/model/card/Artifact';
import { BaseCard } from '../../../../domain/model/card/BaseCard';
import { CardType } from '../../../../domain/model/card/CardType';
import { ArtifactDb } from '../../model/card/ArtifactDb';
import { BaseCardDbToCardConverter } from './BaseCardDbToCardConverter';

@injectable()
export class ArtifactDbToArtifactConverter
  extends BaseCardDbToCardConverter<ArtifactDb, Artifact>
  implements Converter<ArtifactDb, Artifact> {
  public transform(input: ArtifactDb): Artifact {
    const baseCard: BaseCard = this.innerTransform(input);

    return {
      cost: baseCard.cost,
      detail: baseCard.detail,
      id: baseCard.id,
      type: baseCard.type as CardType.Artifact,
    };
  }
}
