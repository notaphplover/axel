import * as fastify from 'fastify';
import { inject, injectable } from 'inversify';

import { Converter, Validator } from '../../../../../../common/domain';
import { ValueOrErrors } from '../../../../../../common/domain/either/ValueOrErrors';
import { RequestToQueryConverter } from '../../../../../../layer-modules/server/adapter';
import { LiveGameFindQuery } from '../../../../domain/query/live/LiveGameFindQuery';
import { LiveGameFindQueryApiV1 } from '../../../api/query/live/LiveGameFindQueryApiV1';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

@injectable()
export class GetLiveGameV1RequestToLiveGameFindQueryConverter extends RequestToQueryConverter<
  fastify.FastifyRequest,
  LiveGameFindQuery,
  LiveGameFindQueryApiV1
> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.live
        .LIVE_GAME_FIND_QUERY_API_V1_TO_LIVE_GAME_FIND_QUERY_CONVERTER,
    )
    queryApiToQueryConverter: Converter<
      LiveGameFindQueryApiV1,
      Promise<LiveGameFindQuery>
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.validator.live
        .LIVE_GAME_FIND_QUERY_API_V1_VALIDATOR,
    )
    syntaxValidator: Validator<LiveGameFindQueryApiV1>,
  ) {
    super(undefined, queryApiToQueryConverter, syntaxValidator);
  }

  protected extractRequestQuery(request: fastify.FastifyRequest): unknown {
    return { id: (request.params as { gameId: string }).gameId };
  }

  protected async getContextOrErrors(): Promise<ValueOrErrors<void>> {
    const contextOrErrors: ValueOrErrors<void> = {
      isEither: false,
      value: undefined,
    };

    return contextOrErrors;
  }
}
