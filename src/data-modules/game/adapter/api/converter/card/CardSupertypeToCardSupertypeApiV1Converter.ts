import { injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { CardSupertype } from '../../../../domain/model/card/CardSupertype';
import { CardSupertypeApiV1 } from '../../model/card/CardSupertypeApiV1';

const cardSupertypeToCardSupertypeApiV1Map: {
  [Tkey in CardSupertype]: CardSupertypeApiV1;
} = {
  [CardSupertype.Legendary]: CardSupertypeApiV1.Legendary,
  [CardSupertype.Snow]: CardSupertypeApiV1.Snow,
};

@injectable()
export class CardSupertypeToCardSupertypeApiV1Converter
  implements Converter<CardSupertype, CardSupertypeApiV1> {
  public transform(input: CardSupertype): CardSupertypeApiV1 {
    return cardSupertypeToCardSupertypeApiV1Map[input];
  }
}
