import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { Converter } from '../../../../common/domain';
import { FastifyRequestHandler } from '../../../../common/adapter';
import { GAME_DOMAIN_TYPES } from '../../../domain/config/types';
import { GAME_PORT_TYPES } from '../../../port/config/types';
import { Game } from '../../../domain/model/Game';
import { GameApiV1 } from '../../api/model/GameApiV1';
import { GameFindQuery } from '../../../domain/query/GameFindQuery';
import { Interactor } from '../../../../common/domain';

@injectable()
export class GetGameByIdV1RequestHandler
  implements FastifyRequestHandler<Promise<void>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.interactor.FIND_GAME_INTERACTOR)
    private readonly findGameInteractor: Interactor<
      GameFindQuery,
      Promise<Game | null>
    >,
    @inject(GAME_PORT_TYPES.api.GAME_TO_GAME_API_V1_PORT)
    private readonly gameToGameApiV1Port: Converter<Game, GameApiV1>,
  ) {}

  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<Promise<void>> {
    const findGameQuery: GameFindQuery = {
      id: (request.params as { gameId: string }).gameId,
    };

    const findResult: Game | null = await this.findGameInteractor.interact(
      findGameQuery,
    );

    if (findResult === null) {
      reply.callNotFound();
    } else {
      await reply.send(this.gameToGameApiV1Port.transform(findResult));
    }
  }
}
