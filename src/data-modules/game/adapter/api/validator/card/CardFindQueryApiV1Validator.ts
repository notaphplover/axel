import { inject, injectable } from 'inversify';
import Joi from 'joi';

import { JoiObjectValidator } from '../../../../../../integration-modules/joi/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { CardFindQueryApiV1 } from '../../query/card/CardFindQueryApiV1';

@injectable()
export class CardFindQueryApiV1Validator extends JoiObjectValidator<CardFindQueryApiV1> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.validator.schema.query.card
        .CARD_FIND_QUERY_API_V1_JOI_VALIDATOR_SCHEMA,
    )
    cardFindQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<CardFindQueryApiV1>,
  ) {
    super(cardFindQueryApiV1JoiValidatorSchema);
  }
}
