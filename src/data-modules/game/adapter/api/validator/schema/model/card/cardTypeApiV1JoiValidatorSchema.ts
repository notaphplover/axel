import { CardTypeApiV1 } from '../../../../model/card/CardTypeApiV1';
import Joi from 'joi';

export const cardTypeApiV1JoyValidatorSchema: Joi.StringSchema = Joi.string().valid(
  ...Object.values(CardTypeApiV1),
);
