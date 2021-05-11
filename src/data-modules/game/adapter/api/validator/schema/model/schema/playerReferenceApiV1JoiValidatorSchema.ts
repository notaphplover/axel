import Joi from 'joi';

import { PlayerReferenceApiV1 } from '../../../../model/setup/PlayerReferenceApiV1';

export const playerReferenceApiV1JoiValidatorSchema: Joi.ObjectSchema<PlayerReferenceApiV1> =
  Joi.object({
    userId: Joi.string().required(),
  });
