import { CardTypeApiV1 } from '../../../../model/card/CardTypeApiV1';
import { EnchantmentCreationQueryApiV1 } from '../../../../query/card/EnchantmentCreationQueryApiV1';
import Joi from 'joi';
import { baseCardCreationQueryApiV1JoiValidatorSchema } from './baseCardCreationQueryApiV1JoiValidatorSchema';

export const enchantmentCreationQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<EnchantmentCreationQueryApiV1> = baseCardCreationQueryApiV1JoiValidatorSchema.keys(
  {
    type: Joi.string().valid(CardTypeApiV1.Enchantment).required(),
  },
);
