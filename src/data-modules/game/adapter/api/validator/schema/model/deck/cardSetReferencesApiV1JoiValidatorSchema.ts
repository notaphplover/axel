import { CardSetReferencesApiV1 } from '../../../../model/deck/CardSetReferencesApiV1';
import Joi from 'joi';

export const cardSetReferencesApiV1JoiValidatorSchema: Joi.ObjectSchema<CardSetReferencesApiV1> = Joi.object<CardSetReferencesApiV1>(
  {
    references: Joi.array().items(Joi.string().required()).required(),
  },
);
