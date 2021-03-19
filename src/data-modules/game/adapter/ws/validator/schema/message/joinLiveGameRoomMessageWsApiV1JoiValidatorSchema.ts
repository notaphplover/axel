import Joi from 'joi';

import { GameMessageTypes } from '../../../message/GameMessageTypes';
import { JoinLiveGameRoomMesageWsApiV1 } from '../../../message/JoinLiveGameRoomMesageWsApiV1';

export const joinLiveGameRoomMessageWsApiV1JoiValidatorSchema: Joi.ObjectSchema<JoinLiveGameRoomMesageWsApiV1> = Joi.object(
  {
    type: Joi.string()
      .valid(GameMessageTypes.JoinLiveGameRoom)
      .strict()
      .required(),
    liveGameId: Joi.string().strict().required(),
  },
);
