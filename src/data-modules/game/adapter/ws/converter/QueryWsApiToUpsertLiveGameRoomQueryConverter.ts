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
import { UpsertLiveGameRoomQuery } from '../../../domain/message/UpsertLiveGameRoomQuery';
import { LiveGame } from '../../../domain/model/live/LiveGame';
import { LiveGameFindQuery } from '../../../domain/query/live/LiveGameFindQuery';
import { GAME_ADAPTER_TYPES } from '../../config/types';
import { UpsertLiveGameRoomQueryWsApiV1 } from '../query/UpsertLiveGameRoomQueryWsApiV1';
import { UpsertLiveGameRoomQueryWsApiV1ValidationContext } from '../validator/query/UpsertLiveGameRoomQueryWsApiV1ValidationContext';

@injectable()
export class QueryWsApiToUpsertLiveGameRoomQueryConverter extends QueryWsApiToQueryConverter<
  UpsertLiveGameRoomQueryWsApiV1,
  UpsertLiveGameRoomQuery,
  UpsertLiveGameRoomQueryWsApiV1ValidationContext
> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.ws.validator.query
        .UPSERT_LIVE_GAME_ROOM_QUERY_WS_API_V1_SEMANTIC_VALIDATOR,
    )
    joinLiveGameRoomMessageWsApiV1SemanticValidator: Validator<
      UpsertLiveGameRoomQueryWsApiV1,
      UpsertLiveGameRoomQueryWsApiV1,
      UpsertLiveGameRoomQueryWsApiV1ValidationContext
    >,
    @inject(
      GAME_ADAPTER_TYPES.ws.converter
        .JOIN_LIVE_GAME_ROOM_MESSAGE_WS_API_V1_TO_UPSERT_LIVE_GAME_ROOM_QUERY_CONVERTER,
    )
    joinLiveGameRoomMessageWsApiV1ToJoinLiveGameRoomMessageConverter: Converter<
      UpsertLiveGameRoomQueryWsApiV1,
      Promise<UpsertLiveGameRoomQuery>,
      UpsertLiveGameRoomQueryWsApiV1ValidationContext
    >,
    @inject(
      GAME_ADAPTER_TYPES.ws.validator.query
        .UPSERT_LIVE_GAME_ROOM_QUERY_WS_API_V1_VALIDATOR,
    )
    joinLiveGameRoomMessageWsApiV1Validator: Validator<UpsertLiveGameRoomQueryWsApiV1>,
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
    messageWsApi: UpsertLiveGameRoomQueryWsApiV1,
    requestContext: AppWsRequestContext,
  ): Promise<ValueOrErrors<UpsertLiveGameRoomQueryWsApiV1ValidationContext>> {
    const liveGameFindQuery: LiveGameFindQuery = {
      id: messageWsApi.liveGameId,
    };

    const liveGame: LiveGame | null = await this.findLiveGameInteractor.interact(
      liveGameFindQuery,
    );

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
