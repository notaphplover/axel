import Joi from 'joi';

import { GameSetupUpdateQueryApiV1 } from '../../../../query/setup/GameSetupUpdateQueryApiV1';
import { playerReferenceApiV1JoiValidatorSchema } from '../../model/schema/playerReferenceApiV1JoiValidatorSchema';
import { gameSetupUpdateQueryAdditionalPlayerSetupApiV1ValidatorSchema } from './gameSetupUpdateQueryAdditionalPlayerSetupApiV1ValidatorSchema';

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
