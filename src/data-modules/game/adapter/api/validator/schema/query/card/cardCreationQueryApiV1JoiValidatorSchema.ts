import Joi from 'joi';

import { CardTypeApiV1 } from '../../../../model/card/CardTypeApiV1';
import { CardCreationQueryApiV1 } from '../../../../query/card/CardCreationQueryApiV1';
import { baseCardCreationQueryApiV1JoiValidatorSchema } from './baseCardCreationQueryApiV1JoiValidatorSchema';

export const cardCreationQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<CardCreationQueryApiV1> = (baseCardCreationQueryApiV1JoiValidatorSchema as Joi.ObjectSchema<CardCreationQueryApiV1>).keys(
  {
    type: Joi.string().valid(CardTypeApiV1.Creature).required(),
    power: Joi.number().strict().integer().required(),
    toughness: Joi.number().strict().integer().required(),
  },
);
