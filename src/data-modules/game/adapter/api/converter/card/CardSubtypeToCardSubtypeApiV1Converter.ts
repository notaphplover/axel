import { injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { CardSubtype } from '../../../../domain/model/card/CardSubtype';
import { LandSubtype } from '../../../../domain/model/card/LandSubtype';
import { CardSubtypeApiV1 } from '../../model/card/CardSubtypeApiV1';
import { LandSubtypeApiV1 } from '../../model/card/LandSubtypeApiV1';

const cardSubtypeToCardSubtypeApiV1Map: {
  [Tkey in CardSubtype]: CardSubtypeApiV1;
} = {
  [LandSubtype.Forest]: LandSubtypeApiV1.Forest,
  [LandSubtype.Island]: LandSubtypeApiV1.Island,
  [LandSubtype.Mountain]: LandSubtypeApiV1.Mountain,
  [LandSubtype.Plains]: LandSubtypeApiV1.Plains,
  [LandSubtype.Swamp]: LandSubtypeApiV1.Swamp,
};

@injectable()
export class CardSubtypeToCardSubtypeApiV1Converter
  implements Converter<CardSubtype, CardSubtypeApiV1> {
  public transform(input: CardSubtype): CardSubtypeApiV1 {
    return cardSubtypeToCardSubtypeApiV1Map[input];
  }
}
