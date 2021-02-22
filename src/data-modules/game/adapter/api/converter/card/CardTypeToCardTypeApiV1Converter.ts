import { injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { CardType } from '../../../../domain/model/card/CardType';
import { CardTypeApiV1 } from '../../model/card/CardTypeApiV1';

const cardTypeToCardTypeApiV1Map: { [TKey in CardType]: CardTypeApiV1 } = {
  [CardType.Artifact]: CardTypeApiV1.Artifact,
  [CardType.Creature]: CardTypeApiV1.Creature,
  [CardType.Enchantment]: CardTypeApiV1.Enchantment,
  [CardType.Land]: CardTypeApiV1.Land,
};

@injectable()
export class CardTypeToCardTypeApiV1Converter
  implements Converter<CardType, CardTypeApiV1> {
  public transform(input: CardType): CardTypeApiV1 {
    if (input in cardTypeToCardTypeApiV1Map) {
      return cardTypeToCardTypeApiV1Map[input];
    } else {
      throw new Error(`Unexpected card type "${input}"`);
    }
  }
}
