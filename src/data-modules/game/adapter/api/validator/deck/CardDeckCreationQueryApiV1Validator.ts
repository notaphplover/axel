import { inject, injectable } from 'inversify';
import { CardDeckCreationQueryApiV1 } from '../../query/deck/CardDeckCreationQueryApiV1';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import Joi from 'joi';
import { JoiObjectValidator } from '../../../../../../integration-modules/joi/adapter';

@injectable()
export class CardDeckCreationQueryApiV1Validator extends JoiObjectValidator<CardDeckCreationQueryApiV1> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.validator.schema.query.deck
        .CARD_DECK_CREATION_QUERY_API_V1_JOI_VALIDATOR_SCHEMA,
    )
    cardDeckCreationQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<CardDeckCreationQueryApiV1>,
  ) {
    super(cardDeckCreationQueryApiV1JoiValidatorSchema);
  }
}
