import Joi from 'joi';

import { CardFindQueryApiV1 } from '../../../../query/card/CardFindQueryApiV1';
import { cardTypeApiV1JoiValidatorSchema } from '../../model/card/cardTypeApiV1JoiValidatorSchema';

const CARD_FIND_QUERY_API_V1_LIMIT_MAX_VALUE: number = 100;

export const cardFindQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<CardFindQueryApiV1> =
  Joi.object<CardFindQueryApiV1>({
    id: Joi.string().optional(),
    limit: Joi.number()
      .strict()
      .integer()
      .positive()
      .max(CARD_FIND_QUERY_API_V1_LIMIT_MAX_VALUE)
      .required(),
    offset: Joi.number().strict().integer().min(0).required(),
    types: Joi.alternatives(
      cardTypeApiV1JoiValidatorSchema,
      Joi.array().items(cardTypeApiV1JoiValidatorSchema),
    ).optional(),
  });
