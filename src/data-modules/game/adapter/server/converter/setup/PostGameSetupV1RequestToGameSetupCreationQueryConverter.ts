import * as fastify from 'fastify';
import { inject, injectable } from 'inversify';

import {
  Converter,
  Validator,
  ValueOrErrors,
} from '../../../../../../common/domain';
import { RequestToQueryConverter } from '../../../../../../layer-modules/server/adapter';
import { UserContainer } from '../../../../../user/domain';
import { GameSetupsCreationQuery } from '../../../../domain/query/setup/GameSetupCreationQuery';
import { GameSetupCreationQueryApiV1 } from '../../../api/query/setup/GameSetupCreationQueryApiV1';
import { GameSetupCreationQueryApiV1ValidationContext } from '../../../api/validator/setup/GameSetupCreationQueryApiV1ValidationContext';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

@injectable()
export class PostGameSetupV1RequestToGameSetupsCreationQueryConverter extends RequestToQueryConverter<
  fastify.FastifyRequest & UserContainer,
  GameSetupsCreationQuery,
  GameSetupCreationQueryApiV1,
  GameSetupCreationQueryApiV1ValidationContext
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.validator.setup
        .GAME_SETUP_CREATION_QUERY_API_V1_SEMANTIC_VALIDATOR,
    )
    contextBasedValidator: Validator<
      GameSetupCreationQueryApiV1,
      GameSetupCreationQueryApiV1,
      GameSetupCreationQueryApiV1ValidationContext
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.setup
        .GAME_SETUP_CREATION_QUERY_API_V1_TO_GAME_SETUP_CREATION_QUERY_CONVERTER,
    )
    queryApiToQueryConverter: Converter<
      GameSetupCreationQueryApiV1,
      Promise<GameSetupsCreationQuery>,
      GameSetupCreationQueryApiV1ValidationContext
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.validator.setup
        .GAME_SETUP_CREATION_QUERY_API_V1_VALIDATOR,
    )
    syntaxValidator: Validator<GameSetupCreationQueryApiV1>,
  ) {
    super(contextBasedValidator, queryApiToQueryConverter, syntaxValidator);
  }

  protected extractRequestQuery(request: fastify.FastifyRequest): unknown {
    return request.body;
  }

  protected async getContextOrErrors(
    request: fastify.FastifyRequest & UserContainer,
  ): Promise<ValueOrErrors<GameSetupCreationQueryApiV1ValidationContext>> {
    const contextOrErrors: ValueOrErrors<GameSetupCreationQueryApiV1ValidationContext> = {
      isEither: false,
      value: { user: request.user },
    };

    return contextOrErrors;
  }
}
