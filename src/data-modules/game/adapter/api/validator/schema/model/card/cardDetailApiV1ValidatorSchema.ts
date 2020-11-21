import { CardDetailApiV1 } from '../../../../model/card/CardDetailApiV1';
import Joi from 'joi';

export const cardDetailApiV1JoiValidatorSchema: Joi.ObjectSchema<CardDetailApiV1> = Joi.object<CardDetailApiV1>(
  {
    description: Joi.string().required(),
    image: Joi.string().required(),
    title: Joi.string().required(),
  },
);
