import { inject, injectable } from 'inversify';
import Joi from 'joi';

import { JoiObjectValidator } from '../../../../../../integration-modules/joi/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { UpsertLiveGameRoomQueryWsApiV1 } from '../../query/UpsertLiveGameRoomQueryWsApiV1';

@injectable()
export class JoinLiveGameRoomMessageWsApiV1Validator extends JoiObjectValidator<UpsertLiveGameRoomQueryWsApiV1> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.ws.validator.schema.query
        .UPSERT_LIVE_GAME_ROOM_QUERY_WS_API_V1_JOI_VALIDATOR_SCHEMA,
    )
    upsertLiveGameRoomQueryWsApiV1JoiValidatorSchema: Joi.ObjectSchema<UpsertLiveGameRoomQueryWsApiV1>,
  ) {
    super(upsertLiveGameRoomQueryWsApiV1JoiValidatorSchema);
  }
}
