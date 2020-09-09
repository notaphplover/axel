import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { Converter } from '../../../../common/domain';
import { FastifyRequestHandler } from '../../../../layer-modules/server/adapter';
import { GAME_ADAPTER_TYPES } from '../../config/types';
import { GAME_DOMAIN_TYPES } from '../../../domain/config/types';
import { Game } from '../../../domain/model/Game';
import { GameApiV1 } from '../../api/model/GameApiV1';
import { GameFindQuery } from '../../../domain/query/GameFindQuery';
import { Interactor } from '../../../../common/domain';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class GetGameByIdV1RequestHandler implements FastifyRequestHandler {
  constructor(
    @inject(GAME_DOMAIN_TYPES.interactor.FIND_GAME_INTERACTOR)
    private readonly findGameInteractor: Interactor<
      GameFindQuery,
      Promise<Game | null>
    >,
    @inject(GAME_ADAPTER_TYPES.api.converter.GAME_TO_GAME_API_V1_CONVERTER)
    private readonly gameToGameApiV1Port: Converter<Game, GameApiV1>,
  ) {}

  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const findGameQuery: GameFindQuery = {
      id: (request.params as { gameId: string }).gameId,
    };

    const findResult: Game | null = await this.findGameInteractor.interact(
      findGameQuery,
    );

    if (findResult === null) {
      await reply
        .code(StatusCodes.NOT_FOUND)
        .send(`The game with id "${findGameQuery.id as string}" was not found`);
    } else {
      await reply.send(this.gameToGameApiV1Port.transform(findResult));
    }
  }
}
