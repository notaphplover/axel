import { inject, injectable } from 'inversify';
import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { CardDeckCreationQuery } from '../../../../domain/query/deck/CardDeckCreationQuery';
import { CardDeckDb } from '../../model/deck/CardDeckDb';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { Model } from 'mongoose';
import { MongooseInsertRepository } from '../../../../../../layer-modules/db/adapter';

@injectable()
export class CardDeckDbInsertRepository extends MongooseInsertRepository<
  CardDeck,
  CardDeckCreationQuery,
  CardDeckDb
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.deck.CARD_DECK_DB_MODEL)
    model: Model<CardDeckDb>,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.deck.CARD_DECK_DB_TO_CARD_DECK_CONVERTER,
    )
    cardDeckDbToCardDeckConverter: Converter<CardDeckDb, CardDeck>,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.deck
        .CARD_DECK_CREATION_QUERY_TO_CARD_DBS_CONVERTER,
    )
    cardDeckCreationQueryToCardDeckDbsConverter: Converter<
      CardDeckCreationQuery,
      CardDeckDb[]
    >,
  ) {
    super(
      model,
      cardDeckDbToCardDeckConverter,
      cardDeckCreationQueryToCardDeckDbsConverter,
    );
  }
}
