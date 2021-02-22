import Joi from 'joi';

import { UserCreationQueryApiV1 } from '../../../query/UserCreationQueryApiV1';

export const userCreationQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<UserCreationQueryApiV1> = Joi.object<UserCreationQueryApiV1>(
  {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    username: Joi.string().required(),
  },
);
