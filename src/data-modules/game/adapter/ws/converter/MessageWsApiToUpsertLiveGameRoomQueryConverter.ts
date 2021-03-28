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
import { JoinLiveGameRoomMessageWsApiV1 } from '../message/JoinLiveGameRoomMessageWsApiV1';
import { JoinLiveGameRoomMessageWsApiV1ValidationContext } from '../validator/message/JoinLiveGameRoomMessageWsApiV1ValidationContext';

@injectable()
export class MessageWsApiToUpsertLiveGameRoomQueryConverter extends QueryWsApiToQueryConverter<
  JoinLiveGameRoomMessageWsApiV1,
  UpsertLiveGameRoomQuery,
  JoinLiveGameRoomMessageWsApiV1ValidationContext
> {
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.ws.validator.message
        .JOIN_LIVE_GAME_ROOM_MESSAGE_WS_API_V1_SEMANTIC_VALIDATOR,
    )
    joinLiveGameRoomMessageWsApiV1SemanticValidator: Validator<
      JoinLiveGameRoomMessageWsApiV1,
      JoinLiveGameRoomMessageWsApiV1,
      JoinLiveGameRoomMessageWsApiV1ValidationContext
    >,
    @inject(
      GAME_ADAPTER_TYPES.ws.converter
        .JOIN_LIVE_GAME_ROOM_MESSAGE_WS_API_V1_TO_UPSERT_LIVE_GAME_ROOM_QUERY_CONVERTER,
    )
    joinLiveGameRoomMessageWsApiV1ToJoinLiveGameRoomMessageConverter: Converter<
      JoinLiveGameRoomMessageWsApiV1,
      Promise<UpsertLiveGameRoomQuery>,
      JoinLiveGameRoomMessageWsApiV1ValidationContext
    >,
    @inject(
      GAME_ADAPTER_TYPES.ws.validator.message
        .JOIN_LIVE_GAME_ROOM_MESSAGE_WS_API_V1_VALIDATOR,
    )
    joinLiveGameRoomMessageWsApiV1Validator: Validator<JoinLiveGameRoomMessageWsApiV1>,
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
    messageWsApi: JoinLiveGameRoomMessageWsApiV1,
    requestContext: AppWsRequestContext,
  ): Promise<ValueOrErrors<JoinLiveGameRoomMessageWsApiV1ValidationContext>> {
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
