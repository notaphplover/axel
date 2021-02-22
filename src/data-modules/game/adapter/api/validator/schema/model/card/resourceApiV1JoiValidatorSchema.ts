import Joi from 'joi';

import { ResourceApiV1 } from '../../../../model/card/ResourceApiV1';
import { ResourceTypeApiV1 } from '../../../../model/card/ResourceTypeApiV1';

export const resourceApiV1JoiValidatorSchema: Joi.ObjectSchema<ResourceApiV1> = Joi.object<ResourceApiV1>(
  {
    [ResourceTypeApiV1.Black]: Joi.number().strict().required(),
    [ResourceTypeApiV1.Blue]: Joi.number().strict().required(),
    [ResourceTypeApiV1.Green]: Joi.number().strict().required(),
    [ResourceTypeApiV1.Red]: Joi.number().strict().required(),
    [ResourceTypeApiV1.Uncolored]: Joi.number().strict().required(),
    [ResourceTypeApiV1.White]: Joi.number().strict().required(),
  },
);
