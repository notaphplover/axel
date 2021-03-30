import { interfaces } from 'inversify';

import { LiveGameRoomUpsertQueryWsApiV1ToLiveGameRoomUpsertQueryConverter } from '../../../ws/converter/LiveGameRoomUpsertQueryWsApiV1ToLiveGameRoomUpsertQueryConverter';
import { QueryWsApiToLiveGameRoomUpsertQueryConverter } from '../../../ws/converter/QueryWsApiToLiveGameRoomUpsertQueryConverter';
import { LiveGameRoomUpsertQueryWsApiV1SemanticValidator } from '../../../ws/validator/query/LiveGameRoomUpsertQueryWsApiV1SemanticValidator';
import { LiveGameRoomUpsertQueryWsApiV1Validator } from '../../../ws/validator/query/LiveGameRoomUpsertQueryWsApiV1Validator';
import { liveGameRoomUpsertQueryWsApiV1JoiValidatorSchema } from '../../../ws/validator/schema/message/liveGameRoomUpsertQueryWsApiV1JoiValidatorSchema';
import { GAME_ADAPTER_TYPES } from '../../types';

export function bindGameAdapterWs(bind: interfaces.Bind): void {
  bind(
    GAME_ADAPTER_TYPES.ws.converter
      .LIVE_GAME_ROOM_UPSERT_QUERY_WS_API_V1_TO_LIVE_GAME_ROOM_UPSERT_QUERY_CONVERTER,
  ).to(LiveGameRoomUpsertQueryWsApiV1ToLiveGameRoomUpsertQueryConverter);
  bind(
    GAME_ADAPTER_TYPES.ws.converter
      .QUERY_WS_API_TO_LIVE_GAME_ROOM_UPSERT_QUERY_CONVERTER,
  ).to(QueryWsApiToLiveGameRoomUpsertQueryConverter);

  bind(
    GAME_ADAPTER_TYPES.ws.validator.query
      .LIVE_GAME_ROOM_UPSERT_QUERY_WS_API_V1_SEMANTIC_VALIDATOR,
  ).to(LiveGameRoomUpsertQueryWsApiV1SemanticValidator);
  bind(
    GAME_ADAPTER_TYPES.ws.validator.query
      .LIVE_GAME_ROOM_UPSERT_QUERY_WS_API_V1_VALIDATOR,
  ).toConstantValue(LiveGameRoomUpsertQueryWsApiV1Validator);
  bind(
    GAME_ADAPTER_TYPES.ws.validator.schema.query
      .LIVE_GAME_ROOM_UPSERT_QUERY_WS_API_V1_JOI_VALIDATOR_SCHEMA,
  ).toConstantValue(liveGameRoomUpsertQueryWsApiV1JoiValidatorSchema);
}
