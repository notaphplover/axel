import { inject, injectable } from 'inversify';
import WebSocket from 'ws';

import {
  Converter,
  Interactor,
  ValueOrErrors,
} from '../../../../../common/domain';
import {
  QueryWsApi,
  AppWsMessageHandler,
  AppWsRequestContext,
} from '../../../../app-ws/adapter';
import { GAME_DOMAIN_TYPES } from '../../../domain/config/types';
import { LiveGameRoom } from '../../../domain/model/live/room/LiveGameRoom';
import { LiveGameRoomUpsertQuery } from '../../../domain/query/live/room/LiveGameRoomUpsertQuery';
import { GAME_ADAPTER_TYPES } from '../../config/types';
import { GameQueryWsTypes } from '../query/GameQueryWsTypes';

@injectable()
export class LiveGameRoomUpsertQueryWsApiV1Handler
  implements AppWsMessageHandler<QueryWsApi, AppWsRequestContext> {
  public readonly messageTypes: string[];

  constructor(
    @inject(
      GAME_DOMAIN_TYPES.interactor.live.room.UPSERT_LIVE_GAME_ROOM_INTERACTOR,
    )
    private readonly upsertLiveGameRoomInteractor: Interactor<
      LiveGameRoomUpsertQuery,
      Promise<LiveGameRoom>
    >,
    @inject(
      GAME_ADAPTER_TYPES.ws.converter
        .QUERY_WS_API_TO_LIVE_GAME_ROOM_UPSERT_QUERY_CONVERTER,
    )
    private readonly queryWsApiToLiveGameRoomUpsertQueryConverter: Converter<
      QueryWsApi,
      Promise<ValueOrErrors<LiveGameRoomUpsertQuery>>,
      AppWsRequestContext
    >,
  ) {
    this.messageTypes = [GameQueryWsTypes.JoinLiveGameRoom];
  }

  public async handle(
    socket: WebSocket,
    query: QueryWsApi,
    context: AppWsRequestContext,
  ): Promise<void> {
    const liveGameRoomUpsertQueryOrErrors: ValueOrErrors<LiveGameRoomUpsertQuery> = await this.queryWsApiToLiveGameRoomUpsertQueryConverter.transform(
      query,
      context,
    );

    if (liveGameRoomUpsertQueryOrErrors.isEither) {
      socket.send({
        error: liveGameRoomUpsertQueryOrErrors.value.join('\n'),
        messageId: query.id,
      });
    } else {
      const liveGameRoomUpsertQuery: LiveGameRoomUpsertQuery =
        liveGameRoomUpsertQueryOrErrors.value;

      await this.upsertLiveGameRoomInteractor.interact(liveGameRoomUpsertQuery);

      socket.send({
        data: undefined,
        messageId: query.id,
      });
    }
  }
}
