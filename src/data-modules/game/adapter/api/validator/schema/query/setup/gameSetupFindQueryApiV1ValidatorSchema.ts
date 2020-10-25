import { GameSetupFindQueryApiV1 } from '../../../../query/setup/GameSetupFindQueryApiV1';
import Joi from 'joi';
import { gameFormatApiV1JoyValidatorSchema } from '../../model/gameFormatApiV1JoiValidatorSchema';
import { gameSetupFindQueryPlayerSetupApiV1JoyValidatorSchema } from './gameSetupFindQueryPlayerSetupApiV1ValidatorSchema';

export const gameSetupFindQueryApiV1JoyValidatorSchema: Joi.ObjectSchema<GameSetupFindQueryApiV1> = Joi.object<
  GameSetupFindQueryApiV1
>({
  format: gameFormatApiV1JoyValidatorSchema.optional(),
  id: Joi.string().optional(),
  ownerUserId: Joi.string().optional(),
  playerSetups: Joi.array()
    .items(gameSetupFindQueryPlayerSetupApiV1JoyValidatorSchema)
    .optional(),
  playerSlots: Joi.number().integer().positive().optional(),
});
