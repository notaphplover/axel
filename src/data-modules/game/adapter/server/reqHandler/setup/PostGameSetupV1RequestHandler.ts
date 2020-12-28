import {
  ContextBasedValidator,
  Converter,
  Interactor,
  ValidationResult,
} from '../../../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { ExtendedGameSetupApiV1 } from '../../../api/model/setup/ExtendedGameSetupApiV1';
import { FastifyRequestHandler } from '../../../../../../integration-modules/fastify/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { GameSetup } from '../../../../domain/model/setup/GameSetup';
import { GameSetupCreationQueryApiV1 } from '../../../api/query/setup/GameSetupCreationQueryApiV1';
import { GameSetupCreationQueryApiV1ValidationContext } from '../../../api/validator/setup/GameSetupCreationQueryApiV1ValidationContext';
import { GameSetupsCreationQuery } from '../../../../domain/query/setup/GameSetupCreationQuery';
import { StatusCodes } from 'http-status-codes';
import { UserContainer } from '../../../../../user/domain';

@injectable()
export class PostGameSetupV1RequestHandler
  implements FastifyRequestHandler<FastifyRequest & UserContainer> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.setup
        .GAME_SETUP_CREATION_QUERY_API_V1_TO_GAME_SETUP_CREATION_QUERY_CONVERTER,
    )
    private readonly gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter: Converter<
      GameSetupCreationQueryApiV1,
      Promise<GameSetupsCreationQuery>
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.validator.setup
        .GAME_SETUP_CREATION_QUERY_API_V1_CONTEXT_BASED_VALIDATOR,
    )
    private readonly gameSetupCreationQueryApiV1ContextBasedValidator: ContextBasedValidator<
      GameSetupCreationQueryApiV1,
      GameSetupCreationQueryApiV1ValidationContext
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.setup
        .GAME_SETUP_TO_EXTENDED_GAME_SETUP_API_V1_CONVERTER,
    )
    private readonly gameSetupToExtendedGameSetupApiV1Converter: Converter<
      GameSetup,
      ExtendedGameSetupApiV1
    >,
    @inject(GAME_DOMAIN_TYPES.interactor.setup.CREATE_GAME_SETUPS_INTERACTOR)
    private readonly createGameSetupsInteractor: Interactor<
      GameSetupsCreationQuery,
      Promise<GameSetup[]>
    >,
  ) {}

  public async handle(
    request: FastifyRequest & UserContainer,
    reply: FastifyReply,
  ): Promise<void> {
    const validationResult: ValidationResult<GameSetupCreationQueryApiV1> = this.gameSetupCreationQueryApiV1ContextBasedValidator.validate(
      request.body,
      { user: request.user },
    );

    if (validationResult.result) {
      const gameSetupCreationQueryApiV1: GameSetupCreationQueryApiV1 =
        validationResult.model;

      const gameSetupCreationQuery: GameSetupsCreationQuery = await this.gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter.transform(
        gameSetupCreationQueryApiV1,
      );

      const [
        gameSetupCreated,
      ]: GameSetup[] = await this.createGameSetupsInteractor.interact(
        gameSetupCreationQuery,
      );

      const gameSetupApiV1Created: ExtendedGameSetupApiV1 = this.gameSetupToExtendedGameSetupApiV1Converter.transform(
        gameSetupCreated,
      );

      await reply.send(gameSetupApiV1Created);
    } else {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: validationResult.errorMessage });
    }
  }
}
