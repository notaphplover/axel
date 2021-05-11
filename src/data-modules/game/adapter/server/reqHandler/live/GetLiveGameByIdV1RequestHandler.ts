import * as fastify from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';

import {
  Converter,
  Interactor,
  ValueOrErrors,
} from '../../../../../../common/domain';
import { FastifyRequestHandler } from '../../../../../../integration-modules/fastify/adapter';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { LiveGame } from '../../../../domain/model/live/LiveGame';
import { LiveGameFindQuery } from '../../../../domain/query/live/LiveGameFindQuery';
import { LiveGameApiV1 } from '../../../api/model/live/LiveGameApiV1';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

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
    @inject(
      GAME_ADAPTER_TYPES.server.converter.live
        .GET_LIVE_GAME_V1_REQUEST_TO_LIVE_GAME_FIND_QUERY_CONVERTER,
    )
    private readonly getLiveGameV1RequestToLiveGameFindQueryConverter: Converter<
      fastify.FastifyRequest,
      Promise<ValueOrErrors<LiveGameFindQuery>>
    >,
  ) {}

  public async handle(
    request: fastify.FastifyRequest,
    reply: fastify.FastifyReply,
  ): Promise<void> {
    const liveGameFindQueryOrErrors: ValueOrErrors<LiveGameFindQuery> =
      await this.getLiveGameV1RequestToLiveGameFindQueryConverter.transform(
        request,
      );

    if (liveGameFindQueryOrErrors.isEither) {
      await reply
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: liveGameFindQueryOrErrors.value.join('/n') });
    } else {
      const liveGameFindQuery: LiveGameFindQuery =
        liveGameFindQueryOrErrors.value;

      const findResult: LiveGame | null =
        await this.findGameInteractor.interact(liveGameFindQuery);

      if (findResult === null) {
        await reply.code(StatusCodes.NOT_FOUND).send({
          message: `The game with id "${
            liveGameFindQuery.id as string
          }" was not found`,
        });
      } else {
        await reply.send(this.gameToGameApiV1Port.transform(findResult));
      }
    }
  }
}
