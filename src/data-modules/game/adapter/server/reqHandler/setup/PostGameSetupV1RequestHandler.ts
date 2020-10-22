import {
  Converter,
  Interactor,
  ValidationResult,
  Validator,
} from '../../../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { ExtendedGameSetup } from '../../../../domain/model/setup/ExtendedGameSetup';
import { ExtendedGameSetupApiV1 } from '../../../api/model/setup/ExtendedGameSetupApiV1';
import { FastifyRequestHandler } from '../../../../../../layer-modules/server/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { GameSetupCreationQueryApiV1 } from '../../../api/query/setup/GameSetupCreationQueryApiV1';
import { GameSetupsCreationQuery } from '../../../../domain/query/setup/GameSetupCreationQuery';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class PostGameSetupV1RequestHandler implements FastifyRequestHandler {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.converter.setup
        .GAME_SETUP_CREATION_QUERY_API_V1_TO_GAME_SETUP_CREATION_QUERY_CONVERTER,
    )
    private readonly gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter: Converter<
      GameSetupCreationQueryApiV1,
      GameSetupsCreationQuery
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.validator.setup
        .GAME_SETUP_CREATION_QUERY_API_V1_VALIDATOR,
    )
    private readonly gameSetupCreationQueryApiV1Validator: Validator<
      GameSetupCreationQueryApiV1
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.setup
        .EXTENDED_GAME_SETUP_TO_EXTENDED_GAME_SETUP_API_V1_CONVERTER,
    )
    private readonly extendedGameSetupToExtendedGameSetupApiV1Converter: Converter<
      ExtendedGameSetup,
      ExtendedGameSetupApiV1
    >,
    @inject(
      GAME_DOMAIN_TYPES.interactor.setup.CREATE_EXTENDED_GAME_SETUPS_INTERACTOR,
    )
    private readonly createExtendedGameSetupsInteractor: Interactor<
      GameSetupsCreationQuery,
      Promise<ExtendedGameSetup[]>
    >,
  ) {}

  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const validationResult: ValidationResult<GameSetupCreationQueryApiV1> = this.gameSetupCreationQueryApiV1Validator.validate(
      request.body,
    );

    if (validationResult.result) {
      const gameSetupCreationQuery: GameSetupsCreationQuery = this.gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter.transform(
        validationResult.model,
      );

      const [
        extendedGameSetupCreated,
      ]: ExtendedGameSetup[] = await this.createExtendedGameSetupsInteractor.interact(
        gameSetupCreationQuery,
      );

      const extendedGameSetupApiV1Created: ExtendedGameSetupApiV1 = this.extendedGameSetupToExtendedGameSetupApiV1Converter.transform(
        extendedGameSetupCreated,
      );

      await reply.send(extendedGameSetupApiV1Created);
    } else {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send(validationResult.errorMessage);
    }
  }
}
