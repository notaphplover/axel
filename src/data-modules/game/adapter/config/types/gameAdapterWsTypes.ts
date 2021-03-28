// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_WS_TYPES = {
  converter: {
    UPSERT_LIVE_GAME_ROOM_QUERY_WS_API_V1_TO_UPSERT_LIVE_GAME_ROOM_QUERY_CONVERTER: Symbol(
      'UpsertLiveGameRoomQueryWsApiV1ToJoinLiveGameRoomMessageConverter',
    ),
    QUERY_WS_API_TO_UPSERT_LIVE_GAME_ROOM_QUERY_CONVERTER: Symbol(
      'QueryWsApiToJoinLiveGameRoomMessageConverter',
    ),
  },
  validator: {
    query: {
      UPSERT_LIVE_GAME_ROOM_QUERY_WS_API_V1_SEMANTIC_VALIDATOR: Symbol(
        'UpsertLiveGameRoomQueryWsApiV1SemanticValidator',
      ),
      UPSERT_LIVE_GAME_ROOM_QUERY_WS_API_V1_VALIDATOR: Symbol(
        'UpsertLiveGameRoomQueryWsApiV1Validator',
      ),
    },
    schema: {
      query: {
        UPSERT_LIVE_GAME_ROOM_QUERY_WS_API_V1_JOI_VALIDATOR_SCHEMA: Symbol(
          'upsertLiveGameRoomQueryWsApiV1JoiValidatorSchema',
        ),
      },
    },
  },
};
