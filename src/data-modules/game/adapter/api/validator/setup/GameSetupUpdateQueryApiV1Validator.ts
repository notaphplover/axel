import { inject, injectable } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameSetupUpdateQueryApiV1 } from '../../query/setup/GameSetupUpdateQueryApiV1';
import Joi from 'joi';
import { JoiObjectValidator } from '../../../../../../integration-modules/joi/adapter';

@injectable()
export class GameSetupUpdateQueryApiV1Validator extends JoiObjectValidator<GameSetupUpdateQueryApiV1> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.validator.schema.query.setup
        .GAME_SETUP_UPDATE_QUERY_API_V1_JOY_VALIDATOR_SCHEMA,
    )
    gameSetupUpdateQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<GameSetupUpdateQueryApiV1>,
  ) {
    super(gameSetupUpdateQueryApiV1JoiValidatorSchema);
  }
}
