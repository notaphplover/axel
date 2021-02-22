import Joi from 'joi';

import { GameSetupFindQueryPlayerSetupApiV1 } from '../../../../query/setup/GameSetupFindQueryPlayerSetupApiV1';

export const gameSetupFindQueryPlayerSetupApiV1JoiValidatorSchema: Joi.ObjectSchema<GameSetupFindQueryPlayerSetupApiV1> = Joi.object<GameSetupFindQueryPlayerSetupApiV1>(
  {
    userId: Joi.string().required(),
  },
);
