import { interfaces } from 'inversify';

import { JoinLiveGameRoomMessageWsApiV1ToUpsertLiveGameRoomQueryConverter } from '../../../ws/converter/JoinLiveGameRoomMessageWsApiV1ToUpsertLiveGameRoomQueryConverter';
import { MessageWsApiToUpsertLiveGameRoomQueryConverter } from '../../../ws/converter/MessageWsApiToUpsertLiveGameRoomQueryConverter';
import { JoinLiveGameRoomMessageWsApiV1SemanticValidator } from '../../../ws/validator/message/JoinLiveGameRoomMessageWsApiV1SemanticValidator';
import { JoinLiveGameRoomMessageWsApiV1Validator } from '../../../ws/validator/message/JoinLiveGameRoomMessageWsApiV1Validator';
import { joinLiveGameRoomMessageWsApiV1JoiValidatorSchema } from '../../../ws/validator/schema/message/joinLiveGameRoomMessageWsApiV1JoiValidatorSchema';
import { GAME_ADAPTER_TYPES } from '../../types';

export function bindGameAdapterWs(bind: interfaces.Bind): void {
  bind(
    GAME_ADAPTER_TYPES.ws.converter
      .JOIN_LIVE_GAME_ROOM_MESSAGE_WS_API_V1_TO_UPSERT_LIVE_GAME_ROOM_QUERY_CONVERTER,
  ).to(JoinLiveGameRoomMessageWsApiV1ToUpsertLiveGameRoomQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.ws.converter
      .MESSAGE_WS_API_TO_UPSERT_LIVE_GAME_ROOM_QUERY_CONVERTER,
  ).to(MessageWsApiToUpsertLiveGameRoomQueryConverter);

  bind(
    GAME_ADAPTER_TYPES.ws.validator.message
      .JOIN_LIVE_GAME_ROOM_MESSAGE_WS_API_V1_SEMANTIC_VALIDATOR,
  ).to(JoinLiveGameRoomMessageWsApiV1SemanticValidator);
  bind(
    GAME_ADAPTER_TYPES.ws.validator.message
      .JOIN_LIVE_GAME_ROOM_MESSAGE_WS_API_V1_VALIDATOR,
  ).toConstantValue(JoinLiveGameRoomMessageWsApiV1Validator);
  bind(
    GAME_ADAPTER_TYPES.ws.validator.schema.message
      .JOIN_LIVE_GAME_ROOM_MESSAGE_WS_API_V1_JOI_VALIDATOR_SCHEMA,
  ).toConstantValue(joinLiveGameRoomMessageWsApiV1JoiValidatorSchema);
}
