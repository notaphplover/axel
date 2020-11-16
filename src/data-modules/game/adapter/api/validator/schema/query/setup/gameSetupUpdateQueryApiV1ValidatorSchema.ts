import { GameSetupUpdateQueryApiV1 } from '../../../../query/setup/GameSetupUpdateQueryApiV1';
import Joi from 'joi';
import { gameSetupUpdateQueryPlayerSetupApiV1ValidatorSchema } from './gameSetupUpdateQueryPlayerSetupApiV1ValidatorSchema';

const GAME_SETUP_CREATION_QUERY_PLAYER_SETUPS_LENGTH: number = 1;

export const gameSetupUpdateQueryApiV1JoyValidatorSchema: Joi.ObjectSchema<GameSetupUpdateQueryApiV1> = Joi.object<
  GameSetupUpdateQueryApiV1
>({
  additionalPlayerSetups: Joi.array()
    .items(gameSetupUpdateQueryPlayerSetupApiV1ValidatorSchema)
    .length(GAME_SETUP_CREATION_QUERY_PLAYER_SETUPS_LENGTH)
    .optional(),
  id: Joi.number().strict().required(),
});
