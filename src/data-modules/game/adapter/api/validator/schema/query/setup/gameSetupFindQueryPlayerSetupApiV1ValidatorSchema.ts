import { GameSetupFindQueryPlayerSetupApiV1 } from '../../../../query/setup/GameSetupFindQueryPlayerSetupApiV1';
import Joi from 'joi';

export const gameSetupFindQueryPlayerSetupApiV1JoyValidatorSchema: Joi.ObjectSchema<GameSetupFindQueryPlayerSetupApiV1> = Joi.object<
  GameSetupFindQueryPlayerSetupApiV1
>({
  userId: Joi.string().required(),
});
