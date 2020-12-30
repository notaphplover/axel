import {
  Converter,
  Interactor,
  ValidationResult,
  Validator,
} from '../../../../../../common/domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { FastifyRequestHandler } from '../../../../../../integration-modules/fastify/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { GameCreationQueryApiV1 } from '../../../api/query/GameCreationQueryApiV1';
import { LiveGame } from '../../../../domain/model/live/LiveGame';
import { LiveGameApiV1 } from '../../../api/model/live/LiveGameApiV1';
import { LiveGameCreationQuery } from '../../../../domain/query/live/LiveGameCreationQuery';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class PostLiveGameV1RequestHandler implements FastifyRequestHandler {
  constructor(
    @inject(GAME_DOMAIN_TYPES.interactor.live.CREATE_LIVE_GAMES_INTERACTOR)
    private readonly createGamesInteractor: Interactor<
      LiveGameCreationQuery,
      Promise<LiveGame[]>
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.validator.GAME_CREATION_QUERY_API_V1_VALIDATOR,
    )
    private readonly gameCreationQueryApiV1Validator: Validator<GameCreationQueryApiV1>,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.live
        .LIVE_GAME_TO_LIVE_GAME_API_V1_CONVERTER,
    )
    private readonly gameToGameApiV1Converter: Converter<
      LiveGame,
      LiveGameApiV1
    >,
  ) {}

  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const validationResult: ValidationResult<GameCreationQueryApiV1> = this.gameCreationQueryApiV1Validator.validate(
      request.body,
    );
    if (validationResult.result) {
      const gameCreationQuery: LiveGameCreationQuery = {
        round: validationResult.model.round,
      };
      const [
        gameCreated,
      ]: LiveGame[] = await this.createGamesInteractor.interact(
        gameCreationQuery,
      );

      const gameApiV1Created: LiveGameApiV1 = this.gameToGameApiV1Converter.transform(
        gameCreated,
      );

      await reply.send(gameApiV1Created);
    } else {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: validationResult.errorMessage });
    }
  }
}
