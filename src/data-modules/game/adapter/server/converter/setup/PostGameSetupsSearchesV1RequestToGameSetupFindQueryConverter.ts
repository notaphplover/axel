import * as fastify from 'fastify';
import { inject, injectable } from 'inversify';

import {
  Converter,
  Validator,
  ValueOrErrors,
} from '../../../../../../common/domain';
import { RequestToQueryConverter } from '../../../../../../layer-modules/server/adapter';
import { GameSetupFindQuery } from '../../../../domain/query/setup/GameSetupFindQuery';
import { GameSetupFindQueryApiV1 } from '../../../api/query/setup/GameSetupFindQueryApiV1';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

@injectable()
export class PostGameSetupsSearchesV1RequestToGameSetupFindQueryConverter extends RequestToQueryConverter<
  fastify.FastifyRequest,
  GameSetupFindQuery,
  GameSetupFindQueryApiV1
> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.setup
        .GAME_SETUP_FIND_QUERY_API_V1_TO_GAME_SETUP_FIND_QUERY_CONVERTER,
    )
    queryApiToQueryConverter: Converter<
      GameSetupFindQueryApiV1,
      Promise<GameSetupFindQuery>
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.validator.setup
        .GAME_SETUP_FIND_QUERY_API_V1_VALIDATOR,
    )
    syntaxValidator: Validator<GameSetupFindQueryApiV1>,
  ) {
    super(undefined, queryApiToQueryConverter, syntaxValidator);
  }

  protected extractRequestQuery(request: fastify.FastifyRequest): unknown {
    return request.body;
  }
  protected async getContextOrErrors(): Promise<ValueOrErrors<void>> {
    const getContextOrErrors: ValueOrErrors<void> = {
      isEither: false,
      value: undefined,
    };

    return getContextOrErrors;
  }
}
