import { CardType } from '../../../../domain/model/card/CardType';
import { CardTypeApiV1 } from '../../model/card/CardTypeApiV1';
import { Converter } from '../../../../../../common/domain';
import { injectable } from 'inversify';

const cardTypeToCardTypeMap: { [TKey in CardTypeApiV1]: CardType } = {
  [CardTypeApiV1.Artifact]: CardType.Artifact,
  [CardTypeApiV1.Creature]: CardType.Creature,
  [CardTypeApiV1.Enchantment]: CardType.Enchantment,
  [CardTypeApiV1.Land]: CardType.Land,
};

@injectable()
export class CardTypeApiV1ToCardTypeConverter
  implements Converter<CardTypeApiV1, CardType> {
  public transform(input: CardTypeApiV1): CardType {
    if (input in cardTypeToCardTypeMap) {
      return cardTypeToCardTypeMap[input];
    } else {
      throw new Error(`Unecpected card type "${input}"`);
    }
  }
}
