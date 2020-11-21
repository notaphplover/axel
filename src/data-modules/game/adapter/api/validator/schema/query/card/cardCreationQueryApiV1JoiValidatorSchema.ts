import Joi from 'joi';
import { artifactCreationQueryApiV1JoiValidatorSchema } from './artifactCreationQueryApiV1JoiValidatorSchema';
import { creatureCreationQueryApiV1JoiValidatorSchema } from './creatureCreationQueryApiV1JoiValidatorSchema';
import { enchantmentCreationQueryApiV1JoiValidatorSchema } from './enchantmentCreationQueryApiV1JoiValidatorSchema';
import { landCreationQueryApiV1JoiValidatorSchema } from './landCreationQueryApiV1JoiValidatorSchema';

export const cardCreationQueryApiV1JoiValidatorSchema: Joi.AlternativesSchema = Joi.alternatives(
  artifactCreationQueryApiV1JoiValidatorSchema,
  creatureCreationQueryApiV1JoiValidatorSchema,
  enchantmentCreationQueryApiV1JoiValidatorSchema,
  landCreationQueryApiV1JoiValidatorSchema,
);
