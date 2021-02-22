import Joi from 'joi';

import { BaseCardCreationQueryApiV1 } from '../../../../query/card/BaseCardCreationQueryApiV1';
import { cardDetailApiV1JoiValidatorSchema } from '../../model/card/cardDetailApiV1ValidatorSchema';
import { cardTypeApiV1JoiValidatorSchema } from '../../model/card/cardTypeApiV1JoiValidatorSchema';
import { resourceApiV1JoiValidatorSchema } from '../../model/card/resourceApiV1JoiValidatorSchema';

export const baseCardCreationQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<BaseCardCreationQueryApiV1> = Joi.object<BaseCardCreationQueryApiV1>(
  {
    cost: resourceApiV1JoiValidatorSchema,
    detail: cardDetailApiV1JoiValidatorSchema,
    type: cardTypeApiV1JoiValidatorSchema,
  },
);
