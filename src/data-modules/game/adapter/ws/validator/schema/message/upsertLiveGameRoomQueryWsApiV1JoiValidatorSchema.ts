import Joi from 'joi';

import { GameQueryWsTypes } from '../../../query/GameQueryWsTypes';
import { UpsertLiveGameRoomQueryWsApiV1 } from '../../../query/UpsertLiveGameRoomQueryWsApiV1';

export const upsertLiveGameRoomQueryWsApiV1JoiValidatorSchema: Joi.ObjectSchema<UpsertLiveGameRoomQueryWsApiV1> = Joi.object(
  {
    type: Joi.string()
      .valid(GameQueryWsTypes.JoinLiveGameRoom)
      .strict()
      .required(),
    liveGameId: Joi.string().strict().required(),
    playerId: Joi.string().strict().required(),
  },
);
