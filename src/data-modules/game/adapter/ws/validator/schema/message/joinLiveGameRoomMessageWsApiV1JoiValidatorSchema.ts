import Joi from 'joi';

import { GameQueryWsTypes } from '../../../message/GameQueryWsTypes';
import { JoinLiveGameRoomMessageWsApiV1 } from '../../../message/JoinLiveGameRoomMessageWsApiV1';

export const joinLiveGameRoomMessageWsApiV1JoiValidatorSchema: Joi.ObjectSchema<JoinLiveGameRoomMessageWsApiV1> = Joi.object(
  {
    type: Joi.string()
      .valid(GameQueryWsTypes.JoinLiveGameRoom)
      .strict()
      .required(),
    liveGameId: Joi.string().strict().required(),
    playerId: Joi.string().strict().required(),
  },
);
