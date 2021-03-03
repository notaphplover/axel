import { injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { BaseCard } from '../../../../domain/model/card/BaseCard';
import { CardType } from '../../../../domain/model/card/CardType';
import { Land } from '../../../../domain/model/card/Land';
import { LandDb } from '../../model/card/LandDb';
import { BaseCardDbToCardConverter } from './BaseCardDbToCardConverter';

@injectable()
export class LandDbToLandConverter
  extends BaseCardDbToCardConverter<LandDb, Land>
  implements Converter<LandDb, Land> {
  public transform(input: LandDb): Land {
    const baseCard: BaseCard = this.innerTransform(input);

    return {
      cost: baseCard.cost,
      detail: baseCard.detail,
      id: baseCard.id,
      subtypes: baseCard.subtypes,
      supertypes: baseCard.supertypes,
      type: baseCard.type as CardType.Land,
    };
  }
}
