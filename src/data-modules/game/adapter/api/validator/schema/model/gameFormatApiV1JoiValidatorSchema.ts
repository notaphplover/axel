import { GameFormatApiV1 } from '../../../model/GameFormatApiV1';
import Joi from 'joi';

export const gameFormatApiV1JoyValidatorSchema: Joi.StringSchema = Joi.string().valid(
  ...Object.values(GameFormatApiV1),
);