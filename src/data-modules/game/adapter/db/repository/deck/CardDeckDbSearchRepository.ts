import {
  MongoDbConnector,
  mongodbAdapter,
} from '../../../../../../integration-modules/mongodb/adapter';
import { inject, injectable } from 'inversify';
import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { CardDeckDb } from '../../model/deck/CardDeckDb';
import { CardDeckFindQuery } from '../../../../domain/query/deck/CardDeckFindQuery';
import { Converter } from '../../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { MongoDbSearchRepository } from '../../../../../../integration-modules/mongodb/adapter/MongoDbSearchRepository';
import mongodb from 'mongodb';

@injectable()
export class CardDeckDbSearchRepository extends MongoDbSearchRepository<
  CardDeck,
  CardDeckDb,
  CardDeckDb,
  CardDeckFindQuery
> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.collection.deck.DECK_COLLECTION_NAME)
    collectionName: string,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.deck.CARD_DECK_DB_TO_CARD_DECK_CONVERTER,
    )
    cardDeckDbToCardDeckConverter: Converter<CardDeckDb, CardDeck>,
    @inject(mongodbAdapter.config.types.db.MONGODB_CONNECTOR)
    mongoDbConnector: MongoDbConnector,
    @inject(
      GAME_ADAPTER_TYPES.db.converter.deck
        .CARD_DECK_FIND_QUERY_TO_CARD_DECK_DB_FILTER_QUERY_CONVERTER,
    )
    cardDeckFindQueryToCardDeckDbFilterQueryConverter: Converter<
      CardDeckFindQuery,
      mongodb.FilterQuery<CardDeckDb>
    >,
  ) {
    super(
      collectionName,
      cardDeckDbToCardDeckConverter,
      mongoDbConnector,
      cardDeckFindQueryToCardDeckDbFilterQueryConverter,
    );
  }
}
