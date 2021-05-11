import Joi from 'joi';

import { CardCreationQueryApiV1 } from '../../../../query/card/CardCreationQueryApiV1';
import { cardDetailApiV1JoiValidatorSchema } from '../../model/card/cardDetailApiV1ValidatorSchema';
import { cardTypeApiV1JoiValidatorSchema } from '../../model/card/cardTypeApiV1JoiValidatorSchema';
import { resourceApiV1JoiValidatorSchema } from '../../model/card/resourceApiV1JoiValidatorSchema';

export const cardCreationQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<CardCreationQueryApiV1> =
  Joi.object<CardCreationQueryApiV1>({
    cost: resourceApiV1JoiValidatorSchema.required(),
    detail: cardDetailApiV1JoiValidatorSchema.required(),
    power: Joi.number().strict().integer(),
    toughness: Joi.number().strict().integer(),
    types: Joi.array().items(cardTypeApiV1JoiValidatorSchema).required(),
  });
