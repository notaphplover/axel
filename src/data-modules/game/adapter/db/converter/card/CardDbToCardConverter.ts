import { injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { BaseCard } from '../../../../domain/model/card/BaseCard';
import { Card } from '../../../../domain/model/card/Card';
import { CardType } from '../../../../domain/model/card/CardType';
import { CardDb } from '../../model/card/CardDb';
import { BaseCardDbToCardConverter } from './BaseCardDbToCardConverter';

@injectable()
export class CardDbToCardConverter
  extends BaseCardDbToCardConverter<Card>
  implements Converter<CardDb, Card> {
  public transform(input: CardDb): Card {
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
