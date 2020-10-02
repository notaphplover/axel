import { BaseCard } from '../../../../domain/model/card/BaseCard';
import { BaseCardDbToCardConverter } from './BaseCardDbToCardConverter';
import { CardType } from '../../../../domain/model/card/CardType';
import { Converter } from '../../../../../common/domain';
import { Land } from '../../../../domain/model/card/Land';
import { LandDb } from '../../model/card/LandDb';
import { injectable } from 'inversify';

@injectable()
export class LandDbToLandConverter
  extends BaseCardDbToCardConverter
  implements Converter<LandDb, Land> {
  public transform(input: LandDb): Land {
    const baseCard: BaseCard = super.transform(input);

    return {
      cost: baseCard.cost,
      detail: baseCard.detail,
      id: baseCard.id,
      type: baseCard.type as CardType.Land,
    };
  }
}
