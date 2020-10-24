import { CardFindQueryApiV1 } from '../../../../query/card/CardFindQueryApiV1';
import Joi from 'joi';
import { cardTypeApiV1JoyValidatorSchema } from '../../model/card/cardTypeApiV1JoiValidatorSchema';

const CARD_FIND_QUERY_API_V1_LIMIT_MAX_VALUE: number = 100;

export const cardFindQueryApiV1JoyValidatorSchema: Joi.ObjectSchema<CardFindQueryApiV1> = Joi.object<
  CardFindQueryApiV1
>({
  id: Joi.string().optional(),
  limit: Joi.number()
    .integer()
    .positive()
    .max(CARD_FIND_QUERY_API_V1_LIMIT_MAX_VALUE),
  offset: Joi.number().integer().min(0),
  types: Joi.alternatives(
    cardTypeApiV1JoyValidatorSchema,
    Joi.array().items(cardTypeApiV1JoyValidatorSchema),
  ).optional(),
});