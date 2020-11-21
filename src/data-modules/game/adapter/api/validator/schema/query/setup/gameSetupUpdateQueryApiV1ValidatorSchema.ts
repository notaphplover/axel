import { GameSetupUpdateQueryApiV1 } from '../../../../query/setup/GameSetupUpdateQueryApiV1';
import Joi from 'joi';
import { gameSetupUpdateQueryAdditionalPlayerSetupApiV1ValidatorSchema } from './gameSetupUpdateQueryAdditionalPlayerSetupApiV1ValidatorSchema';

const GAME_SETUP_CREATION_QUERY_PLAYER_SETUPS_LENGTH: number = 1;

export const gameSetupUpdateQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<GameSetupUpdateQueryApiV1> = Joi.object<GameSetupUpdateQueryApiV1>(
  {
    additionalPlayerSetups: Joi.array()
      .items(gameSetupUpdateQueryAdditionalPlayerSetupApiV1ValidatorSchema)
      .length(GAME_SETUP_CREATION_QUERY_PLAYER_SETUPS_LENGTH)
      .optional(),
    id: Joi.number().strict().required(),
  },
);
