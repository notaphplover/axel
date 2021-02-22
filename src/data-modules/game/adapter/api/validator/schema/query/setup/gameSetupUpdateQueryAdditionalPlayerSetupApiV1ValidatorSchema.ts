import Joi from 'joi';

import { GameSetupUpdateQueryAdditionalPlayerSetupApiV1 } from '../../../../query/setup/GameSetupUpdateQueryPlayerSetupApiV1';

export const gameSetupUpdateQueryAdditionalPlayerSetupApiV1ValidatorSchema: Joi.ObjectSchema<GameSetupUpdateQueryAdditionalPlayerSetupApiV1> = Joi.object<GameSetupUpdateQueryAdditionalPlayerSetupApiV1>(
  {
    deckId: Joi.string().required(),
    userId: Joi.string().required(),
  },
);
