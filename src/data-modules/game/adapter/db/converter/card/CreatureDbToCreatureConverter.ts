import { BaseCard } from '../../../../domain/model/card/BaseCard';
import { BaseCardDbToCardConverter } from './BaseCardDbToCardConverter';
import { CardType } from '../../../../domain/model/card/CardType';
import { Converter } from '../../../../../../common/domain';
import { Creature } from '../../../../domain/model/card/Creature';
import { CreatureDb } from '../../model/card/CreatureDb';
import { injectable } from 'inversify';

@injectable()
export class CreatureDbToCreatureConverter
  extends BaseCardDbToCardConverter
  implements Converter<CreatureDb, Creature> {
  public transform(input: CreatureDb): Creature {
    const baseCard: BaseCard = super.transform(input);

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
