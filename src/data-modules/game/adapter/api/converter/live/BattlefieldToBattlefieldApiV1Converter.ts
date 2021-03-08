import { inject, injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { Card } from '../../../../domain/model/card/Card';
import { Battlefield } from '../../../../domain/model/live/Battlefield';
import { TargeteableCard } from '../../../../domain/model/live/TargeteableCard';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { CardApiV1 } from '../../model/card/CardApiV1';
import { BattlefieldApiV1 } from '../../model/live/BattlefieldApiV1';

@injectable()
export class BattlefieldToBattlefieldApiV1Converter
  implements Converter<Battlefield, BattlefieldApiV1> {
  constructor(
    @inject(GAME_ADAPTER_TYPES.api.converter.card.CARD_TO_CARD_API_V1_CONVERTER)
    private readonly cardToCardApiV1Converter: Converter<Card, CardApiV1>,
  ) {}

  public transform(battlefield: Battlefield): BattlefieldApiV1 {
    return {
      permanents: battlefield.permanents.map((permanent: TargeteableCard) => ({
        card: this.cardToCardApiV1Converter.transform(permanent.card),
        targetId: permanent.targetId,
      })),
    };
  }
}
