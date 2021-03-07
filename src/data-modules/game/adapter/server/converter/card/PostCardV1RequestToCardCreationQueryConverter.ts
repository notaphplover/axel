import * as fastify from 'fastify';
import { inject, injectable } from 'inversify';

import { Converter, Validator } from '../../../../../../common/domain';
import { ValueOrErrors } from '../../../../../../common/domain/either/ValueOrErrors';
import { hasValue } from '../../../../../../common/domain/utils/hasValue';
import { RequestToQueryConverter } from '../../../../../../layer-modules/server/adapter';
import { CardCreationQuery } from '../../../../domain/query/card/CardCreationQuery';
import { CardTypeApiV1 } from '../../../api/model/card/CardTypeApiV1';
import { CardCreationQueryApiV1 } from '../../../api/query/card/CardCreationQueryApiV1';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

@injectable()
export class PostCardV1RequestToCardCreationQueryConverter extends RequestToQueryConverter<
  fastify.FastifyRequest,
  CardCreationQuery,
  CardCreationQueryApiV1
> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.card
        .CARD_CREATION_QUERY_API_V1_TO_CARD_CREATION_QUERY_CONVERTER,
    )
    queryApiToQueryConverter: Converter<
      CardCreationQueryApiV1,
      Promise<CardCreationQuery>
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.validator.card
        .CARD_CREATION_QUERY_API_V1_VALIDATOR,
    )
    syntaxValidator: Validator<CardCreationQueryApiV1>,
  ) {
    super(undefined, queryApiToQueryConverter, syntaxValidator);
  }

  protected extractRequestQuery(request: fastify.FastifyRequest): unknown {
    return request.body;
  }

  protected async getContextOrErrors(
    _request: fastify.FastifyRequest,
    queryApi: CardCreationQueryApiV1,
  ): Promise<ValueOrErrors<void>> {
    const errors: string[] = [];

    errors.push(...this.getCardCreationQueryApiV1Errors(queryApi));

    let contextOrErrors: ValueOrErrors<void>;

    if (errors.length === 0) {
      contextOrErrors = {
        isEither: false,
        value: undefined,
      };
    } else {
      contextOrErrors = {
        isEither: true,
        value: errors,
      };
    }

    return contextOrErrors;
  }

  private getCardCreationQueryApiV1Errors(
    cardCreationQueryApiV1: CardCreationQueryApiV1,
  ): string[] {
    const errors: string[] = [];

    if (cardCreationQueryApiV1.types.length === 0) {
      errors.push('A card creation query must include at least one type');
    }

    const hasPowerOrToughness: boolean =
      hasValue(cardCreationQueryApiV1.power) ||
      hasValue(cardCreationQueryApiV1.toughness);

    if (cardCreationQueryApiV1.types.includes(CardTypeApiV1.Creature)) {
      if (!hasPowerOrToughness) {
        errors.push(
          'A creature creation query must include values for "power" and "toughness" fields',
        );
      }
    } else {
      if (hasPowerOrToughness) {
        errors.push(
          'A non creature creation query must not include values for "power" nor "toughness" fields',
        );
      }
    }

    return errors;
  }
}
