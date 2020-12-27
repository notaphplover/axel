import {
  Converter,
  Interactor,
  ValidationResult,
  Validator,
} from '../../../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { BasicGameSetup } from '../../../../domain/model/setup/BasicGameSetup';
import { BasicGameSetupApiV1 } from '../../../api/model/setup/BasicGameSetupApiV1';
import { ExtendedGameSetup } from '../../../../domain/model/setup/ExtendedGameSetup';
import { FastifyRequestHandler } from '../../../../../../integration-modules/fastify/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { GameSetupFindQuery } from '../../../../domain/query/setup/GameSetupFindQuery';
import { GameSetupFindQueryApiV1 } from '../../../api/query/setup/GameSetupFindQueryApiV1';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class PostGameSetupsSearchesV1RequestHandler
  implements FastifyRequestHandler {
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
      GAME_DOMAIN_TYPES.interactor.setup.FIND_EXTENDED_GAME_SETUPS_INTERACTOR,
    )
    private readonly findExtendedGameSetupsInteractor: Interactor<
      GameSetupFindQuery,
      Promise<ExtendedGameSetup[]>
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.setup
        .GAME_SETUP_FIND_QUERY_API_V1_TO_GAME_SETUP_FIND_QUERY_CONVERTER,
    )
    private readonly gameSetupFindQueryApiV1ToGameSetupFindQueryConverter: Converter<
      GameSetupFindQueryApiV1,
      GameSetupFindQuery
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.validator.setup
        .GAME_SETUP_FIND_QUERY_API_V1_VALIDATOR,
    )
    private readonly gameSetupFindQueryApiV1Validator: Validator<GameSetupFindQueryApiV1>,
  ) {}

  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const validationResult: ValidationResult<GameSetupFindQueryApiV1> = this.gameSetupFindQueryApiV1Validator.validate(
      request.body,
    );

    if (validationResult.result) {
      const gameSetupFindQuery: GameSetupFindQuery = this.gameSetupFindQueryApiV1ToGameSetupFindQueryConverter.transform(
        validationResult.model,
      );
      const extendedGameSetupsFound: ExtendedGameSetup[] = await this.findExtendedGameSetupsInteractor.interact(
        gameSetupFindQuery,
      );

      const basicGameSetupsFound: BasicGameSetup[] = extendedGameSetupsFound.map(
        (extendedGameSetup: ExtendedGameSetup): BasicGameSetup =>
          this.extendedGameSetupToBasicGameSetupConverter.transform(
            extendedGameSetup,
          ),
      );

      const basicGameSetypsApiV1Found: BasicGameSetupApiV1[] = basicGameSetupsFound.map(
        (basicGameSetup: BasicGameSetup) =>
          this.basicGameSetupToBasicGameSetupApiV1Converter.transform(
            basicGameSetup,
          ),
      );

      await reply.send(basicGameSetypsApiV1Found);
    } else {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: validationResult.errorMessage });
    }
  }
}
