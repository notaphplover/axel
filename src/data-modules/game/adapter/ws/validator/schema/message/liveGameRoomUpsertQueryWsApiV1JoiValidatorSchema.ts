import Joi from 'joi';

import { GameQueryWsTypes } from '../../../query/GameQueryWsTypes';
import { LiveGameRoomUpsertQueryWsApiV1 } from '../../../query/LiveGameRoomUpsertQueryWsApiV1';

export const liveGameRoomUpsertQueryWsApiV1JoiValidatorSchema: Joi.ObjectSchema<LiveGameRoomUpsertQueryWsApiV1> = Joi.object(
  {
    type: Joi.string()
      .valid(GameQueryWsTypes.JoinLiveGameRoom)
      .strict()
      .required(),
    liveGameId: Joi.string().strict().required(),
    playerId: Joi.string().strict().required(),
  },
);
