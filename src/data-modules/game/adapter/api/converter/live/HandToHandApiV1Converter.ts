import { inject, injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { Card } from '../../../../domain/model/card/Card';
import { Hand } from '../../../../domain/model/live/Hand';
import { TargeteableCard } from '../../../../domain/model/live/TargeteableCard';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { CardApiV1 } from '../../model/card/CardApiV1';
import { HandApiV1 } from '../../model/live/HandApiV1';

@injectable()
export class HandToHandApiV1Converter implements Converter<Hand, HandApiV1> {
  constructor(
    @inject(GAME_ADAPTER_TYPES.api.converter.card.CARD_TO_CARD_API_V1_CONVERTER)
    private readonly cardToCardApiV1Converter: Converter<Card, CardApiV1>,
  ) {}

  public transform(hand: Hand): HandApiV1 {
    return {
      cards: hand.cards.map((targeteableCard: TargeteableCard) => ({
        card: this.cardToCardApiV1Converter.transform(targeteableCard.card),
        targetId: targeteableCard.targetId,
      })),
    };
  }
}
