import { GameSetupUpdateQueryApiV1 } from '../../../../query/setup/GameSetupUpdateQueryApiV1';
import Joi from 'joi';
import { gameSetupUpdateQueryAdditionalPlayerSetupApiV1ValidatorSchema } from './gameSetupUpdateQueryAdditionalPlayerSetupApiV1ValidatorSchema';
import { playerReferenceApiV1JoiValidatorSchema } from '../../model/schema/playerReferenceApiV1JoiValidatorSchema';

const ADDITIONAL_PLAYER_SETUPS_LENGTH: number = 1;
const REMOVE_PLAYER_SETUPS_LENGTH: number = 1;

export const gameSetupUpdateQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<GameSetupUpdateQueryApiV1> = Joi.object<GameSetupUpdateQueryApiV1>(
  {
    additionalPlayerSetups: Joi.array()
      .items(gameSetupUpdateQueryAdditionalPlayerSetupApiV1ValidatorSchema)
      .length(ADDITIONAL_PLAYER_SETUPS_LENGTH)
      .optional(),
    id: Joi.string().required(),
    removePlayerSetups: Joi.array()
      .items(playerReferenceApiV1JoiValidatorSchema)
      .length(REMOVE_PLAYER_SETUPS_LENGTH)
      .optional(),
  },
);
