import Joi from 'joi';

import { CardTypeApiV1 } from '../../../../model/card/CardTypeApiV1';
import { LandCreationQueryApiV1 } from '../../../../query/card/LandCreationQueryApiV1';
import { baseCardCreationQueryApiV1JoiValidatorSchema } from './baseCardCreationQueryApiV1JoiValidatorSchema';

export const landCreationQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<LandCreationQueryApiV1> = baseCardCreationQueryApiV1JoiValidatorSchema.keys(
  {
    type: Joi.string().valid(CardTypeApiV1.Land).required(),
  },
);
