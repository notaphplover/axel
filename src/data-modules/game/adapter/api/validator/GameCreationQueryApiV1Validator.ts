import { inject, injectable } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../config/types';
import { GameCreationQueryApiV1 } from '../query/GameCreationQueryApiV1';
import Joi from 'joi';
import { JoiObjectValidator } from '../../../../../integration-modules/joi/adapter';

@injectable()
export class GameCreationQueryApiV1Validator extends JoiObjectValidator<GameCreationQueryApiV1> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.validator.schema.query
        .GAME_CREATION_QUERY_API_V1_JOY_VALIDATOR_SCHEMA,
    )
    gameCreationQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<GameCreationQueryApiV1>,
  ) {
    super(gameCreationQueryApiV1JoiValidatorSchema);
  }
}
