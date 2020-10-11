import {
  Converter,
  Interactor,
  ValidationResult,
  Validator,
} from '../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { FastifyRequestHandler } from '../../../../layer-modules/server/adapter';
import { GAME_ADAPTER_TYPES } from '../../config/types';
import { GAME_DOMAIN_TYPES } from '../../../domain/config/types';
import { Game } from '../../../domain/model/Game';
import { GameApiV1 } from '../../api/model/GameApiV1';
import { GameCreationQuery } from '../../../domain/query/GameCreationQuery';
import { GameCreationQueryApiV1 } from '../../api/query/GameCreationQueryApiV1';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class PostGameV1RequestHandler implements FastifyRequestHandler {
  constructor(
    @inject(GAME_DOMAIN_TYPES.interactor.CREATE_GAMES_INTERACTOR)
    private readonly createGamesInteractor: Interactor<
      GameCreationQuery,
      Promise<Game[]>
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.validator.GAME_CREATION_QUERY_API_V1_VALIDATOR,
    )
    private readonly gameCreationQueryApiV1Validator: Validator<
      GameCreationQueryApiV1
    >,
    @inject(GAME_ADAPTER_TYPES.api.converter.GAME_TO_GAME_API_V1_CONVERTER)
    private readonly gameToGameApiV1Converter: Converter<Game, GameApiV1>,
  ) {}

  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const validationResult: ValidationResult<GameCreationQueryApiV1> = this.gameCreationQueryApiV1Validator.validate(
      request.body,
    );
    if (validationResult.result) {
      const gameCreationQuery: GameCreationQuery = {
        round: validationResult.model.round,
      };
      const [gameCreated]: Game[] = await this.createGamesInteractor.interact(
        gameCreationQuery,
      );

      const gameApiV1Created: GameApiV1 = this.gameToGameApiV1Converter.transform(
        gameCreated,
      );

      await reply.send(gameApiV1Created);
    } else {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send(validationResult.errorMessage);
    }
  }
}
