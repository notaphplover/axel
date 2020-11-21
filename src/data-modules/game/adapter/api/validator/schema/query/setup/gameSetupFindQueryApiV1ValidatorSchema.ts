import { GameSetupFindQueryApiV1 } from '../../../../query/setup/GameSetupFindQueryApiV1';
import Joi from 'joi';
import { gameFormatApiV1JoiValidatorSchema } from '../../model/gameFormatApiV1JoiValidatorSchema';
import { gameSetupFindQueryPlayerSetupApiV1JoiValidatorSchema } from './gameSetupFindQueryPlayerSetupApiV1ValidatorSchema';

const GAME_SETUP_FIND_QUERY_API_V1_LIMIT_MAX_VALUE: number = 100;

export const gameSetupFindQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<GameSetupFindQueryApiV1> = Joi.object<GameSetupFindQueryApiV1>(
  {
    format: gameFormatApiV1JoiValidatorSchema.optional(),
    id: Joi.string().optional(),
    limit: Joi.number()
      .strict()
      .integer()
      .positive()
      .max(GAME_SETUP_FIND_QUERY_API_V1_LIMIT_MAX_VALUE)
      .required(),
    offset: Joi.number().strict().integer().min(0).required(),
    ownerUserId: Joi.string().optional(),
    playerSetups: Joi.array()
      .items(gameSetupFindQueryPlayerSetupApiV1JoiValidatorSchema)
      .optional(),
    playerSlots: Joi.number().integer().positive().optional(),
  },
);
