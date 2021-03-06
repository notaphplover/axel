import * as fastify from 'fastify';
import { inject, injectable } from 'inversify';

import {
  Converter,
  Interactor,
  ValueOrErrors,
} from '../../../../../../common/domain';
import { PostEntityRequestHandler } from '../../../../../../integration-modules/fastify/adapter';
import { UserContainer } from '../../../../../user/domain';
import { GAME_DOMAIN_TYPES } from '../../../../domain/config/types';
import { LiveGameConnections } from '../../../../domain/model/live/connection/LiveGameConnections';
import { LiveGame } from '../../../../domain/model/live/LiveGame';
import { LiveGameConnectionsCreationQuery } from '../../../../domain/query/live/connection/LiveGameConnectionsCreationQuery';
import { LiveGameCreationQuery } from '../../../../domain/query/live/LiveGameCreationQuery';
import { GameSetupDeletionQuery } from '../../../../domain/query/setup/GameSetupDeletionQuery';
import { LiveGameApiV1 } from '../../../api/model/live/LiveGameApiV1';
import { GAME_ADAPTER_TYPES } from '../../../config/types';

@injectable()
export class PostLiveGameV1RequestHandler extends PostEntityRequestHandler<
  LiveGame,
  LiveGameApiV1,
  LiveGameCreationQuery,
  fastify.FastifyRequest & UserContainer
> {
  constructor(
    @inject(
      GAME_DOMAIN_TYPES.interactor.live.connection
        .CREATE_LIVE_GAMES_CONNECTIONS_INTERACTOR,
    )
    private readonly createLiveGamesConnectionsInteractor: Interactor<
      LiveGameConnectionsCreationQuery,
      Promise<LiveGameConnections[]>
    >,
    @inject(GAME_DOMAIN_TYPES.interactor.live.CREATE_LIVE_GAMES_INTERACTOR)
    createLiveGamesInteractor: Interactor<
      LiveGameCreationQuery,
      Promise<LiveGame[]>
    >,
    @inject(GAME_DOMAIN_TYPES.interactor.setup.DELETE_GAME_SETUPS_INTERACTOR)
    private readonly deleteGameSetupInteractor: Interactor<
      GameSetupDeletionQuery,
      Promise<void>
    >,
    @inject(
      GAME_ADAPTER_TYPES.api.converter.live
        .LIVE_GAME_TO_LIVE_GAME_API_V1_CONVERTER,
    )
    gameToGameApiV1Converter: Converter<LiveGame, LiveGameApiV1>,
    @inject(
      GAME_ADAPTER_TYPES.server.converter.live
        .POST_LIVE_GAME_V1_REQUEST_TO_LIVE_GAME_CREATION_QUERY_CONVERTER,
    )
    postLiveGameV1RequestToLiveGameCreationQueryConverter: Converter<
      fastify.FastifyRequest & UserContainer,
      Promise<ValueOrErrors<LiveGameCreationQuery>>
    >,
  ) {
    super(
      gameToGameApiV1Converter,
      createLiveGamesInteractor,
      postLiveGameV1RequestToLiveGameCreationQueryConverter,
    );
  }

  protected async onEntityCreated(
    liveGameCreationQuery: LiveGameCreationQuery,
    liveGame: LiveGame,
  ): Promise<void> {
    const gameSetupDeletionQuery: GameSetupDeletionQuery = {
      id: liveGameCreationQuery.gameSetup.id,
    };

    const liveGameConnectionsCreationQuery: LiveGameConnectionsCreationQuery = {
      liveGameId: liveGame.id,
    };

    await Promise.all([
      this.createLiveGamesConnectionsInteractor.interact(
        liveGameConnectionsCreationQuery,
      ),
      this.deleteGameSetupInteractor.interact(gameSetupDeletionQuery),
    ]);
  }
}
