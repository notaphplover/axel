import * as fastify from 'fastify';
import { inject, injectable } from 'inversify';

import { Converter, Validator } from '../../../../../../common/domain';
import { ValueEither } from '../../../../../../common/domain/either/Either';
import { RequestToQueryConverter } from '../../../../../../layer-modules/server/adapter';
import { CardDeckCreationQuery } from '../../../../domain/query/deck/CardDeckCreationQuery';
import { CardDeckCreationQueryApiV1 } from '../../../api/query/deck/CardDeckCreationQueryApiV1';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

@injectable()
export class PostCardDeckV1RequestToCardDeckCreationQueryConverter extends RequestToQueryConverter<
  fastify.FastifyRequest,
  CardDeckCreationQuery,
  CardDeckCreationQueryApiV1
> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.deck
        .CARD_DECK_CREATION_QUERY_API_V1_TO_CARD_DECK_CREATION_QUERY_CONVERTER,
    )
    queryApiToQueryConverter: Converter<
      CardDeckCreationQueryApiV1,
      Promise<CardDeckCreationQuery>
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.validator.deck
        .CARD_DECK_CREATION_QUERY_API_V1_VALIDATOR,
    )
    syntaxValidator: Validator<CardDeckCreationQueryApiV1>,
  ) {
    super(undefined, queryApiToQueryConverter, syntaxValidator);
  }

  protected extractRequestQuery(request: fastify.FastifyRequest): unknown {
    return request.body;
  }

  protected async getContextOrErrors(): Promise<ValueEither<void>> {
    const contextOrErrors: ValueEither<void> = {
      isEither: false,
      value: undefined,
    };

    return contextOrErrors;
  }
}
