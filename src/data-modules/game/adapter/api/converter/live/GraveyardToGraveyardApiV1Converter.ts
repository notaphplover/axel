import { inject, injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { Card } from '../../../../domain/model/card/Card';
import { Graveyard } from '../../../../domain/model/live/Graveyard';
import { TargeteableCard } from '../../../../domain/model/live/TargeteableCard';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { CardApiV1 } from '../../model/card/CardApiV1';
import { GraveyardApiV1 } from '../../model/live/GraveyardApiV1';

@injectable()
export class GraveyardToGraveyardApiV1Converter
  implements Converter<Graveyard, GraveyardApiV1>
{
  constructor(
    @inject(GAME_ADAPTER_TYPES.api.converter.card.CARD_TO_CARD_API_V1_CONVERTER)
    private readonly cardToCardApiV1Converter: Converter<Card, CardApiV1>,
  ) {}

  public transform(graveyard: Graveyard): GraveyardApiV1 {
    return {
      cards: graveyard.cards.map((targeteableCard: TargeteableCard) => ({
        card: this.cardToCardApiV1Converter.transform(targeteableCard.card),
        targetId: targeteableCard.targetId,
      })),
    };
  }
}
