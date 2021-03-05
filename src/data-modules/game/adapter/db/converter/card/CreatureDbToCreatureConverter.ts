import { injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { BaseCard } from '../../../../domain/model/card/BaseCard';
import { CardType } from '../../../../domain/model/card/CardType';
import { Creature } from '../../../../domain/model/card/Creature';
import { CardDb } from '../../model/card/CardDb';
import { BaseCardDbToCardConverter } from './BaseCardDbToCardConverter';

@injectable()
export class CreatureDbToCreatureConverter
  extends BaseCardDbToCardConverter<Creature>
  implements Converter<CardDb, Creature> {
  public transform(input: CardDb): Creature {
    const baseCard: BaseCard = this.innerTransform(input);

    return {
      cost: baseCard.cost,
      detail: baseCard.detail,
      id: baseCard.id,
      power: input.power,
      subtypes: baseCard.subtypes,
      supertypes: baseCard.supertypes,
      toughness: input.toughness,
      type: baseCard.type as CardType.Creature,
    };
  }
}
