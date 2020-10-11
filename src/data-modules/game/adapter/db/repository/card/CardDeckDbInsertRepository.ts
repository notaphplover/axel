import { inject, injectable } from 'inversify';
import { CardDeck } from '../../../../domain/model/card/CardDeck';
import { CardDeckCreationQuery } from '../../../../domain/query/card/CardDeckCreationQuery';
import { CardDeckDb } from '../../model/card/CardDeckDb';
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
    @inject(GAME_ADAPTER_TYPES.db.model.card.CARD_DECK_DB_MODEL)
    model: Model<CardDeckDb>,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card.CARD_DECK_DB_TO_CARD_DECK_CONVERTER,
    )
    cardDeckDbToCardDeckConverter: Converter<CardDeckDb, CardDeck>,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.card
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
