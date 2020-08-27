import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { GAME_DOMAIN_TYPES } from '../../../domain/config/types';
import { GAME_PORT_TYPES } from '../../../port/config/types';
import { Game } from '../../../domain/model/Game';
import { GameApiV1 } from '../../api/model/GameApiV1';
import { GameFindQuery } from '../../../domain/query/GameFindQuery';
import { Interactor } from '../../../../common/domain';
import { Port } from '../../../../common/port';
import { RequestHandler } from '../../../../common/adapter';

@injectable()
export class GetGameByIdV1RequestHandler
  implements RequestHandler<[FastifyRequest, FastifyReply], Promise<void>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.interactor.FIND_GAME_INTERACTOR)
    private readonly findGameInteractor: Interactor<
      GameFindQuery,
      Promise<Game | null>
    >,
    @inject(GAME_PORT_TYPES.api.GAME_TO_GAME_API_V1_PORT)
    private readonly gameToGameApiV1Port: Port<Game, GameApiV1>,
  ) {}

  public async handle([req, rep]: [FastifyRequest, FastifyReply]): Promise<
    Promise<void>
  > {
    const findGameQuery: GameFindQuery = {
      id: (req.params as { gameId: string }).gameId,
    };

    const findResult: Game | null = await this.findGameInteractor.interact(
      findGameQuery,
    );

    if (findResult === null) {
      rep.callNotFound();
    } else {
      await rep.send(this.gameToGameApiV1Port.transform(findResult));
    }
  }
}
