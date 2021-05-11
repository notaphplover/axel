import Joi from 'joi';

import { LiveGameFindQueryApiV1 } from '../../../../query/live/LiveGameFindQueryApiV1';

export const liveGameFindQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<LiveGameFindQueryApiV1> =
  Joi.object({
    id: Joi.string().strict(),
  });
