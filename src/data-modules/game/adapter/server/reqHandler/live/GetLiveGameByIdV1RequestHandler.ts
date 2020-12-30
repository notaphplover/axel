import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { Converter } from '../../../../../../common/domain';
import { FastifyRequestHandler } from '../../../../../../integration-modules/fastify/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { Interactor } from '../../../../../../common/domain';
import { LiveGame } from '../../../../domain/model/live/LiveGame';
import { LiveGameApiV1 } from '../../../api/model/live/LiveGameApiV1';
import { LiveGameFindQuery } from '../../../../domain/query/live/LiveGameFindQuery';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class GetLiveGameByIdV1RequestHandler implements FastifyRequestHandler {
  constructor(
    @inject(GAME_DOMAIN_TYPES.interactor.live.FIND_GAME_INTERACTOR)
    private readonly findGameInteractor: Interactor<
      LiveGameFindQuery,
      Promise<LiveGame | null>
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.live
        .LIVE_GAME_TO_LIVE_GAME_API_V1_CONVERTER,
    )
    private readonly gameToGameApiV1Port: Converter<LiveGame, LiveGameApiV1>,
  ) {}

  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const findGameQuery: LiveGameFindQuery = {
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
