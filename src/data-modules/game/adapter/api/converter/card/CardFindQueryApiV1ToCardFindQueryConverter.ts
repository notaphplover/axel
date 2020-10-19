import { inject, injectable } from 'inversify';
import { CardFindQuery } from '../../../../domain/query/card/CardFindQuery';
import { CardFindQueryApiV1 } from '../../query/card/CardFindQueryApiV1';
import { CardType } from '../../../../domain/model/card/CardType';
import { CardTypeApiV1 } from '../../model/card/CardTypeApiV1';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

@injectable()
export class CardFindQueryApiV1ToCardFindQueryConverter
  implements Converter<CardFindQueryApiV1, CardFindQuery> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.card
        .CARD_TYPE_API_V1_TO_CARD_TYPE_CONVERTER,
    )
    private readonly cardTypeApiV1ToCardTypeConverter: Converter<
      CardTypeApiV1,
      CardType
    >,
  ) {}

  public transform(input: CardFindQueryApiV1): CardFindQuery {
    let cardTypes: undefined | CardType | CardType[];

    if (input.types === undefined) {
      cardTypes = undefined;
    } else if (Array.isArray(input.types)) {
      cardTypes = input.types.map(
        this.cardTypeApiV1ToCardTypeConverter.transform.bind(
          this.cardTypeApiV1ToCardTypeConverter,
        ),
      );
    } else {
      cardTypes = this.cardTypeApiV1ToCardTypeConverter.transform(input.types);
    }

    return {
      id: input.id,
      limit: input.limit,
      offset: input.offset,
      types: cardTypes,
    };
  }
}
