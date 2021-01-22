import * as fastify from 'fastify';
import { Converter, Interactor } from '../../../../../../common/domain';
import { inject, injectable } from 'inversify';
import { FastifyRequestHandler } from '../../../../../../integration-modules/fastify/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { LiveGame } from '../../../../domain/model/live/LiveGame';
import { LiveGameApiV1 } from '../../../api/model/live/LiveGameApiV1';
import { LiveGameCreationQuery } from '../../../../domain/query/live/LiveGameCreationQuery';
import { StatusCodes } from 'http-status-codes';
import { UserContainer } from '../../../../../user/domain';
import { ValueOrErrors } from '../../../../../../common/domain/either/ValueOrErrors';

@injectable()
export class PostLiveGameV1RequestHandler
  implements FastifyRequestHandler<fastify.FastifyRequest & UserContainer> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.interactor.live.CREATE_LIVE_GAMES_INTERACTOR)
    private readonly createGamesInteractor: Interactor<
      LiveGameCreationQuery,
      Promise<LiveGame[]>
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.live
        .LIVE_GAME_TO_LIVE_GAME_API_V1_CONVERTER,
    )
    private readonly gameToGameApiV1Converter: Converter<
      LiveGame,
      LiveGameApiV1
    >,
    @inject(
      GAME_ADAPTER_TYPES.server.converter.live
        .POST_LIVE_GAME_V1_REQUEST_TO_LIVE_GAME_CREATION_QUERY_CONVERTER,
    )
    private readonly postLiveGameV1RequestToLiveGameCreationQueryConverter: Converter<
      fastify.FastifyRequest & UserContainer,
      Promise<ValueOrErrors<LiveGameCreationQuery>>
    >,
  ) {}

  public async handle(
    request: fastify.FastifyRequest & UserContainer,
    reply: fastify.FastifyReply,
  ): Promise<void> {
    const queryOrErrors: ValueOrErrors<LiveGameCreationQuery> = await this.postLiveGameV1RequestToLiveGameCreationQueryConverter.transform(
      request,
    );
    if (queryOrErrors.isEither) {
      await reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ message: queryOrErrors.value.join('\n') });
    } else {
      const liveGameCreationQuery: LiveGameCreationQuery = queryOrErrors.value;

      const [
        gameCreated,
      ]: LiveGame[] = await this.createGamesInteractor.interact(
        liveGameCreationQuery,
      );

      const gameApiV1Created: LiveGameApiV1 = this.gameToGameApiV1Converter.transform(
        gameCreated,
      );

      await reply.send(gameApiV1Created);
    }
  }
}
