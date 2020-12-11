import { BaseCard } from '../../../../domain/model/card/BaseCard';
import { BaseCardDbToCardConverter } from './BaseCardDbToCardConverter';
import { CardDb } from '../../model/card/CardDb';
import { CardType } from '../../../../domain/model/card/CardType';
import { Converter } from '../../../../../../common/domain';
import { Creature } from '../../../../domain/model/card/Creature';
import { CreatureDb } from '../../model/card/CreatureDb';
import { injectable } from 'inversify';

@injectable()
export class CreatureDbToCreatureConverter
  extends BaseCardDbToCardConverter<CreatureDb, Creature>
  implements Converter<CreatureDb, Creature> {
  public transform(input: CreatureDb): Creature {
    const baseCard: BaseCard = this.innerTransform(input as CardDb);

    return {
      cost: baseCard.cost,
      detail: baseCard.detail,
      id: baseCard.id,
      type: baseCard.type as CardType.Creature,
      power: input.power,
      toughness: input.toughness,
    };
  }
}
