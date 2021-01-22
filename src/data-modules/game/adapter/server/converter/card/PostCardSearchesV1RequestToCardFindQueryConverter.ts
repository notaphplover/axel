import * as fastify from 'fastify';
import { Converter, Validator } from '../../../../../../common/domain';
import { inject, injectable } from 'inversify';
import { CardFindQuery } from '../../../../domain/query/card/CardFindQuery';
import { CardFindQueryApiV1 } from '../../../api/query/card/CardFindQueryApiV1';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { RequestToQueryConverter } from '../../../../../../layer-modules/server/adapter';
import { ValueOrErrors } from '../../../../../../common/domain/either/ValueOrErrors';

@injectable()
export class PostCardsSearchesV1RequestToCardFindQueryConverter extends RequestToQueryConverter<
  fastify.FastifyRequest,
  CardFindQuery,
  CardFindQueryApiV1
> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.card
        .CARD_FIND_QUERY_API_V1_TO_CARD_FIND_QUERY_CONVERTER,
    )
    queryApiToQueryConverter: Converter<
      CardFindQueryApiV1,
      Promise<CardFindQuery>
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.validator.card.CARD_FIND_QUERY_API_V1_VALIDATOR,
    )
    syntaxValidator: Validator<CardFindQueryApiV1>,
  ) {
    super(undefined, queryApiToQueryConverter, syntaxValidator);
  }

  protected extractRequestQuery(request: fastify.FastifyRequest): unknown {
    return request.body;
  }

  protected async getContextOrErrors(): Promise<ValueOrErrors<void>> {
    const contextOrErrors: ValueOrErrors<void> = {
      isEither: false,
      value: undefined,
    };

    return contextOrErrors;
  }
}
