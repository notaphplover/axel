import { GameCreationQueryApiV1 } from '../../../query/GameCreationQueryApiV1';
import Joi from 'joi';

export const gameCreationQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<GameCreationQueryApiV1> = Joi.object(
  {
    round: Joi.number().strict().required(),
  },
);
