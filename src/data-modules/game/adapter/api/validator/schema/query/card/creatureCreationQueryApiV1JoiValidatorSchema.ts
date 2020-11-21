import { CardTypeApiV1 } from '../../../../model/card/CardTypeApiV1';
import { CreatureCreationQueryApiV1 } from '../../../../query/card/CreatureCreationQueryApiV1';
import Joi from 'joi';
import { baseCardCreationQueryApiV1JoiValidatorSchema } from './baseCardCreationQueryApiV1JoiValidatorSchema';

export const creatureCreationQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<CreatureCreationQueryApiV1> = (baseCardCreationQueryApiV1JoiValidatorSchema as Joi.ObjectSchema<CreatureCreationQueryApiV1>).keys(
  {
    type: Joi.string().valid(CardTypeApiV1.Creature).required(),
    power: Joi.number().strict().integer().required(),
    toughness: Joi.number().strict().integer().required(),
  },
);
