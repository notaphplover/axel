import { inject, injectable } from 'inversify';
import { BaseCardCreationQuery } from '../../../../domain/query/card/BaseCardCreationQuery';
import { BaseCardCreationQueryApiV1 } from '../../query/card/BaseCardCreationQueryApiV1';
import { CardCreationQuery } from '../../../../domain/query/card/CardCreationQuery';
import { CardCreationQueryApiV1 } from '../../query/card/CardCreationQueryApiV1';
import { CardType } from '../../../../domain/model/card/CardType';
import { CardTypeApiV1 } from '../../model/card/CardTypeApiV1';
import { Converter } from '../../../../../common/domain';
import { CreatureCreationQuery } from '../../../../domain/query/card/CreatureCreationQuery';
import { CreatureCreationQueryApiV1 } from '../../query/card/CreatureCreationQueryApiV1';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { Resource } from '../../../../domain/model/card/Resource';
import { ResourceApiV1 } from '../../model/card/ResourceApiV1';

@injectable()
export class CardCreationQueryApiV1ToCardCreationQueryConverter
  implements Converter<CardCreationQueryApiV1, CardCreationQuery> {
  constructor(
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

  public transform(input: CardCreationQueryApiV1): CardCreationQuery {
    switch (input.type) {
      case CardTypeApiV1.Creature:
        return this.transformCreatureCreationQuery(
          input as CreatureCreationQueryApiV1,
        );
      default:
        return this.transformBaseCardCreationQuery(input) as CardCreationQuery;
    }
  }

  private transformBaseCardCreationQuery(
    input: BaseCardCreationQueryApiV1,
  ): BaseCardCreationQuery {
    return {
      cost: this.resourceApiV1ToResourceConverter.transform(input.cost),
      type: this.cardTypeApiV1ToCardTypeConverter.transform(input.type),
    };
  }

  private transformCreatureCreationQuery(
    input: CreatureCreationQueryApiV1,
  ): CreatureCreationQuery {
    const baseCardCreationQuery: BaseCardCreationQuery = this.transformBaseCardCreationQuery(
      input,
    );

    return {
      cost: baseCardCreationQuery.cost,
      power: input.power,
      toughness: input.toughness,
      type: CardType.Creature,
    };
  }
}
