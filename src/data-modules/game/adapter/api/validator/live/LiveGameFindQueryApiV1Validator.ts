import { inject, injectable } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import Joi from 'joi';
import { JoiObjectValidator } from '../../../../../../integration-modules/joi/adapter';
import { LiveGameFindQueryApiV1 } from '../../query/live/LiveGameFindQueryApiV1';

@injectable()
export class LiveGameFindQueryApiV1Validator extends JoiObjectValidator<LiveGameFindQueryApiV1> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.validator.schema.query.live
        .LIVE_GAME_FIND_QUERY_API_V1_JOY_VALIDATOR_SCHEMA,
    )
    liveGameFindQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<LiveGameFindQueryApiV1>,
  ) {
    super(liveGameFindQueryApiV1JoiValidatorSchema);
  }
}
