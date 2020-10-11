import { FilterQuery, Model } from 'mongoose';
import { inject, injectable } from 'inversify';
import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { CardDeckDb } from '../../model/deck/CardDeckDb';
import { CardDeckFindQuery } from '../../../../domain/query/deck/CardDeckFindQuery';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { MongooseSearchRepository } from '../../../../../../layer-modules/db/adapter';

@injectable()
export class CardDeckDbSearchRepository extends MongooseSearchRepository<
  CardDeck,
  CardDeckDb,
  CardDeckFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.card.CARD_DECK_DB_MODEL)
    model: Model<CardDeckDb>,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.deck.CARD_DECK_DB_TO_CARD_DECK_CONVERTER,
    )
    cardDeckDbToCardDeckConverter: Converter<CardDeckDb, CardDeck>,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.deck
        .CARD_DECK_FIND_QUERY_TO_CARD_DECK_DB_FILTER_QUERY_CONVERTER,
    )
    cardDeckFindQueryToCardDeckDbFilterQueryConverter: Converter<
      CardDeckFindQuery,
      FilterQuery<CardDeckDb>
    >,
  ) {
    super(
      model,
      cardDeckDbToCardDeckConverter,
      cardDeckFindQueryToCardDeckDbFilterQueryConverter,
    );
  }
}
