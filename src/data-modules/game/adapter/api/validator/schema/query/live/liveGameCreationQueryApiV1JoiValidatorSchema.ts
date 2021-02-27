import Joi from 'joi';

import { LiveGameCreationQueryApiV1 } from '../../../../query/live/LiveGameCreationQueryApiV1';

export const liveGameCreationQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<LiveGameCreationQueryApiV1> = Joi.object(
  {
    gameSetupId: Joi.string().strict().required(),
  },
);
