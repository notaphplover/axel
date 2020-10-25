import { inject, injectable } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { GameSetupFindQueryApiV1 } from '../../query/setup/GameSetupFindQueryApiV1';
import Joi from 'joi';
import { JoiObjectValidator } from '../../../../../../integration-modules/joi/adapter';

@injectable()
export class GameSetupFindQueryApiV1Validator extends JoiObjectValidator<
  GameSetupFindQueryApiV1
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.validator.schema.query.setup
        .GAME_SETUP_FIND_QUERY_API_V1_JOY_VALIDATOR_SCHEMA,
    )
    gameSetupFindQueryApiV1JoyValidatorSchema: Joi.ObjectSchema<
      GameSetupFindQueryApiV1
    >,
  ) {
    super(gameSetupFindQueryApiV1JoyValidatorSchema);
  }
}
