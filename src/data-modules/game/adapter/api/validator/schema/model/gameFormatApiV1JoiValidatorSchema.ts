import Joi from 'joi';

import { GameFormatApiV1 } from '../../../model/GameFormatApiV1';

export const gameFormatApiV1JoiValidatorSchema: Joi.StringSchema = Joi.string().valid(
  ...Object.values(GameFormatApiV1),
);
