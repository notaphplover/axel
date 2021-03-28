import { interfaces } from 'inversify';

import { QueryWsApiToUpsertLiveGameRoomQueryConverter } from '../../../ws/converter/QueryWsApiToUpsertLiveGameRoomQueryConverter';
import { UpsertLiveGameRoomQueryWsApiV1ToUpsertLiveGameRoomQueryConverter } from '../../../ws/converter/UpsertLiveGameRoomQueryWsApiV1ToUpsertLiveGameRoomQueryConverter';
import { UpsertLiveGameRoomQueryWsApiV1SemanticValidator } from '../../../ws/validator/query/UpsertLiveGameRoomQueryWsApiV1SemanticValidator';
import { UpsertLiveGameRoomQueryWsApiV1Validator } from '../../../ws/validator/query/UpsertLiveGameRoomQueryWsApiV1Validator';
import { upsertLiveGameRoomQueryWsApiV1JoiValidatorSchema } from '../../../ws/validator/schema/message/upsertLiveGameRoomQueryWsApiV1JoiValidatorSchema';
import { GAME_ADAPTER_TYPES } from '../../types';

export function bindGameAdapterWs(bind: interfaces.Bind): void {
  bind(
    GAME_ADAPTER_TYPES.ws.converter
      .UPSERT_LIVE_GAME_ROOM_QUERY_WS_API_V1_TO_UPSERT_LIVE_GAME_ROOM_QUERY_CONVERTER,
  ).to(UpsertLiveGameRoomQueryWsApiV1ToUpsertLiveGameRoomQueryConverter);
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
