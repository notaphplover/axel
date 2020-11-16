import { GameSetupUpdateQueryPlayerSetupApiV1 } from '../../../../query/setup/GameSetupUpdateQueryPlayerSetupApiV1';
import Joi from 'joi';

export const gameSetupUpdateQueryPlayerSetupApiV1ValidatorSchema: Joi.ObjectSchema<GameSetupUpdateQueryPlayerSetupApiV1> = Joi.object<
  GameSetupUpdateQueryPlayerSetupApiV1
>({
  deckId: Joi.string().required(),
  userId: Joi.string().required(),
});
