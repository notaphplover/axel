import { inject, injectable } from 'inversify';
import Joi from 'joi';

import { JoiObjectValidator } from '../../../../../../integration-modules/joi/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { JoinLiveGameRoomMessageWsApiV1 } from '../../message/JoinLiveGameRoomMessageWsApiV1';

@injectable()
export class JoinLiveGameRoomMessageWsApiV1Validator extends JoiObjectValidator<JoinLiveGameRoomMessageWsApiV1> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.ws.validator.schema.message
        .JOIN_LIVE_GAME_ROOM_MESSAGE_WS_API_V1_JOI_VALIDATOR_SCHEMA,
    )
    joinLiveGameRoomMessageWsApiV1JoiValidatorSchema: Joi.ObjectSchema<JoinLiveGameRoomMessageWsApiV1>,
  ) {
    super(joinLiveGameRoomMessageWsApiV1JoiValidatorSchema);
  }
}
