import { GameSetupCreationQueryApiV1 } from '../../../../query/setup/GameSetupCreationQueryApiV1';
import Joi from 'joi';
import { gameFormatApiV1JoiValidatorSchema } from '../../model/gameFormatApiV1JoiValidatorSchema';
import { gameSetupCreationQueryPlayerSetupApiV1ValidatorSchema } from './gameSetupCreationQueryPlayerSetupApiV1ValidatorSchema';

const GAME_SETUP_CREATION_QUERY_PLAYER_SETUPS_LENGTH: number = 1;

const GAME_SETUP_CREATION_QUERY_PLAYER_SLOTS_MAX: number = 2;
const GAME_SETUP_CREATION_QUERY_PLAYER_SLOTS_MIN: number = 2;

export const gameSetupCreationQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<GameSetupCreationQueryApiV1> = Joi.object<GameSetupCreationQueryApiV1>(
  {
    format: gameFormatApiV1JoiValidatorSchema.required(),
    ownerUserId: Joi.string().required(),
    playerSetups: Joi.array()
      .items(gameSetupCreationQueryPlayerSetupApiV1ValidatorSchema)
      .length(GAME_SETUP_CREATION_QUERY_PLAYER_SETUPS_LENGTH)
      .required(),
    playerSlots: Joi.number()
      .integer()
      .positive()
      .min(GAME_SETUP_CREATION_QUERY_PLAYER_SLOTS_MIN)
      .max(GAME_SETUP_CREATION_QUERY_PLAYER_SLOTS_MAX)
      .required(),
  },
);
