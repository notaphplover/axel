import { inject, injectable } from 'inversify';
import { CardFindQueryApiV1 } from '../../query/card/CardFindQueryApiV1';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import Joi from 'joi';
import { JoiObjectValidator } from '../../../../../../integration-modules/joi/adapter';

@injectable()
export class CardDeckFindQueryApiV1Validator extends JoiObjectValidator<CardFindQueryApiV1> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(
      GAME_ADAPTER_TYPES.api.validator.schema.query.deck
        .CARD_DECK_FIND_QUERY_API_V1_JOI_VALIDATOR_SCHEMA,
    )
    cardDeckCreationQueryApiV1JoiValidatorSchema: Joi.ObjectSchema<CardFindQueryApiV1>,
  ) {
    super(cardDeckCreationQueryApiV1JoiValidatorSchema);
  }
}
