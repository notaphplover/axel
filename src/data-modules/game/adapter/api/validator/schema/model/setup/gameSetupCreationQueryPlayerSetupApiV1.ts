import { GameSetupCreationQueryPlayerSetupApiV1 } from '../../../../query/setup/GameSetupCreationQueryPlayerSetupApiV1';
import Joi from 'joi';

export const gameSetupCreationQueryPlayerSetupApiV1: Joi.ObjectSchema<GameSetupCreationQueryPlayerSetupApiV1> = Joi.object<
  GameSetupCreationQueryPlayerSetupApiV1
>({
  deckId: Joi.string().required(),
  userId: Joi.string().required(),
});
