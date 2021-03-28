import { interfaces } from 'inversify';

import { JoinLiveGameRoomMessageWsApiV1ToUpsertLiveGameRoomQueryConverter } from '../../../ws/converter/JoinLiveGameRoomMessageWsApiV1ToUpsertLiveGameRoomQueryConverter';
import { QueryWsApiToUpsertLiveGameRoomQueryConverter } from '../../../ws/converter/QueryWsApiToUpsertLiveGameRoomQueryConverter';
import { UpsertLiveGameRoomQueryWsApiV1SemanticValidator } from '../../../ws/validator/query/UpsertLiveGameRoomQueryWsApiV1SemanticValidator';
import { UpsertLiveGameRoomQueryWsApiV1Validator } from '../../../ws/validator/query/UpsertLiveGameRoomQueryWsApiV1Validator';
import { upsertLiveGameRoomQueryWsApiV1JoiValidatorSchema } from '../../../ws/validator/schema/message/upsertLiveGameRoomQueryWsApiV1JoiValidatorSchema';
import { GAME_ADAPTER_TYPES } from '../../types';

export function bindGameAdapterWs(bind: interfaces.Bind): void {
  bind(
    GAME_ADAPTER_TYPES.ws.converter
      .JOIN_LIVE_GAME_ROOM_MESSAGE_WS_API_V1_TO_UPSERT_LIVE_GAME_ROOM_QUERY_CONVERTER,
  ).to(JoinLiveGameRoomMessageWsApiV1ToUpsertLiveGameRoomQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.ws.converter
      .QUERY_WS_API_TO_UPSERT_LIVE_GAME_ROOM_QUERY_CONVERTER,
  ).to(QueryWsApiToUpsertLiveGameRoomQueryConverter);

  bind(
    GAME_ADAPTER_TYPES.ws.validator.query
      .UPSERT_LIVE_GAME_ROOM_QUERY_WS_API_V1_SEMANTIC_VALIDATOR,
  ).to(UpsertLiveGameRoomQueryWsApiV1SemanticValidator);
  bind(
    GAME_ADAPTER_TYPES.ws.validator.query
      .UPSERT_LIVE_GAME_ROOM_QUERY_WS_API_V1_VALIDATOR,
  ).toConstantValue(UpsertLiveGameRoomQueryWsApiV1Validator);
  bind(
    GAME_ADAPTER_TYPES.ws.validator.schema.query
      .UPSERT_LIVE_GAME_ROOM_QUERY_WS_API_V1_JOI_VALIDATOR_SCHEMA,
  ).toConstantValue(upsertLiveGameRoomQueryWsApiV1JoiValidatorSchema);
}
