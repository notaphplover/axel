import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../common/domain';
import { FastifyRequestHandler } from '../../../../../integration-modules/fastify/adapter';
import { GAME_ADAPTER_TYPES } from '../../config/types';
import { GAME_DOMAIN_TYPES } from '../../../domain/config/types';
import { GameApiV1 } from '../../api/model/GameApiV1';
import { GameFindQuery } from '../../../domain/query/GameFindQuery';
import { Interactor } from '../../../../../common/domain';
import { LiveGame } from '../../../domain/model/live/LiveGame';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class GetGameByIdV1RequestHandler implements FastifyRequestHandler {
  constructor(
    @inject(GAME_DOMAIN_TYPES.interactor.live.FIND_GAME_INTERACTOR)
    private readonly findGameInteractor: Interactor<
      GameFindQuery,
      Promise<LiveGame | null>
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.live.LIVE_GAME_TO_GAME_API_V1_CONVERTER,
    )
    private readonly gameToGameApiV1Port: Converter<LiveGame, GameApiV1>,
  ) {}

  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const findGameQuery: GameFindQuery = {
      id: (request.params as { gameId: string }).gameId,
    };

    const findResult: LiveGame | null = await this.findGameInteractor.interact(
      findGameQuery,
    );

    if (findResult === null) {
      await reply.code(StatusCodes.NOT_FOUND).send({
        message: `The game with id "${
          findGameQuery.id as string
        }" was not found`,
      });
    } else {
      await reply.send(this.gameToGameApiV1Port.transform(findResult));
    }
  }
}
