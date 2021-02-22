import { inject, injectable } from 'inversify';
import Joi from 'joi';

import { JoiObjectValidator } from '../../../../../../integration-modules/joi/adapter';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { CardCreationQueryApiV1 } from '../../query/card/CardCreationQueryApiV1';

@injectable()
export class CardCreationQueryApiV1Validator extends JoiObjectValidator<CardCreationQueryApiV1> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.validator.schema.query.card
        .CARD_CREATION_QUERY_API_V1_JOI_VALIDATOR_SCHEMA,
    )
    cardCreationQueryApiV1JoiValidatorSchema: Joi.AlternativesSchema,
  ) {
    super(cardCreationQueryApiV1JoiValidatorSchema);
  }
}
