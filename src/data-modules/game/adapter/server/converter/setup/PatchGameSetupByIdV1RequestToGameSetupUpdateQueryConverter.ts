import * as fastify from 'fastify';
import { inject, injectable } from 'inversify';

import {
  Converter,
  Validator,
  ValueOrErrors,
} from '../../../../../../common/domain';
import { RequestToQueryConverter } from '../../../../../../layer-modules/server/adapter';
import { UserContainer } from '../../../../../user/domain';
import { GameSetupUpdateQuery } from '../../../../domain/query/setup/GameSetupUpdateQuery';
import { GameSetupUpdateQueryApiV1 } from '../../../api/query/setup/GameSetupUpdateQueryApiV1';
import { GameSetupUpdateQueryApiV1ValidationContext } from '../../../api/validator/setup/GameSetupUpdateQueryApiV1ValidationContext';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

@injectable()
export class PatchGameSetupByIdV1RequestToGameSetupUpdateQueryConverter extends RequestToQueryConverter<
  fastify.FastifyRequest & UserContainer,
  GameSetupUpdateQuery,
  GameSetupUpdateQueryApiV1,
  GameSetupUpdateQueryApiV1ValidationContext
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.validator.setup
        .GAME_SETUP_UPDATE_QUERY_API_V1_SEMANTIC_VALIDATOR,
    )
    contextBasedValidator:
      | Validator<
          GameSetupUpdateQuery,
          GameSetupUpdateQueryApiV1,
          GameSetupUpdateQueryApiV1ValidationContext
        >
      | undefined,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.setup
        .GAME_SETUP_UPDATE_QUERY_API_V1_TO_GAME_SETUP_UPDATE_QUERY_CONVERTER,
    )
    queryApiToQueryConverter: Converter<
      GameSetupUpdateQueryApiV1,
      Promise<GameSetupUpdateQuery>,
      GameSetupUpdateQueryApiV1ValidationContext
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.validator.setup
        .GAME_SETUP_UPDATE_QUERY_API_V1_VALIDATOR,
    )
    syntaxValidator: Validator<GameSetupUpdateQueryApiV1>,
  ) {
    super(contextBasedValidator, queryApiToQueryConverter, syntaxValidator);
  }

  protected extractRequestQuery(
    request: fastify.FastifyRequest & UserContainer,
  ): unknown {
    const gameSetupUpdateQueryApiV1ToValidate: unknown = {
      ...(request.body as Record<string, unknown>),
      id: (request.params as { gameSetupId: string }).gameSetupId,
    };

    return gameSetupUpdateQueryApiV1ToValidate;
  }

  protected async getContextOrErrors(
    request: fastify.FastifyRequest & UserContainer,
  ): Promise<ValueOrErrors<GameSetupUpdateQueryApiV1ValidationContext>> {
    const gameSetupUpdateQueryApiV1ValidationContext: GameSetupUpdateQueryApiV1ValidationContext = {
      user: request.user,
    };

    const contextOrErrors: ValueOrErrors<GameSetupUpdateQueryApiV1ValidationContext> = {
      isEither: false,
      value: gameSetupUpdateQueryApiV1ValidationContext,
    };

    return contextOrErrors;
  }
}
