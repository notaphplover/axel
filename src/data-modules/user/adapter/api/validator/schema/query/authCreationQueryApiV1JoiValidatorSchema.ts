import Joi from 'joi';

import { AuthCreationQueryApiV1 } from '../../../query/AuthCreationQueryApiV1';

export const authCreationQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<AuthCreationQueryApiV1> =
  Joi.object<AuthCreationQueryApiV1>({
    password: Joi.string().required(),
    username: Joi.string().required(),
  });
