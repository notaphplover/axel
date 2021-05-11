import { inject, injectable } from 'inversify';

import {
  Converter,
  Interactor,
  Validator,
  ValueOrErrors,
} from '../../../../../common/domain';
import {
  AppWsRequestContext,
  QueryWsApiToQueryConverter,
} from '../../../../app-ws/adapter';
import { GAME_DOMAIN_TYPES } from '../../../domain/config/types';
import { LiveGame } from '../../../domain/model/live/LiveGame';
import { LiveGameFindQuery } from '../../../domain/query/live/LiveGameFindQuery';
import { LiveGameRoomUpsertQuery } from '../../../domain/query/live/room/LiveGameRoomUpsertQuery';
import { GAME_ADAPTER_TYPES } from '../../config/types';
import { LiveGameRoomUpsertQueryWsApiV1 } from '../query/LiveGameRoomUpsertQueryWsApiV1';
import { LiveGameRoomUpsertQueryWsApiV1ValidationContext } from '../validator/query/LiveGameRoomUpsertQueryWsApiV1ValidationContext';

@injectable()
export class QueryWsApiToLiveGameRoomUpsertQueryConverter extends QueryWsApiToQueryConverter<
  LiveGameRoomUpsertQueryWsApiV1,
  LiveGameRoomUpsertQuery,
  LiveGameRoomUpsertQueryWsApiV1ValidationContext
> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.ws.validator.query
        .LIVE_GAME_ROOM_UPSERT_QUERY_WS_API_V1_SEMANTIC_VALIDATOR,
    )
    joinLiveGameRoomMessageWsApiV1SemanticValidator: Validator<
      LiveGameRoomUpsertQueryWsApiV1,
      LiveGameRoomUpsertQueryWsApiV1,
      LiveGameRoomUpsertQueryWsApiV1ValidationContext
    >,
    @inject(
      GAME_ADAPTER_TYPES.ws.converter
        .LIVE_GAME_ROOM_UPSERT_QUERY_WS_API_V1_TO_LIVE_GAME_ROOM_UPSERT_QUERY_CONVERTER,
    )
    joinLiveGameRoomMessageWsApiV1ToJoinLiveGameRoomMessageConverter: Converter<
      LiveGameRoomUpsertQueryWsApiV1,
      Promise<LiveGameRoomUpsertQuery>,
      LiveGameRoomUpsertQueryWsApiV1ValidationContext
    >,
    @inject(
      GAME_ADAPTER_TYPES.ws.validator.query
        .LIVE_GAME_ROOM_UPSERT_QUERY_WS_API_V1_VALIDATOR,
    )
    joinLiveGameRoomMessageWsApiV1Validator: Validator<LiveGameRoomUpsertQueryWsApiV1>,
    @inject(GAME_DOMAIN_TYPES.interactor.live.FIND_GAME_INTERACTOR)
    private readonly findLiveGameInteractor: Interactor<
      LiveGameFindQuery,
      Promise<LiveGame | null>
    >,
  ) {
    super(
      joinLiveGameRoomMessageWsApiV1SemanticValidator,
      joinLiveGameRoomMessageWsApiV1ToJoinLiveGameRoomMessageConverter,
      joinLiveGameRoomMessageWsApiV1Validator,
    );
  }

  protected async getValidationContextOrErrors(
    messageWsApi: LiveGameRoomUpsertQueryWsApiV1,
    requestContext: AppWsRequestContext,
  ): Promise<ValueOrErrors<LiveGameRoomUpsertQueryWsApiV1ValidationContext>> {
    const liveGameFindQuery: LiveGameFindQuery = {
      id: messageWsApi.liveGameId,
    };

    const liveGame: LiveGame | null =
      await this.findLiveGameInteractor.interact(liveGameFindQuery);

    if (liveGame === null) {
      return {
        isEither: true,
        value: [`No live game with id ${messageWsApi.liveGameId} was found`],
      };
    } else {
      return {
        isEither: false,
        value: {
          liveGame: liveGame,
          playerGateway: requestContext.playerGateway,
          user: requestContext.user,
        },
      };
    }
  }
}
