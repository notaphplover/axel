import Joi from 'joi';

import { CardTypeApiV1 } from '../../../../model/card/CardTypeApiV1';

export const cardTypeApiV1JoiValidatorSchema: Joi.StringSchema = Joi.string().valid(
  ...Object.values(CardTypeApiV1),
);
