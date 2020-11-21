import { ArtifactCreationQueryApiV1 } from '../../../../query/card/ArtifactCreationQueryApiV1';
import { CardTypeApiV1 } from '../../../../model/card/CardTypeApiV1';
import Joi from 'joi';
import { baseCardCreationQueryApiV1JoiValidatorSchema } from './baseCardCreationQueryApiV1JoiValidatorSchema';

export const artifactCreationQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<ArtifactCreationQueryApiV1> = baseCardCreationQueryApiV1JoiValidatorSchema.keys(
  {
    type: Joi.string().valid(CardTypeApiV1.Artifact).required(),
  },
);
