import {
  ContextBasedValidator,
  Converter,
  Interactor,
  ValidationResult,
} from '../../../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { ExtendedGameSetup } from '../../../../domain/model/setup/ExtendedGameSetup';
import { ExtendedGameSetupApiV1 } from '../../../api/model/setup/ExtendedGameSetupApiV1';
import { FastifyRequestHandler } from '../../../../../../integration-modules/fastify/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { GameSetupUpdateQuery } from '../../../../domain/query/setup/GameSetupUpdateQuery';
import { GameSetupUpdateQueryApiV1 } from '../../../api/query/setup/GameSetupUpdateQueryApiV1';
import { GameSetupUpdateQueryApiV1ValidationContext } from '../../../api/validator/setup/GameSetupUpdateQueryApiV1ValidationContext';
import { StatusCodes } from 'http-status-codes';
import { UserContainer } from '../../../../../user/domain';

@injectable()
export class PatchGameSetupByIdV1RequestHandler
  implements FastifyRequestHandler<FastifyRequest & UserContainer> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.setup
        .EXTENDED_GAME_SETUP_TO_EXTENDED_GAME_SETUP_API_V1_CONVERTER,
    )
    private readonly extendedGameSetupToExtendedGameSetupApiV1Converter: Converter<
      ExtendedGameSetup,
      ExtendedGameSetupApiV1
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.validator.setup
        .GAME_SETUP_UPDATE_QUERY_API_V1_CONTEXT_BASED_VALIDATOR,
    )
    private readonly gameSetupUpdateQueryApiV1ContextBasedValidator: ContextBasedValidator<
      GameSetupUpdateQueryApiV1,
      GameSetupUpdateQueryApiV1ValidationContext
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.setup
        .GAME_SETUP_UPDATE_QUERY_API_V1_TO_GAME_SETUP_UPDATE_QUERY_CONVERTER,
    )
    private readonly gameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter: Converter<
      GameSetupUpdateQueryApiV1,
      Promise<GameSetupUpdateQuery>
    >,
    @inject(
      GAME_DOMAIN_TYPES.interactor.setup.CREATE_EXTENDED_GAME_SETUPS_INTERACTOR,
    )
    private readonly updateExtendedGameSetupInteractor: Interactor<
      GameSetupUpdateQuery,
      Promise<ExtendedGameSetup | null>
    >,
  ) {}

  public async handle(
    request: FastifyRequest & UserContainer,
    reply: FastifyReply,
  ): Promise<void> {
    const validationResult: ValidationResult<GameSetupUpdateQueryApiV1> = this.gameSetupUpdateQueryApiV1ContextBasedValidator.validate(
      request.body,
      { user: request.user },
    );

    if (validationResult.result) {
      const gameSetupUpdateQueryApiV1: GameSetupUpdateQueryApiV1 =
        validationResult.model;

      const gameSetupUpdateQuery: GameSetupUpdateQuery = await this.gameSetupUpdateQueryApiV1ToGameSetupUpdateQueryConverter.transform(
        gameSetupUpdateQueryApiV1,
      );

      const extendedGameSetupUpdated: ExtendedGameSetup | null = await this.updateExtendedGameSetupInteractor.interact(
        gameSetupUpdateQuery,
      );

      if (extendedGameSetupUpdated === null) {
        await reply
          .code(StatusCodes.NOT_FOUND)
          .send({ message: 'No game setup was found to be updated' });
      } else {
        const extendedGameSetupApiV1Updated: ExtendedGameSetupApiV1 = this.extendedGameSetupToExtendedGameSetupApiV1Converter.transform(
          extendedGameSetupUpdated,
        );

        await reply.send(extendedGameSetupApiV1Updated);
      }
    } else {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: validationResult.errorMessage });
    }
  }
}
