import * as fastify from 'fastify';
import { inject, injectable } from 'inversify';

import { Converter, Validator } from '../../../../../../common/domain';
import { ValueOrErrors } from '../../../../../../common/domain/either/ValueOrErrors';
import { RequestToQueryConverter } from '../../../../../../layer-modules/server/adapter';
import { CardCreationQuery } from '../../../../domain/query/card/CardCreationQuery';
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

  protected async getContextOrErrors(): Promise<ValueOrErrors<void>> {
    const contextOrErrors: ValueOrErrors<void> = {
      isEither: false,
      value: undefined,
    };

    return contextOrErrors;
  }
}
