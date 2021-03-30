import { inject, injectable } from 'inversify';
import Joi from 'joi';

import { JoiObjectValidator } from '../../../../../../integration-modules/joi/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { LiveGameRoomUpsertQueryWsApiV1 } from '../../query/LiveGameRoomUpsertQueryWsApiV1';

@injectable()
export class LiveGameRoomUpsertQueryWsApiV1Validator extends JoiObjectValidator<LiveGameRoomUpsertQueryWsApiV1> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.ws.validator.schema.query
        .LIVE_GAME_ROOM_UPSERT_QUERY_WS_API_V1_JOI_VALIDATOR_SCHEMA,
    )
    liveGameRoomUpsertQueryWsApiV1JoiValidatorSchema: Joi.ObjectSchema<LiveGameRoomUpsertQueryWsApiV1>,
  ) {
    super(liveGameRoomUpsertQueryWsApiV1JoiValidatorSchema);
  }
}
