import { BaseCard } from '../../../../domain/model/card/BaseCard';
import { BaseCardDbToCardConverter } from './BaseCardDbToCardConverter';
import { CardDb } from '../../model/card/CardDb';
import { CardType } from '../../../../domain/model/card/CardType';
import { Converter } from '../../../../../../common/domain';
import { Land } from '../../../../domain/model/card/Land';
import { LandDb } from '../../model/card/LandDb';
import { injectable } from 'inversify';

@injectable()
export class LandDbToLandConverter
  extends BaseCardDbToCardConverter<LandDb, Land>
  implements Converter<LandDb, Land> {
  public transform(input: LandDb): Land {
    const baseCard: BaseCard = this.innerTransform(input as CardDb);

    return {
      cost: baseCard.cost,
      detail: baseCard.detail,
      id: baseCard.id,
      type: baseCard.type as CardType.Land,
    };
  }
}
