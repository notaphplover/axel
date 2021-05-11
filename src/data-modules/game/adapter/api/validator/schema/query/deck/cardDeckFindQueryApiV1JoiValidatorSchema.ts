import Joi from 'joi';

import { CardDeckFindQueryApiV1 } from '../../../../query/deck/CardDeckFindQueryApiV1';

export const cardDeckFindQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<CardDeckFindQueryApiV1> =
  Joi.object<CardDeckFindQueryApiV1>({
    cardDeckId: Joi.string().required(),
  });
