import { GameSetupUpdateQueryAdditionalPlayerSetupApiV1 } from '../../../../query/setup/GameSetupUpdateQueryPlayerSetupApiV1';
import Joi from 'joi';

export const gameSetupUpdateQueryAdditionalPlayerSetupApiV1ValidatorSchema: Joi.ObjectSchema<GameSetupUpdateQueryAdditionalPlayerSetupApiV1> = Joi.object<
  GameSetupUpdateQueryAdditionalPlayerSetupApiV1
>({
  deckId: Joi.string().required(),
  userId: Joi.string().required(),
});
