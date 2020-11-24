import {
  ContextBasedValidator,
  Converter,
  Interactor,
  ValidationResult,
} from '../../../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { BasicGameSetup } from '../../../../domain/model/setup/BasicGameSetup';
import { BasicGameSetupApiV1 } from '../../../api/model/setup/BasicGameSetupApiV1';
import { ExtendedGameSetup } from '../../../../domain/model/setup/ExtendedGameSetup';
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
        .BASIC_GAME_SETUP_TO_BASIC_GAME_SETUP_API_V1_CONVERTER,
    )
    private readonly basicGameSetupToBasicGameSetupApiV1Converter: Converter<
      BasicGameSetup,
      BasicGameSetupApiV1
    >,
    @inject(
      GAME_DOMAIN_TYPES.converter.setup
        .EXTENDED_GAME_SETUP_TO_BASIC_GAME_SETUP_CONVERTER,
    )
    private readonly extendedGameSetupToBasicGameSetupConverter: Converter<
      ExtendedGameSetup,
      BasicGameSetup
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
    @inject(GAME_DOMAIN_TYPES.interactor.setup.UPDATE_GAME_SETUP_INTERACTOR)
    private readonly updateExtendedGameSetupInteractor: Interactor<
      GameSetupUpdateQuery,
      Promise<ExtendedGameSetup | null>
    >,
  ) {}

  public async handle(
    request: FastifyRequest & UserContainer,
    reply: FastifyReply,
  ): Promise<void> {
    const gameSetupUpdateQueryApiV1ToValidate: unknown = {
      ...(request.body as Record<string, unknown>),
      id: (request.params as { gameSetupId: string }).gameSetupId,
    };
    const validationResult: ValidationResult<GameSetupUpdateQueryApiV1> = this.gameSetupUpdateQueryApiV1ContextBasedValidator.validate(
      gameSetupUpdateQueryApiV1ToValidate,
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
        const basicGameSetupUpdated: BasicGameSetup = this.extendedGameSetupToBasicGameSetupConverter.transform(
          extendedGameSetupUpdated,
        );
        const basicGameSetupApiV1Updated: BasicGameSetupApiV1 = this.basicGameSetupToBasicGameSetupApiV1Converter.transform(
          basicGameSetupUpdated,
        );

        await reply.send(basicGameSetupApiV1Updated);
      }
    } else {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: validationResult.errorMessage });
    }
  }
}
