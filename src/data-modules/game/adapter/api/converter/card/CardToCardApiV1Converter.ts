import { inject, injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { BaseCard } from '../../../../domain/model/card/BaseCard';
import { Card } from '../../../../domain/model/card/Card';
import { CardDetail } from '../../../../domain/model/card/CardDetail';
import { CardSubtype } from '../../../../domain/model/card/CardSubtype';
import { CardSupertype } from '../../../../domain/model/card/CardSupertype';
import { CardType } from '../../../../domain/model/card/CardType';
import { Creature } from '../../../../domain/model/card/Creature';
import { Resource } from '../../../../domain/model/card/Resource';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { BaseCardApiV1 } from '../../model/card/BaseCardApiV1';
import { CardApiV1 } from '../../model/card/CardApiV1';
import { CardDetailApiV1 } from '../../model/card/CardDetailApiV1';
import { CardSubtypeApiV1 } from '../../model/card/CardSubtypeApiV1';
import { CardSupertypeApiV1 } from '../../model/card/CardSupertypeApiV1';
import { CardTypeApiV1 } from '../../model/card/CardTypeApiV1';
import { CreatureApiV1 } from '../../model/card/CreatureApiV1';
import { ResourceApiV1 } from '../../model/card/ResourceApiV1';

@injectable()
export class CardToCardApiV1Converter implements Converter<Card, CardApiV1> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.card
        .CARD_DETAIL_TO_CARD_DETAIL_API_V1_CONVERTER,
    )
    private readonly cardDetailToCardDetailV1Converter: Converter<
      CardDetail,
      CardDetailApiV1
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.card
        .CARD_SUBTYPE_TO_CARD_SUBTYPE_API_V1_CONVERTER,
    )
    private readonly cardSubtypeToCardSubtypeApiV1Converter: Converter<
      CardSubtype,
      CardSubtypeApiV1
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.card
        .CARD_SUBTYPE_TO_CARD_SUBTYPE_API_V1_CONVERTER,
    )
    private readonly cardSupertypeToCardSupertypeApiV1Converter: Converter<
      CardSupertype,
      CardSupertypeApiV1
    >,

    @inject(
      GAME_ADAPTER_TYPES.api.converter.card
        .CARD_TYPE_TO_CARD_TYPE_API_V1_CONVERTER,
    )
    private readonly cardTypeToCardTypeApiV1Converter: Converter<
      CardType,
      CardTypeApiV1
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.card
        .RESOURCE_TO_RESOURCE_API_V1_CONVERTER,
    )
    private readonly resourceToResourceApiV1Converter: Converter<
      Resource,
      ResourceApiV1
    >,
  ) {}

  public transform(input: Card): CardApiV1 {
    switch (input.type) {
      case CardType.Creature:
        return this.transformCreatureCard(input);
      default:
        return this.transformBaseCard(input) as CardApiV1;
    }
  }

  private transformBaseCard(input: BaseCard): BaseCardApiV1 {
    return {
      cost: this.resourceToResourceApiV1Converter.transform(input.cost),
      detail: this.cardDetailToCardDetailV1Converter.transform(input.detail),
      id: input.id,
      subtypes: input.subtypes.map((subtype: CardSubtype) =>
        this.cardSubtypeToCardSubtypeApiV1Converter.transform(subtype),
      ),
      supertypes: input.supertypes.map((supertype: CardSupertype) =>
        this.cardSupertypeToCardSupertypeApiV1Converter.transform(supertype),
      ),
      type: this.cardTypeToCardTypeApiV1Converter.transform(input.type),
    };
  }

  private transformCreatureCard(input: Creature): CreatureApiV1 {
    const baseCardApiV1: BaseCardApiV1 = this.transformBaseCard(input);

    return {
      cost: baseCardApiV1.cost,
      detail: baseCardApiV1.detail,
      id: baseCardApiV1.id,
      power: input.power,
      subtypes: baseCardApiV1.subtypes,
      supertypes: baseCardApiV1.supertypes,
      toughness: input.toughness,
      type: CardTypeApiV1.Creature,
    };
  }
}
