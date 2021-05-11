import Joi from 'joi';

import { CardDeckSectionsApiV1 } from '../../../../model/deck/CardDeckSectionsApiV1';
import { cardSetReferencesApiV1JoiValidatorSchema } from './cardSetReferencesApiV1JoiValidatorSchema';

export const cardDeckSectionsApiV1JoiValidatorSchema: Joi.ObjectSchema<CardDeckSectionsApiV1> =
  Joi.object<CardDeckSectionsApiV1>({
    core: cardSetReferencesApiV1JoiValidatorSchema,
    sideboard: cardSetReferencesApiV1JoiValidatorSchema,
  });
