import { inject, injectable } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameSetupCreationQueryApiV1 } from '../../query/setup/GameSetupCreationQueryApiV1';
import Joi from 'joi';
import { JoiObjectValidator } from '../../../../../../integration-modules/joi/adapter';

@injectable()
export class GameSetupCreationQueryApiV1Validator extends JoiObjectValidator<
  GameSetupCreationQueryApiV1
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.validator.schema.query.setup
        .GAME_SETUP_CREATION_QUERY_API_V1_JOY_VALIDATOR_SCHEMA,
    )
    gameSetupCreationQueryApiV1JoyValidatorSchema: Joi.ObjectSchema<
      GameSetupCreationQueryApiV1
    >,
  ) {
    super(gameSetupCreationQueryApiV1JoyValidatorSchema);
  }
}
