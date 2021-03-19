import { interfaces } from 'inversify';

import { joinLiveGameRoomMessageWsApiV1JoiValidatorSchema } from '../../../ws/validator/schema/message/joinLiveGameRoomMessageWsApiV1JoiValidatorSchema';
import { GAME_ADAPTER_TYPES } from '../../types';

export function bindGameAdapterWs(bind: interfaces.Bind): void {
  bind(
    GAME_ADAPTER_TYPES.ws.validator.schema.message
      .JOIN_LIVE_GAME_ROOM_MESSAGE_WS_API_V1_JOI_VALIDATOR_SCHEMA,
  ).toConstantValue(joinLiveGameRoomMessageWsApiV1JoiValidatorSchema);
}
