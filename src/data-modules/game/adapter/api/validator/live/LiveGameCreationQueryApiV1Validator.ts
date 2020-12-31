import { inject, injectable } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import Joi from 'joi';
import { JoiObjectValidator } from '../../../../../../integration-modules/joi/adapter';
import { LiveGameCreationQueryApiV1 } from '../../query/live/LiveGameCreationQueryApiV1';

@injectable()
export class LiveGameCreationQueryApiV1Validator extends JoiObjectValidator<LiveGameCreationQueryApiV1> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.validator.schema.query
        .GAME_CREATION_QUERY_API_V1_JOY_VALIDATOR_SCHEMA,
    )
    gameCreationQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<LiveGameCreationQueryApiV1>,
  ) {
    super(gameCreationQueryApiV1JoiValidatorSchema);
  }
}
