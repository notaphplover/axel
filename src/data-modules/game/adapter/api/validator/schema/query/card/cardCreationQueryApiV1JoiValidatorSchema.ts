import Joi from 'joi';

import { creatureCreationQueryApiV1JoiValidatorSchema } from './creatureCreationQueryApiV1JoiValidatorSchema';

export const cardCreationQueryApiV1JoiValidatorSchema: Joi.AlternativesSchema = Joi.alternatives(
  creatureCreationQueryApiV1JoiValidatorSchema,
);
