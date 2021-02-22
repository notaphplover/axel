import * as fastify from 'fastify';
import { inject, injectable } from 'inversify';

import { Converter, Validator } from '../../../../../../common/domain';
import { ValueOrErrors } from '../../../../../../common/domain/either/ValueOrErrors';
import { RequestToQueryConverter } from '../../../../../../layer-modules/server/adapter';
import { CardDeckFindQuery } from '../../../../domain/query/deck/CardDeckFindQuery';
import { CardDeckFindQueryApiV1 } from '../../../api/query/deck/CardDeckFindQueryApiV1';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

@injectable()
export class GetCardDeckV1RequestToCardDeckFindQueryConverter extends RequestToQueryConverter<
  fastify.FastifyRequest,
  CardDeckFindQuery,
  CardDeckFindQueryApiV1
> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.deck
        .CARD_DECK_FIND_QUERY_API_V1_TO_CARD_DECK_FIND_QUERY_CONVERTER,
    )
    queryApiToQueryConverter: Converter<
      CardDeckFindQueryApiV1,
      Promise<CardDeckFindQuery>
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.validator.deck
        .CARD_DECK_FIND_QUERY_API_V1_VALIDATOR,
    )
    syntaxValidator: Validator<CardDeckFindQueryApiV1>,
  ) {
    super(undefined, queryApiToQueryConverter, syntaxValidator);
  }

  protected extractRequestQuery(request: fastify.FastifyRequest): unknown {
    return request.params;
  }
  protected async getContextOrErrors(): Promise<ValueOrErrors<void>> {
    const contextOrErrors: ValueOrErrors<void> = {
      isEither: false,
      value: undefined,
    };

    return contextOrErrors;
  }
}
