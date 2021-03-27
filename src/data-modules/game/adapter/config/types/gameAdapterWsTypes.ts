// eslint-disable-next-line @typescript-eslint/typedef
export const GAME_ADAPTER_WS_TYPES = {
  converter: {
    JOIN_LIVE_GAME_ROOM_MESSAGE_WS_API_V1_TO_JOIN_LIVE_GAME_ROOM_MESSAGE_CONVERTER: Symbol(
      'JoinLiveGameRoomMessageWsApiV1ToJoinLiveGameRoomMessageConverter',
    ),
    MESSAGE_WS_API_TO_JOIN_LIVE_GAME_ROOM_MESSAGE_CONVERTER: Symbol(
      'MessageWsApiToJoinLiveGameRoomMessageConverter',
    ),
  },
  validator: {
    message: {
      JOIN_LIVE_GAME_ROOM_MESSAGE_WS_API_V1_SEMANTIC_VALIDATOR: Symbol(
        'JoinLiveGameRoomMessageWsApiV1SemanticValidator',
      ),
      JOIN_LIVE_GAME_ROOM_MESSAGE_WS_API_V1_VALIDATOR: Symbol(
        'JoinLiveGameRoomMessageWsApiV1Validator',
      ),
    },
    schema: {
      message: {
        JOIN_LIVE_GAME_ROOM_MESSAGE_WS_API_V1_JOI_VALIDATOR_SCHEMA: Symbol(
          'joinLiveGameRoomMessageWsApiV1JoiValidatorSchema',
        ),
      },
    },
  },
};
