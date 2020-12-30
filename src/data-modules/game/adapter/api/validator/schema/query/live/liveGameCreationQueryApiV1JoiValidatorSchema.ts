import { GameCreationQueryApiV1 } from '../../../../query/live/LiveGameCreationQueryApiV1';
import Joi from 'joi';

export const liveGameCreationQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<GameCreationQueryApiV1> = Joi.object(
  {
    round: Joi.number().strict().required(),
  },
);
