import { AuthCreationQueryApiV1 } from '../../../query/AuthCreationQueryApiV1';
import Joi from 'joi';

export const authCreationQueryApiV1JoiValidator: Joi.ObjectSchema<AuthCreationQueryApiV1> = Joi.object<AuthCreationQueryApiV1>(
  {
    password: Joi.string().required(),
    username: Joi.string().required(),
  },
);
