import { inject, injectable } from 'inversify';

import { Converter } from '../../../../../../common/domain';
import { CardDetail } from '../../../../domain/model/card/CardDetail';
import { CardType } from '../../../../domain/model/card/CardType';
import { Resource } from '../../../../domain/model/card/Resource';
import { CardCreationQuery } from '../../../../domain/query/card/CardCreationQuery';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { CardDetailApiV1 } from '../../model/card/CardDetailApiV1';
import { CardTypeApiV1 } from '../../model/card/CardTypeApiV1';
import { ResourceApiV1 } from '../../model/card/ResourceApiV1';
import { CardCreationQueryApiV1 } from '../../query/card/CardCreationQueryApiV1';

@injectable()
export class CardCreationQueryApiV1ToCardCreationQueryConverter
  implements Converter<CardCreationQueryApiV1, Promise<CardCreationQuery>> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.card
        .CARD_DETAIL_API_V1_TO_CARD_DETAIL_CONVERTER,
    )
    private readonly cardDetailApiV1ToCardDetailConverter: Converter<
      CardDetailApiV1,
      CardDetail
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.card
        .CARD_TYPE_API_V1_TO_CARD_TYPE_CONVERTER,
    )
    private readonly cardTypeApiV1ToCardTypeConverter: Converter<
      CardTypeApiV1,
      CardType
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.card
        .RESOURCE_API_V1_TO_RESOURCE_CONVERTER,
    )
    private readonly resourceApiV1ToResourceConverter: Converter<
      ResourceApiV1,
      Resource
    >,
  ) {}

  public async transform(
    input: CardCreationQueryApiV1,
  ): Promise<CardCreationQuery> {
    return {
      cost: this.resourceApiV1ToResourceConverter.transform(input.cost),
      detail: this.cardDetailApiV1ToCardDetailConverter.transform(input.detail),
      power: input.power,
      toughness: input.toughness,
      type: this.cardTypeApiV1ToCardTypeConverter.transform(input.type),
    };
  }
}
