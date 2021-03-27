import Joi from 'joi';

import { GameMessageTypes } from '../../../message/GameMessageTypes';
import { JoinLiveGameRoomMessageWsApiV1 } from '../../../message/JoinLiveGameRoomMessageWsApiV1';

export const joinLiveGameRoomMessageWsApiV1JoiValidatorSchema: Joi.ObjectSchema<JoinLiveGameRoomMessageWsApiV1> = Joi.object(
  {
    type: Joi.string()
      .valid(GameMessageTypes.JoinLiveGameRoom)
      .strict()
      .required(),
    liveGameId: Joi.string().strict().required(),
    playerId: Joi.string().strict().required(),
  },
);
