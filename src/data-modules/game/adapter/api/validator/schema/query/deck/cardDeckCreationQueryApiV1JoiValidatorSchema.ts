import { CardDeckCreationQueryApiV1 } from '../../../../query/deck/CardDeckCreationQueryApiV1';
import Joi from 'joi';
import { cardDeckSectionsApiV1JoiValidatorSchema } from '../../model/deck/cardDeckSectionsApiV1JoiValidatorSchema';
import { gameFormatApiV1JoiValidatorSchema } from '../../model/gameFormatApiV1JoiValidatorSchema';

export const cardDeckCreationQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<CardDeckCreationQueryApiV1> = Joi.object<CardDeckCreationQueryApiV1>(
  {
    description: Joi.string().required(),
    format: gameFormatApiV1JoiValidatorSchema.required(),
    name: Joi.string().required(),
    sections: cardDeckSectionsApiV1JoiValidatorSchema.required(),
  },
);
